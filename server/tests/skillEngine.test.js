const test = require("node:test");
const assert = require("node:assert/strict");
const Skill = require("../models/Skill");
const { addSkillXP } = require("../services/skillEngine");

test("Skill Engine - ignores quest without skill property", async () => {
    const questWithoutSkill = { affectsAttributes: ["Knowledge"], category: "Tech" };
    // Should return without error or database operation
    await addSkillXP("507f1f77bcf86cd799439011", questWithoutSkill, 50);
});

test("Skill Engine - creates new skill if non-existent", async (t) => {
    let createdDoc = null;
    let saved = false;

    const origFindOne = Skill.findOne;
    const origCreate = Skill.create;

    Skill.findOne = async () => null;
    Skill.create = async (doc) => {
        createdDoc = {
            ...doc,
            level: 1,
            xp: 0,
            totalXp: 0,
            save: async function () { saved = true; }
        };
        return createdDoc;
    };

    t.after(() => {
        Skill.findOne = origFindOne;
        Skill.create = origCreate;
    });

    const quest = {
        skill: "NodeJS",
        affectsAttributes: ["Knowledge"],
        category: "Programming"
    };

    await addSkillXP("507f1f77bcf86cd799439011", quest, 80);

    assert.ok(createdDoc);
    assert.equal(createdDoc.name, "NodeJS");
    assert.equal(createdDoc.attribute, "Knowledge");
    assert.equal(createdDoc.totalXp, 80);
    assert.equal(createdDoc.xp, 80);
    assert.equal(createdDoc.level, 1);
    assert.equal(saved, true);
});

test("Skill Engine - adds XP to existing skill and calculates level-ups", async (t) => {
    let saved = false;

    const existingSkill = {
        name: "React",
        attribute: "Knowledge",
        level: 1,
        xp: 70,
        totalXp: 70,
        save: async function () { saved = true; }
    };

    const origFindOne = Skill.findOne;
    Skill.findOne = async () => existingSkill;

    t.after(() => {
        Skill.findOne = origFindOne;
    });

    const quest = {
        skill: "React",
        affectsAttributes: ["Knowledge"],
        category: "Frontend"
    };

    // Adding 250 XP to existing 70 XP (Total 320 XP)
    // 70 + 250 = 320 -> Level 1 -> 2 -> 3 -> 4 with 20 leftover XP
    await addSkillXP("507f1f77bcf86cd799439011", quest, 250);

    assert.equal(existingSkill.level, 4);
    assert.equal(existingSkill.xp, 20);
    assert.equal(existingSkill.totalXp, 320);
    assert.equal(saved, true);
});
