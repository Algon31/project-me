const test = require("node:test");
const assert = require("node:assert/strict");
const Quest = require("../models/Quest");
const DailyEntry = require("../models/DailyEntry");
const { updateStreak } = require("../services/streakEngine");
const { getFormattedDate } = require("../utils/dateUtils");

test("Streak Engine - zero core quests returns early", async (t) => {
    const origCount = Quest.countDocuments;
    Quest.countDocuments = async () => 0;
    t.after(() => { Quest.countDocuments = origCount; });

    const character = { currentStreak: 5, longestStreak: 10 };
    await updateStreak(character, "507f1f77bcf86cd799439011");

    assert.equal(character.currentStreak, 5);
    assert.equal(character.longestStreak, 10);
});

test("Streak Engine - missing daily entry returns early", async (t) => {
    const origCount = Quest.countDocuments;
    const origFindOne = DailyEntry.findOne;

    Quest.countDocuments = async () => 2;
    DailyEntry.findOne = () => ({
        populate: async () => null
    });

    t.after(() => {
        Quest.countDocuments = origCount;
        DailyEntry.findOne = origFindOne;
    });

    const character = { currentStreak: 3, longestStreak: 5 };
    await updateStreak(character, "507f1f77bcf86cd799439011");

    assert.equal(character.currentStreak, 3);
    assert.equal(character.longestStreak, 5);
});

test("Streak Engine - first streak initialized to 1", async (t) => {
    const today = getFormattedDate(new Date());

    const origCount = Quest.countDocuments;
    const origFindOne = DailyEntry.findOne;

    Quest.countDocuments = async () => 2;
    DailyEntry.findOne = () => ({
        populate: async () => ({
            quests: [
                { completed: true, questType: "Core" },
                { completed: true, questType: "Core" }
            ]
        })
    });

    t.after(() => {
        Quest.countDocuments = origCount;
        DailyEntry.findOne = origFindOne;
    });

    const character = { currentStreak: 0, longestStreak: 0, lastStreakDate: null };
    await updateStreak(character, "507f1f77bcf86cd799439011");

    assert.equal(character.currentStreak, 1);
    assert.equal(character.longestStreak, 1);
    assert.equal(character.lastStreakDate, today);
});

test("Streak Engine - consecutive day streak increment", async (t) => {
    const todayStr = getFormattedDate(new Date());
    const yesterdayDate = new Date();
    yesterdayDate.setDate(yesterdayDate.getDate() - 1);
    const yesterdayStr = getFormattedDate(yesterdayDate);

    const origCount = Quest.countDocuments;
    const origFindOne = DailyEntry.findOne;

    Quest.countDocuments = async () => 1;
    DailyEntry.findOne = () => ({
        populate: async () => ({
            quests: [{ completed: true, questType: "Core" }]
        })
    });

    t.after(() => {
        Quest.countDocuments = origCount;
        DailyEntry.findOne = origFindOne;
    });

    const character = { currentStreak: 4, longestStreak: 4, lastStreakDate: yesterdayStr };
    await updateStreak(character, "507f1f77bcf86cd799439011");

    assert.equal(character.currentStreak, 5);
    assert.equal(character.longestStreak, 5);
    assert.equal(character.lastStreakDate, todayStr);
});

test("Streak Engine - missed day resets streak to 1", async (t) => {
    const todayStr = getFormattedDate(new Date());
    const oldDate = new Date();
    oldDate.setDate(oldDate.getDate() - 3); // 3 days ago
    const oldStr = getFormattedDate(oldDate);

    const origCount = Quest.countDocuments;
    const origFindOne = DailyEntry.findOne;

    Quest.countDocuments = async () => 1;
    DailyEntry.findOne = () => ({
        populate: async () => ({
            quests: [{ completed: true, questType: "Core" }]
        })
    });

    t.after(() => {
        Quest.countDocuments = origCount;
        DailyEntry.findOne = origFindOne;
    });

    const character = { currentStreak: 12, longestStreak: 15, lastStreakDate: oldStr };
    await updateStreak(character, "user123");

    assert.equal(character.currentStreak, 1);
    assert.equal(character.longestStreak, 15);
    assert.equal(character.lastStreakDate, todayStr);
});

test("Streak Engine - same day duplicate call does not double increment", async (t) => {
    const todayStr = getFormattedDate(new Date());

    const origCount = Quest.countDocuments;
    const origFindOne = DailyEntry.findOne;

    Quest.countDocuments = async () => 1;
    DailyEntry.findOne = () => ({
        populate: async () => ({
            quests: [{ completed: true, questType: "Core" }]
        })
    });

    t.after(() => {
        Quest.countDocuments = origCount;
        DailyEntry.findOne = origFindOne;
    });

    const character = { currentStreak: 3, longestStreak: 5, lastStreakDate: todayStr };
    await updateStreak(character, "user123");

    // Current streak should remain unchanged since today was already counted
    assert.equal(character.currentStreak, 3);
    assert.equal(character.longestStreak, 5);
});
