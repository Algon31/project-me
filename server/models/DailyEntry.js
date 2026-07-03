const mongoose = require("mongoose");

const dailyEntrySchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        date: {
            type: String,
            required: true,
        },

        values: [
            {
                metric: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Metric",
                    required: true,
                },

                value: {
                    type: mongoose.Schema.Types.Mixed,
                    default: null,
                },
            },
        ],
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("DailyEntry", dailyEntrySchema);