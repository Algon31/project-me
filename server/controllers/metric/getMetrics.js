const Metric = require("../../models/Metric");

const getMetrics = async (req, res) => {
    try {
        // console.log("req.user:", req.user);

        const metrics = await Metric.find({
            user: req.user.id,
            active: true,
        });

        // console.log("metrics:", metrics);

        res.json(metrics);
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Server Error",
        });
    }
};

module.exports = getMetrics;