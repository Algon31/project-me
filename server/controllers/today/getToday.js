const DailyEntry = require("../../models/DailyEntry");

async function getToday(req, res) {

    try {

        const today = new Date()

            .toISOString()

            .split("T")[0];

        const entry = await DailyEntry.findOne({

            user: req.user.id,

            date: today,

        }).populate("quests.quest");

        if (!entry) {

            return res.json({

                quests: [],

            });

        }

        res.json(entry);

    }

    catch (error) {

        console.error(error);

        res.status(500).json({

            message: "Server Error",

        });

    }

}

module.exports = getToday;