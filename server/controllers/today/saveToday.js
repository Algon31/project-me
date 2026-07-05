const DailyEntry = require("../../models/DailyEntry");
const Metric = require("../../models/Metric");

const saveToday = async (req, res) => {
    try {
        const today = new Date().toISOString().split("T")[0];

        const { values } = req.body;

        // Get all active metrics
        const metrics = await Metric.find({
            user: req.user.id,
            active: true,
        });

        let score = 0;
        let completed = 0;

        for (const metric of metrics) {
            const value = values.find(
                (v) => String(v.metric) === String(metric._id)
            );

            if (!value) continue;

            switch (metric.type) {
                case "checkbox":
                    if (value.value === true) {
                        completed++;
                        score += metric.weight;
                    }
                    break;

                case "number":
                    score += Number(value.value || 0);
                    completed++;
                    break;

                case "text":
                    if (value.value && value.value.trim() !== "") {
                        completed++;
                    }
                    break;
            }
        }

        const completionPercentage = Math.round(
            (completed / metrics.length) * 100
        );

        let entry = await DailyEntry.findOne({
            user: req.user.id,
            date: today,
        });

        if (entry) {
            entry.values = values;
            entry.score = score;
            entry.completed = completed;
            entry.totalMetrics = metrics.length;
            entry.completionPercentage = completionPercentage;

            await entry.save();
        } else {
            entry = await DailyEntry.create({
                user: req.user.id,
                date: today,
                values,
                score,
                completed,
                totalMetrics: metrics.length,
                completionPercentage,
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