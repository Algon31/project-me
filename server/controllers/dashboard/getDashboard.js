const DailyEntry = require("../../models/DailyEntry");
const Metric = require("../../models/Metric");

const getDashboard = async (req, res) => {
    try {
        const today = new Date().toISOString().split("T")[0];

        const metrics = await Metric.find({
            user: req.user.id,
            active: true,
        });

        const entry = await DailyEntry.findOne({
            user: req.user.id,
            date: today,
        }).populate("values.metric");

        if (!entry) {
            return res.json({
                score: 0,
                streak: 0,
                completed: 0,
                total: metrics.length,
                problemsSolved: 0,
                iqScore: 0,
            });
        }

        let score = 0;
        let completed = 0;
        let problemsSolved = 0;
        let iqScore = 0;

        entry.values.forEach((item) => {

            if (item.metric.type === "checkbox" && item.value) {
                score += item.metric.weight;
                completed++;
            }

            if (item.metric.name === "Problems Solved") {
                problemsSolved = item.value;
            }

            if (item.metric.name === "IQ Score") {
                iqScore = item.value;
            }

        });

        res.json({
            score,
            streak: 1,
            completed,
            total: metrics.length,
            problemsSolved,
            iqScore,
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Server Error",
        });

    }
};

module.exports = getDashboard;