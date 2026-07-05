const DailyEntry = require("../../models/DailyEntry");

const getAnalytics = async (req, res) => {
    try {

        const entries = await DailyEntry.find({
            user: req.user.id,
        }).sort({ date: 1 });

        const completionData = entries.map(entry => ({
            date: entry.date,
            completion: entry.completionPercentage,
        }));

        const scoreData = entries.map(entry => ({
            date: entry.date,
            score: entry.score,
        }));

        const stats = {
            totalDays: entries.length,

            averageScore:
                entries.length > 0
                    ? Math.round(
                          entries.reduce(
                              (sum, entry) => sum + entry.score,
                              0
                          ) / entries.length
                      )
                    : 0,

            averageCompletion:
                entries.length > 0
                    ? Math.round(
                          entries.reduce(
                              (sum, entry) =>
                                  sum + entry.completionPercentage,
                              0
                          ) / entries.length
                      )
                    : 0,
        };

        res.json({
            completionData,
            scoreData,
            stats,
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Server Error",
        });

    }
};

module.exports = getAnalytics;