const DailyEntry = require("../../models/DailyEntry");

const getDashboard = async (req, res) => {
    try {
        const today = new Date().toISOString().split("T")[0];

        const entries = await DailyEntry.find({
            user: req.user.id,
        })
            .populate("values.metric")
            .sort({ date: 1 });

        if (entries.length === 0) {
            return res.json({
                score: 0,
                streak: 0,
                longestStreak: 0,
                trackedDays: 0,
                weeklyAverage: 0,
                completed: 0,
                total: 0,
                completionPercentage: 0,
                problemsSolved: 0,
                iqScore: 0,
            });
        }

        const todayEntry = entries.find(
            (entry) => entry.date === today
        );

        let problemsSolved = 0;
        let iqScore = 0;

        if (todayEntry) {
            todayEntry.values.forEach((item) => {
                if (!item.metric) return;

                if (item.metric.name === "Problems Solved") {
                    problemsSolved = Number(item.value || 0);
                }

                if (item.metric.name === "IQ Score") {
                    iqScore = Number(item.value || 0);
                }
            });
        }

        // ---------- Current Streak ----------

        let streak = 0;

        for (let i = entries.length - 1; i >= 0; i--) {

            if (entries[i].completionPercentage > 0) {
                streak++;
            } else {
                break;
            }

        }

        // ---------- Longest Streak ----------

        let longestStreak = 0;
        let current = 0;

        entries.forEach((entry) => {

            if (entry.completionPercentage > 0) {

                current++;

                longestStreak = Math.max(
                    longestStreak,
                    current
                );

            } else {

                current = 0;

            }

        });

        // ---------- Weekly Average ----------

        const last7 = entries.slice(-7);

        const weeklyAverage =
            last7.length > 0
                ? Math.round(
                      last7.reduce(
                          (sum, entry) => sum + entry.score,
                          0
                      ) / last7.length
                  )
                : 0;

        res.json({

            score: todayEntry?.score || 0,

            completed: todayEntry?.completed || 0,

            total: todayEntry?.totalMetrics || 0,

            completionPercentage:
                todayEntry?.completionPercentage || 0,

            problemsSolved,

            iqScore,

            streak,

            longestStreak,

            trackedDays: entries.length,

            weeklyAverage,

        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Server Error",
        });

    }
};

module.exports = getDashboard;