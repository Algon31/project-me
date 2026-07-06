const Character = require("../../models/Character");
const DailyEntry = require("../../models/DailyEntry");
const { xpRequired } = require("../../utils/levelSystem");

const getCharacterStatus = async (req, res) => {

    try {

        const character = await Character.findOne({
            user: req.user.id,
        }).populate(
            "user",
            "name selectedClass"
        );

        if (!character) {

            return res.status(404).json({
                message: "Character not found.",
            });

        }

        const today =
            new Date().toISOString().split("T")[0];

        const todayEntry =
            await DailyEntry.findOne({

                user: req.user.id,

                date: today,

            });
        user: character.user,
            res.json({

                level: character.level,

                rank: character.rank,

                xp: character.xp,

                xpRequired: xpRequired(character.level),

                totalXp: character.totalXp,

                todayXP: todayEntry?.totalXP || 0,

                currentStreak: character.currentStreak,

                longestStreak: character.longestStreak,

                attributes: character.attributes,

                skills: Object.fromEntries(
                    character.skills
                ),

            });

    }

    catch (error) {

        console.error(error);

        res.status(500).json({

            message: "Server Error",

        });

    }

};

module.exports = getCharacterStatus;