const test = require("node:test");
const assert = require("node:assert/strict");
const Character = require("../models/Character");
const Notification = require("../models/Notification");
const Quest = require("../models/Quest");
const LongTermGoal = require("../models/LongTermGoal");
const DailyEntry = require("../models/DailyEntry");
const Achievement = require("../models/Achievement");
const { updateCharacter, deductCharacterXP } = require("../services/characterEngine");

const VALID_USER_ID = "507f1f77bcf86cd799439011";

test("Character Engine - updateCharacter adds XP, triggers level-up, rank change, and notifications", async (t) => {
    let notifications = [];
    let savedCharacter = false;

    const mockSkillsMap = new Map();

    const mockCharacter = {
        user: VALID_USER_ID,
        level: 1,
        xp: 90,
        totalXp: 90,
        rank: "E",
        attributes: {
            Strength: { level: 1, xp: 0, totalXp: 0 }
        },
        skills: mockSkillsMap,
        save: async function () { savedCharacter = true; }
    };

    const origFindCharacter = Character.findOne;
    const origCreateNotif = Notification.create;
    const origQuestCount = Quest.countDocuments;
    const origGoalCount = LongTermGoal.countDocuments;
    const origDailyFind = DailyEntry.findOne;
    const origFindAch = Achievement.findOne;
    const origCreateAch = Achievement.create;

    Character.findOne = async () => mockCharacter;
    Notification.create = async (doc) => { notifications.push(doc); };
    Quest.countDocuments = async () => 0;
    LongTermGoal.countDocuments = async () => 0;
    DailyEntry.findOne = () => ({
        sort: () => null
    });
    Achievement.findOne = async () => null;
    Achievement.create = async () => {};

    t.after(() => {
        Character.findOne = origFindCharacter;
        Notification.create = origCreateNotif;
        Quest.countDocuments = origQuestCount;
        LongTermGoal.countDocuments = origGoalCount;
        DailyEntry.findOne = origDailyFind;
        Achievement.findOne = origFindAch;
        Achievement.create = origCreateAch;
    });

    const quest = {
        name: "Morning Run",
        active: true,
        inputType: "checkbox",
        xpReward: 50,
        affectsAttributes: ["Strength"],
        skill: "Cardio"
    };

    // 90 + 50 = 140 XP. Required for Lv 1 -> Lv 2 is 100 XP. Leftover: 40 XP. Level: 2.
    const earnedXp = await updateCharacter(VALID_USER_ID, quest, true);

    assert.equal(earnedXp, 50);
    assert.equal(mockCharacter.level, 2);
    assert.equal(mockCharacter.xp, 40);
    assert.equal(mockCharacter.totalXp, 140);
    assert.equal(savedCharacter, true);

    // Verify main quest skill was unlocked & updated
    assert.ok(mockSkillsMap.has("Cardio"));
    const cardioSkill = mockSkillsMap.get("Cardio");
    assert.equal(cardioSkill.totalXp, 50);
    assert.equal(cardioSkill.xp, 50);
    assert.equal(cardioSkill.level, 1);

    // Verify notifications were sent (Quest Completed, Level Up, Skill Unlocked)
    assert.ok(notifications.some(n => n.title === "Quest Completed"));
    assert.ok(notifications.some(n => n.title === "Level Up!"));
    assert.ok(notifications.some(n => n.title === "Skill Unlocked"));
});

test("Character Engine - updateCharacter handles Sub-Quests skill progression", async (t) => {
    const mockSkillsMap = new Map();

    const mockCharacter = {
        user: VALID_USER_ID,
        level: 5,
        xp: 10,
        totalXp: 500,
        rank: "E",
        attributes: {},
        skills: mockSkillsMap,
        save: async () => {}
    };

    const origFindCharacter = Character.findOne;
    const origCreateNotif = Notification.create;
    const origQuestCount = Quest.countDocuments;
    const origGoalCount = LongTermGoal.countDocuments;
    const origDailyFind = DailyEntry.findOne;
    const origFindAch = Achievement.findOne;
    const origCreateAch = Achievement.create;

    Character.findOne = async () => mockCharacter;
    Notification.create = async () => {};
    Quest.countDocuments = async () => 0;
    LongTermGoal.countDocuments = async () => 0;
    DailyEntry.findOne = () => ({
        sort: () => null
    });
    Achievement.findOne = async () => null;
    Achievement.create = async () => {};

    t.after(() => {
        Character.findOne = origFindCharacter;
        Notification.create = origCreateNotif;
        Quest.countDocuments = origQuestCount;
        LongTermGoal.countDocuments = origGoalCount;
        DailyEntry.findOne = origDailyFind;
        Achievement.findOne = origFindAch;
        Achievement.create = origCreateAch;
    });

    const subQuest = {
        name: "Full Body Workout",
        active: true,
        xpReward: 200,
        subQuests: ["Pushups", "Squats"]
    };

    await updateCharacter(VALID_USER_ID, subQuest, ["Pushups", "Squats"]);

    assert.ok(mockSkillsMap.has("Pushups"));
    assert.ok(mockSkillsMap.has("Squats"));

    // Sub XP = max(25, 200 / 2) = 100 XP.
    // 100 XP -> level up to 2 with 0 remaining XP.
    const pushupsSkill = mockSkillsMap.get("Pushups");
    assert.equal(pushupsSkill.totalXp, 100);
    assert.equal(pushupsSkill.level, 2);
    assert.equal(pushupsSkill.xp, 0);
});

test("Character Engine - deductCharacterXP correctly safely deducts XP and updates sub-skills", async (t) => {
    let savedCharacter = false;
    const mockSkillsMap = new Map([
        ["Pushups", { level: 2, xp: 50, totalXp: 150 }]
    ]);

    const mockCharacter = {
        user: VALID_USER_ID,
        level: 5,
        xp: 30,
        totalXp: 500,
        rank: "E",
        skills: mockSkillsMap,
        save: async () => { savedCharacter = true; }
    };

    const origFindCharacter = Character.findOne;
    const origCreateNotif = Notification.create;

    Character.findOne = async () => mockCharacter;
    Notification.create = async () => {};

    t.after(() => {
        Character.findOne = origFindCharacter;
        Notification.create = origCreateNotif;
    });

    const quest = {
        name: "Full Body Workout",
        active: true,
        xpReward: 200,
        subQuests: ["Pushups"]
    };

    // Deducting 200 XP from 30 XP -> 0 floor, totalXp 500 - 200 = 300
    const deducted = await deductCharacterXP(VALID_USER_ID, quest, ["Pushups"]);

    assert.equal(deducted, 200);
    assert.equal(mockCharacter.xp, 0);
    assert.equal(mockCharacter.totalXp, 300);
    assert.equal(savedCharacter, true);

    // Sub skill deduction: max(25, 200 / 1) = 200. totalXp 150 - 200 = 0 floor. Level = 1 + floor(0/100) = 1.
    const pushupsSkill = mockSkillsMap.get("Pushups");
    assert.equal(pushupsSkill.totalXp, 0);
    assert.equal(pushupsSkill.xp, 0);
    assert.equal(pushupsSkill.level, 1);
});
