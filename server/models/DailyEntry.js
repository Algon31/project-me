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
        
        quests: [
            {
                quest: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Quest",
                    required: true,
                },

                name: {
                    type: String,
                    default: "",
                },

                questType: {
                    type: String,
                    default: "Core",
                },

                value: {
                    type: mongoose.Schema.Types.Mixed,
                    default: null,
                },

                xpEarned: {
                    type: Number,
                    default: 0,
                },

                completed: {
                    type: Boolean,
                    default: false,
                },

                completedSubQuests: [
                    {
                        type: String,
                    },
                ],
            },
        ],

        totalXP: {
            type: Number,
            default: 0,
        },

        completedQuests: {
            type: Number,
            default: 0,
        },

        totalQuests: {
            type: Number,
            default: 0,
        },

        completionPercentage: {
            type: Number,
            default: 0,
        },
    },
    {
        timestamps: true,
    }
);

dailyEntrySchema.index(
    {
        user: 1,
        date: 1,
    },
    {
        unique: true,
    }
);

module.exports = mongoose.model("DailyEntry", dailyEntrySchema);