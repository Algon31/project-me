const DailyEntry = require("../../models/DailyEntry");

const getToday = async (req, res) => {
    try {
        const today = new Date().toISOString().split("T")[0];

        const entry = await DailyEntry.findOne({
            user: req.user.id,
            date: today,
        }).populate("values.metric");

        if (!entry) {
            return res.json({
                date: today,
                values: [],
            });
        }

        res.json(entry);
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Server Error",
        });
    }
};

module.exports = getToday;