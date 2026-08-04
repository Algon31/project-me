const mongoose = require("mongoose");

const skillSchema = new mongoose.Schema(
    {
        character: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Character",
            required: true,
        },
        attribute: {
            type: String,
            default: "Knowledge",
        },
        category: {
            type: String,
            default: "General",
        },
        name: {
            type: String,
            required: true,
        },
        level: {
            type: Number,
            default: 1,
        },
        xp: {
            type: Number,
            default: 0,
        },
        totalXp: {
            type: Number,
            default: 0,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Skill", skillSchema);
