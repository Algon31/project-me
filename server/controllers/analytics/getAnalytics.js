const getAnalytics = async (req, res) => {
    try {
        res.json([
            {
                date: "2026-07-01",
                problemsSolved: 12,
                iqScore: 120,
                completion: 80,
            },
            {
                date: "2026-07-02",
                problemsSolved: 15,
                iqScore: 123,
                completion: 90,
            },
        ]);
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Server Error",
        });
    }
};

module.exports = getAnalytics;