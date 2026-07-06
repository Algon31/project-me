const DailyEntry = require("../../models/DailyEntry");
const Character = require("../../models/Character");

const getAnalytics = async (req, res) => {

    try {

        const entries = await DailyEntry.find({

            user: req.user.id,

        }).sort({ date: 1 });

        const character = await Character.findOne({

            user: req.user.id,

        });

        const xpTimeline = entries.map(entry => ({

            date: entry.date,

            xp: entry.totalXP,

        }));

        const completionTimeline = entries.map(entry => ({

            date: entry.date,

            completion: entry.completionPercentage,

        }));

        const stats = {

            totalDays: entries.length,

            totalXP:

                entries.reduce(

                    (sum, entry) => sum + entry.totalXP,

                    0

                ),

            averageXP:

                entries.length

                    ?

                    Math.round(

                        entries.reduce(

                            (sum, entry) =>

                                sum + entry.totalXP,

                            0

                        ) / entries.length

                    )

                    : 0,

            averageCompletion:

                entries.length

                    ?

                    Math.round(

                        entries.reduce(

                            (sum, entry) =>

                                sum + entry.completionPercentage,

                            0

                        ) / entries.length

                    )

                    : 0,

            level: character.level,

            rank: character.rank,

        };

        res.json({

            xpTimeline,

            completionTimeline,

            attributes: character.attributes,

            skills: Object.fromEntries(

                character.skills

            ),

            stats,

        });

    }

    catch(error){

        console.error(error);

        res.status(500).json({

            message:"Server Error",

        });

    }

};

module.exports = getAnalytics;