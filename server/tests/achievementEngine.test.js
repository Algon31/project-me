const test = require("node:test");
const assert = require("node:assert/strict");
const Achievement = require("../models/Achievement");
const Character = require("../models/Character");
const Notification = require("../models/Notification");
const Quest = require("../models/Quest");
const LongTermGoal = require("../models/LongTermGoal");
const DailyEntry = require("../models/DailyEntry");
const { checkAchievements, MASTER_ACHIEVEMENTS } = require("../services/achievementEngine");

test("Achievement Engine - MASTER_ACHIEVEMENTS structure verification", () => {
    assert.equal(MASTER_ACHIEVEMENTS.length, 30);
    assert.ok(MASTER_ACHIEVEMENTS.some(a => a.key === "level_2"));
    assert.ok(MASTER_ACHIEVEMENTS.some(a => a.key === "rank_s"));
    assert.ok(MASTER_ACHIEVEMENTS.some(a => a.key === "secret_night_owl"));
});

test("Achievement Engine - checkAchievements unlocks progression, streaks, and secret achievements", async (t) => {
    const unlockedKeys = new Set();
    const notifications = [];

    const mockCharacter = {
        level: 10,
        rank: "D",
        currentStreak: 7,
        totalXp: 1500,
        attributes: {
            Strength: { level: 10 },
            Knowledge: { level: 5 }
        },
        skills: {
            "Skill1": {}, "Skill2": {}, "Skill3": {}, "Skill4": {}, "Skill5": {}
        }
    };

    const origFindChar = Character.findOne;
    const origCountQuest = Quest.countDocuments;
    const origCountGoal = LongTermGoal.countDocuments;
    const origFindAch = Achievement.findOne;
    const origCreateAch = Achievement.create;
    const origCreateNotif = Notification.create;
    const origFindDaily = DailyEntry.findOne;

    Character.findOne = async () => mockCharacter;
    Quest.countDocuments = async () => 12;
    LongTermGoal.countDocuments = async () => 5;

    Achievement.findOne = async ({ key }) => unlockedKeys.has(key) ? { unlocked: true } : null;
    Achievement.create = async (doc) => { unlockedKeys.add(doc.key); };
    Notification.create = async (doc) => { notifications.push(doc); };

    DailyEntry.findOne = () => ({
        sort: () => ({
            totalXP: 600,
            completionPercentage: 100,
            totalQuests: 5,
            completedQuests: 5
        })
    });

    t.after(() => {
        Character.findOne = origFindChar;
        Quest.countDocuments = origCountQuest;
        LongTermGoal.countDocuments = origCountGoal;
        Achievement.findOne = origFindAch;
        Achievement.create = origCreateAch;
        Notification.create = origCreateNotif;
        DailyEntry.findOne = origFindDaily;
    });

    await checkAchievements("507f1f77bcf86cd799439011");

    // Progression: level_2, level_5, level_10
    assert.ok(unlockedKeys.has("level_2"));
    assert.ok(unlockedKeys.has("level_5"));
    assert.ok(unlockedKeys.has("level_10"));

    // Streaks: streak_3, streak_7
    assert.ok(unlockedKeys.has("streak_3"));
    assert.ok(unlockedKeys.has("streak_7"));

    // XP: xp_100, xp_1000
    assert.ok(unlockedKeys.has("xp_100"));
    assert.ok(unlockedKeys.has("xp_1000"));

    // Campaigns & Mastery: main_quest_1, main_quest_5, physical_titan, forge_master (questCount >= 10)
    assert.ok(unlockedKeys.has("main_quest_1"));
    assert.ok(unlockedKeys.has("main_quest_5"));
    assert.ok(unlockedKeys.has("physical_titan"));
    assert.ok(unlockedKeys.has("forge_master"));

    // Secret Achievements: secret_overkill (600 XP), secret_perfectionist (100%), secret_jack_of_trades (5 skills), secret_relentless (5 completed quests)
    assert.ok(unlockedKeys.has("secret_overkill"));
    assert.ok(unlockedKeys.has("secret_perfectionist"));
    assert.ok(unlockedKeys.has("secret_jack_of_trades"));
    assert.ok(unlockedKeys.has("secret_relentless"));

    assert.ok(notifications.length > 0);
});
