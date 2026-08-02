const mongoose = require("mongoose");

const goalSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      default: "",
      trim: true,
    },

    category: {
      type: String,
      enum: ["Physical", "Mind", "Career", "Life"],
      default: "Mind",
    },

    milestones: [
      {
        title: { type: String, required: true, trim: true },
        completed: { type: Boolean, default: false },
      },
    ],

    progress: {
      type: Number,
      default: 0,
    },

    target: {
      type: Number,
      default: 100,
    },

    xpReward: {
      type: Number,
      default: 500,
    },

    goldReward: {
      type: Number,
      default: 50,
    },

    affectsAttributes: [
      {
        type: String,
        enum: [
          "Strength",
          "Endurance",
          "Health",
          "Knowledge",
          "Focus",
          "Creativity",
          "Discipline",
          "Consistency",
        ],
      },
    ],

    completed: {
      type: Boolean,
      default: false,
    },

    completedAt: {
      type: Date,
    },

    deadline: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("LongTermGoal", goalSchema);