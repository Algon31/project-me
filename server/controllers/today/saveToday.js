const DailyEntry = require("../../models/DailyEntry");
const Quest = require("../../models/Quest");
const Character = require("../../models/Character");
const { getFormattedDate } = require("../../utils/dateUtils");

const {
    updateCharacter,
} = require("../../services/characterEngine");

const {
    updateStreak,
} = require("../../services/streakEngine");

const {
    applyPenalty,
} = require("../../services/dailyPenaltyEngine");

const saveToday = async (req, res) => {
    try {
        const timezoneOffset = req.body.timezoneOffset ?? req.headers["x-timezone-offset"];
        const today = getFormattedDate(new Date(), timezoneOffset ? Number(timezoneOffset) : null);

        const { quests: values = [] } = req.body;

        const quests = await Quest.find({
            user: req.user.id,
            active: true,
        });

        let totalXP = 0;
        let completed = 0;

        const savedQuests = [];

        for (const quest of quests) {
            const input = values.find(
                (v) => String(v.quest) === String(quest._id)
            );

            if (!input) continue;

            const xpEarned = await updateCharacter(
                req.user.id,
                quest,
                input.value
            );

            if (xpEarned > 0) {
                completed++;
            }

            totalXP += xpEarned;

            savedQuests.push({
                quest: quest._id,
                name: quest.name,
                questType: quest.questType,
                value: input.value,
                xpEarned,
                completed: xpEarned > 0,
            });
        }

        const character = await Character.findOne({
            user: req.user.id,
        });

        const completionPercentage =
            quests.length === 0
                ? 0
                : Math.round((completed / quests.length) * 100);

        let entry = await DailyEntry.findOne({
            user: req.user.id,
            date: today,
        });

        if (entry) {
            entry.quests = savedQuests;
            entry.totalXP = totalXP;
            entry.completedQuests = completed;
            entry.totalQuests = quests.length;
            entry.completionPercentage = completionPercentage;
            await entry.save();
        } else {
            entry = await DailyEntry.create({
                user: req.user.id,
                date: today,
                quests: savedQuests,
                totalXP,
                completedQuests: completed,
                totalQuests: quests.length,
                completionPercentage,
            });
        }

        await updateStreak(
            character,
            req.user.id,
            timezoneOffset ? Number(timezoneOffset) : null
        );

        await entry.populate("quests.quest");

        await applyPenalty(
            character,
            entry.quests
        );

        await character.save();

        res.json({
            message: "Daily quests saved.",
            entry,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Server Error",
        });
    }
};

module.exports = saveToday;