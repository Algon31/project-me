const Quest = require("../../models/Quest");
const DailyEntry = require("../../models/DailyEntry");
const Character = require("../../models/Character");
const { updateStreak } = require("../../services/streakEngine");
const { applyPenalty } = require("../../services/dailyPenaltyEngine");
const { updateCharacter, deductCharacterXP } = require("../../services/characterEngine");
const { getFormattedDate } = require("../../utils/dateUtils");

async function saveQuest(req, res) {
    try {
        const quest = await Quest.findOne({
            _id: req.params.id,
            user: req.user.id,
            active: true,
        });

        if (!quest) {
            return res.status(404).json({ message: "Quest not found" });
        }

        const value = req.body.value;
        const completedSubQuests = Array.isArray(req.body.completedSubQuests) ? req.body.completedSubQuests : [];
        const timezoneOffset = req.body.timezoneOffset ?? req.headers["x-timezone-offset"];
        const today = getFormattedDate(new Date(), timezoneOffset ? Number(timezoneOffset) : null);

        let entry = await DailyEntry.findOne({
            user: req.user.id,
            date: today,
        });

        if (!entry) {
            entry = await DailyEntry.create({
                user: req.user.id,
                date: today,
                quests: [],
            });
        }

        const existing = entry.quests.find(
            q => String(q.quest) === String(quest._id)
        );

        const prevSubs = existing ? (existing.completedSubQuests || []) : [];
        const newlyCheckedSubs = completedSubQuests.filter(s => !prevSubs.includes(s));
        const newlyUncheckedSubs = prevSubs.filter(s => !completedSubQuests.includes(s));

        let xpEarned = 0;

        if (quest.subQuests && quest.subQuests.length > 0) {
            // Add XP for newly checked items
            if (newlyCheckedSubs.length > 0) {
                const added = await updateCharacter(
                    req.user.id,
                    quest,
                    newlyCheckedSubs
                );
                xpEarned += added;
            }

            // Deduct XP for newly unchecked items
            if (newlyUncheckedSubs.length > 0) {
                const deducted = await deductCharacterXP(
                    req.user.id,
                    quest,
                    newlyUncheckedSubs
                );
                xpEarned -= deducted;
            }
        } else {
            // Standard quest without sub-quests
            if ((!existing || !existing.completed) && value) {
                const added = await updateCharacter(
                    req.user.id,
                    quest,
                    value
                );
                xpEarned += added;
            } else if (existing && existing.completed && !value) {
                const deducted = await deductCharacterXP(
                    req.user.id,
                    quest,
                    existing.value || true
                );
                xpEarned -= deducted;
            }
        }

        const isNowCompleted = (quest.subQuests && quest.subQuests.length > 0)
            ? completedSubQuests.length > 0
            : Boolean(value);

        if (existing) {
            existing.value = value;
            existing.completedSubQuests = completedSubQuests;
            existing.xpEarned = Math.max(0, existing.xpEarned + xpEarned);
            existing.completed = isNowCompleted;
            existing.name = quest.name;
            existing.questType = quest.questType;
        } else {
            entry.quests.push({
                quest: quest._id,
                name: quest.name,
                questType: quest.questType,
                value,
                completedSubQuests,
                xpEarned: Math.max(0, xpEarned),
                completed: isNowCompleted,
            });
        }

        entry.totalXP = entry.quests.reduce((sum, q) => sum + Math.max(0, q.xpEarned), 0);
        entry.completedQuests = entry.quests.filter(q => q.completed).length;
        entry.totalQuests = await Quest.countDocuments({ user: req.user.id, active: true });
        entry.completionPercentage = entry.totalQuests === 0 ? 0 : Math.round((entry.completedQuests * 100) / entry.totalQuests);

        await entry.save();

        const character = await Character.findOne({ user: req.user.id });

        await updateStreak(character, req.user.id, timezoneOffset ? Number(timezoneOffset) : null);
        await entry.populate("quests.quest");
        await applyPenalty(character, entry.quests);
        await character.save();

        res.json({
            success: true,
            questId: quest._id,
            xpEarned,
            level: character.level,
            rank: character.rank,
            currentXP: character.xp,
            completedSubQuests,
            completed: isNowCompleted,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
}

module.exports = saveQuest;