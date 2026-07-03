const DailyEntry = require("../../models/DailyEntry");

const saveToday = async (req, res) => {
    try {
        const today = new Date().toISOString().split("T")[0];

        const { values } = req.body;

        let entry = await DailyEntry.findOne({
            user: req.user.id,
            date: today,
        });

        if (entry) {
            entry.values = values;

            await entry.save();
        } else {
            entry = await DailyEntry.create({
                user: req.user.id,
                date: today,
                values,
            });
        }

        res.json({
            message: "Today's progress saved successfully",
            entry,
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Server Error",
        });
    }
};

module.exports = saveToday;