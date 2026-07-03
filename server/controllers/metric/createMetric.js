const Metric = require("../../models/Metric");

const createMetric = async (req, res) => {
    try {
        const { name, type, weight } = req.body;

        const metric = await Metric.create({
            user: req.user.id,
            name,
            type,
            weight,
        });

        res.status(201).json(metric);
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Server Error",
        });
    }
};

module.exports = createMetric;