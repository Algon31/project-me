const Quest = require("../../models/Quest");
const DailyEntry = require("../../models/DailyEntry");
const Character = require("../../models/Character");
const { updateStreak } = require("../../services/streakEngine");
const { applyPenalty } = require("../../services/dailyPenaltyEngine");

const { updateCharacter } = require("../../services/characterEngine");

async function saveQuest(req, res) {

    try {

        const quest = await Quest.findOne({

            _id: req.params.id,

            user: req.user.id,

            active: true,

        });

        if (!quest) {

            return res.status(404).json({

                message: "Quest not found",

            });

        }
        const value = req.body.value;

        const today = new Date()
            .toISOString()
            .split("T")[0];

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

        if (existing && existing.completed) {

            existing.value = value;

            await entry.save();

            const character = await Character.findOne({
                user: req.user.id,
            });

            return res.json({
                success: true,
                questId: quest._id,
                level: character.level,
                rank: character.rank,
                currentXP: character.xp,
                completed: true,
                alreadyCompleted: true,
            });
        }

        // First completion today
        const xpEarned = await updateCharacter(
            req.user.id,
            quest,
            value
        );

        if (existing) {

            existing.value = value;
            existing.xpEarned = xpEarned;
            existing.completed = xpEarned > 0;
        } else {

            entry.quests.push({
                quest: quest._id,
                value,
                xpEarned,
                completed: xpEarned > 0,
                questType: quest.questType,
            });

        }

        entry.totalXP = entry.quests.reduce(
            (sum, q) => sum + q.xpEarned,
            0
        );

        entry.completedQuests = entry.quests.filter(
            q => q.completed
        ).length;
        entry.totalQuests = await Quest.countDocuments({
            user: req.user.id,
            active: true,
        });

        entry.completionPercentage =
            entry.totalQuests === 0
                ? 0
                : Math.round(
                    (entry.completedQuests * 100) /
                    entry.totalQuests
                );

        await entry.save();

        const character = await Character.findOne({

            user: req.user.id,

        });

        await updateStreak(
            character,
            req.user.id,
        );

        await applyPenalty(

            character,

            entry.quests,

        );

        await character.save();

        res.json({

            success: true,

            questId: quest._id,

            xpEarned,

            level: character.level,

            rank: character.rank,

            currentXP: character.xp,

            completed: xpEarned > 0,

        });

    }

    catch (error) {

        console.error(error);

        res.status(500).json({

            message: "Server Error",

        });

    }

}

module.exports = saveQuest;