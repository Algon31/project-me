const test = require("node:test");
const assert = require("node:assert/strict");

const { xpRequired, calculateRank } = require("../utils/levelSystem");
const { calculateQuestXP } = require("../services/xpCalculator");
const { getFormattedDate } = require("../utils/dateUtils");
const { rewardAttributes, decayAttribute } = require("../services/attributeEngine");
const { applyPenalty } = require("../services/dailyPenaltyEngine");

test("Level System - xpRequired and calculateRank", () => {
    assert.equal(xpRequired(1), 100);
    assert.equal(xpRequired(2), 125);

    assert.equal(calculateRank(1), "E");
    assert.equal(calculateRank(15), "D");
    assert.equal(calculateRank(50), "B");
    assert.equal(calculateRank(100), "S");
});

test("XP Calculator - Checkbox and Number Quests", () => {
    const checkboxQuest = { active: true, inputType: "checkbox", xpReward: 50 };
    assert.equal(calculateQuestXP(checkboxQuest, true), 50);
    assert.equal(calculateQuestXP(checkboxQuest, false), 0);

    const numberQuest = { active: true, inputType: "number", xpReward: 10, maxXpPerDay: 50 };
    assert.equal(calculateQuestXP(numberQuest, 3), 30);
    assert.equal(calculateQuestXP(numberQuest, 10), 50); // Capped at maxXpPerDay
});

test("XP Calculator - SubQuests Partial and Full Rewards", () => {
    const gymQuest = {
        active: true,
        xpReward: 100,
        subQuests: ["Arms", "Legs", "Biceps", "Core"],
    };

    // 2 out of 4 subquests completed = 50% XP = 50 XP
    assert.equal(calculateQuestXP(gymQuest, ["Arms", "Biceps"]), 50);
    // All 4 subquests completed = 100% XP = 100 XP
    assert.equal(calculateQuestXP(gymQuest, ["Arms", "Legs", "Biceps", "Core"]), 100);
});

test("Date Utils - Formatting date strings", () => {
    const date = new Date(2026, 7, 2); // August 2, 2026
    assert.equal(getFormattedDate(date), "2026-08-02");
});

test("Attribute Engine - Reward and Decay", async () => {
    const mockCharacter = {
        attributes: {
            Strength: { level: 1, xp: 0, totalXp: 0 },
            Knowledge: { level: 1, xp: 50, totalXp: 50 },
        },
    };

    const mockQuest = { affectsAttributes: ["Strength"] };
    await rewardAttributes(mockCharacter, mockQuest, 100);

    // 20% of 100 XP = 20 XP
    assert.equal(mockCharacter.attributes.Strength.xp, 20);
    assert.equal(mockCharacter.attributes.Strength.totalXp, 20);

    await decayAttribute(mockCharacter, "Knowledge");
    // 50 - 15 = 35 XP
    assert.equal(mockCharacter.attributes.Knowledge.xp, 35);
});

test("Daily Penalty Engine - Apply penalty on uncompleted quests", async () => {
    const mockCharacter = {
        attributes: {
            Strength: { level: 1, xp: 50, totalXp: 50 },
            Knowledge: { level: 1, xp: 50, totalXp: 50 },
        },
    };

    const mockQuests = [
        { name: "Gym", completed: false },
        { name: "Reading", completed: true },
    ];

    await applyPenalty(mockCharacter, mockQuests);

    // Strength should decay from 50 to 35, Knowledge remains 50
    assert.equal(mockCharacter.attributes.Strength.xp, 35);
    assert.equal(mockCharacter.attributes.Knowledge.xp, 50);
});
