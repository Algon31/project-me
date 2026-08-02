const Character = require("../models/Character");
const Notification = require("../models/Notification");
const { calculateQuestXP } = require("./xpCalculator");
const { xpRequired, calculateRank } = require("../utils/levelSystem");
const { checkAchievements } = require("./achievementEngine");
const { rewardAttributes } = require("./attributeEngine");

async function createNotification(user, title, message, type = "system") {
    await Notification.create({
        user,
        title,
        message,
        type,
    });
}

async function updateCharacter(userId, quest, value) {
    const xp = calculateQuestXP(quest, value);

    if (xp <= 0) return 0;

    const character = await Character.findOne({
        user: userId,
    });

    if (!character) {
        throw new Error("Character not found.");
    }

    // ==========================
    // Character XP & Leveling
    // ==========================
    character.totalXp += xp;
    character.xp += xp;

    await createNotification(
        userId,
        "Quest Completed",
        `${quest.name} completed. +${xp} XP.`,
        "quest"
    );

    while (character.xp >= xpRequired(character.level)) {
        character.xp -= xpRequired(character.level);
        character.level++;

        await createNotification(
            userId,
            "Level Up!",
            `You reached Level ${character.level}.`,
            "level"
        );
    }

    const previousRank = character.rank;
    character.rank = calculateRank(character.level);

    if (previousRank !== character.rank) {
        await createNotification(
            userId,
            "Rank Promotion!",
            `Rank ${previousRank} → ${character.rank}`,
            "rank"
        );
    }

    // ==========================
    // Attributes
    // ==========================
    await rewardAttributes(character, quest, xp);

    // ==========================
    // Main Quest Skill (if defined)
    // ==========================
    if (quest.skill) {
        const key = quest.skill.trim();

        if (!character.skills.has(key)) {
            character.skills.set(key, {
                level: 1,
                xp: 0,
                totalXp: 0,
            });

            await createNotification(
                userId,
                "Skill Unlocked",
                quest.skill,
                "skill"
            );
        }

        const skill = character.skills.get(key);
        skill.totalXp += xp;
        skill.xp += xp;

        while (skill.xp >= 100) {
            skill.level++;
            skill.xp -= 100;

            await createNotification(
                userId,
                "Skill Level Up!",
                `${quest.skill} Lv.${skill.level}`,
                "skill"
            );
        }

        character.skills.set(key, skill);
    }

    // ==========================
    // Sub-Quests Skill Leveling System
    // ==========================
    let completedSubs = [];
    if (Array.isArray(value)) {
        completedSubs = value;
    } else if (value && typeof value === "object" && Array.isArray(value.completedSubQuests)) {
        completedSubs = value.completedSubQuests;
    }

    if (completedSubs.length > 0) {
        const subXpAmount = Math.max(25, Math.round(xp / completedSubs.length));

        for (const subName of completedSubs) {
            const subKey = subName.trim();

            if (!character.skills.has(subKey)) {
                character.skills.set(subKey, {
                    level: 1,
                    xp: 0,
                    totalXp: 0,
                });

                await createNotification(
                    userId,
                    "Sub-Quest Skill Unlocked",
                    `${subKey} (Lv. 1)`,
                    "skill"
                );
            }

            const subSkill = character.skills.get(subKey);
            subSkill.totalXp += subXpAmount;
            subSkill.xp += subXpAmount;

            while (subSkill.xp >= 100) {
                subSkill.level++;
                subSkill.xp -= 100;

                await createNotification(
                    userId,
                    "Sub-Quest Level Up!",
                    `${subKey} reached Level ${subSkill.level}!`,
                    "skill"
                );
            }

            character.skills.set(subKey, subSkill);
        }
    }

    await character.save();
    await checkAchievements(userId);

    return xp;
}

async function deductCharacterXP(userId, quest, value) {
    const xpToDeduct = calculateQuestXP(quest, value);

    if (xpToDeduct <= 0) return 0;

    const character = await Character.findOne({ user: userId });
    if (!character) return 0;

    // Deduct character XP safely
    character.xp = Math.max(0, character.xp - xpToDeduct);
    character.totalXp = Math.max(0, character.totalXp - xpToDeduct);

    character.rank = calculateRank(character.level);

    let uncheckedSubs = [];
    if (Array.isArray(value)) {
        uncheckedSubs = value;
    } else if (value && typeof value === "object" && Array.isArray(value.completedSubQuests)) {
        uncheckedSubs = value.completedSubQuests;
    }

    if (uncheckedSubs.length > 0) {
        const subXpAmount = Math.max(25, Math.round(xpToDeduct / uncheckedSubs.length));

        for (const subName of uncheckedSubs) {
            const subKey = subName.trim();
            if (character.skills.has(subKey)) {
                const subSkill = character.skills.get(subKey);
                subSkill.totalXp = Math.max(0, subSkill.totalXp - subXpAmount);
                subSkill.xp = Math.max(0, subSkill.xp - subXpAmount);
                subSkill.level = Math.max(1, 1 + Math.floor(subSkill.totalXp / 100));
                character.skills.set(subKey, subSkill);
            }
        }
    }

    await createNotification(
        userId,
        "Quest Progress Unmarked",
        `${quest.name} progress un-checked. -${xpToDeduct} XP.`,
        "quest"
    );

    await character.save();
    return xpToDeduct;
}

module.exports = {
    updateCharacter,
    deductCharacterXP,
};