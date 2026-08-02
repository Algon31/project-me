const Character = require("../../models/Character");
const DailyEntry = require("../../models/DailyEntry");
const { xpRequired } = require("../../utils/levelSystem");
const { getFormattedDate } = require("../../utils/dateUtils");

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

        const timezoneOffset = req.query.timezoneOffset ?? req.headers["x-timezone-offset"];
        const today = getFormattedDate(new Date(), timezoneOffset ? Number(timezoneOffset) : null);

        const todayEntry = await DailyEntry.findOne({
            user: req.user.id,
            date: today,
        });

        res.json({
            user: character.user,
            level: character.level,
            rank: character.rank,
            xp: character.xp,
            xpRequired: xpRequired(character.level),
            totalXp: character.totalXp,
            todayXP: todayEntry?.totalXP || 0,
            currentStreak: character.currentStreak,
            longestStreak: character.longestStreak,
            attributes: character.attributes,
            skills: character.skills ? Object.fromEntries(character.skills) : {},
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