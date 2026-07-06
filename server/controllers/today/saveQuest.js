const Quest = require("../../models/Quest");
const DailyEntry = require("../../models/DailyEntry");
const Character = require("../../models/Character");

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

        const xpEarned = await updateCharacter(

            req.user.id,

            quest,

            value

        );

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

        if (existing) {

            existing.value = value;
            existing.xpEarned = xpEarned;
            existing.completed = true;

        } else {

            entry.quests.push({

                quest: quest._id,

                value,

                xpEarned,

                completed: true,

            });

        }

        entry.totalXP = entry.quests.reduce(

            (sum, q) => sum + q.xpEarned,

            0

        );

        entry.completedQuests = entry.quests.filter(

            q => q.completed

        ).length;

        await entry.save();

        const character = await Character.findOne({

            user: req.user.id,

        });

        res.json({

            success: true,

            questId: quest._id,

            xpEarned,

            level: character.level,

            rank: character.rank,

            currentXP: character.xp,

            completed: true,

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