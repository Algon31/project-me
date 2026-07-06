const Character = require("../models/Character");
const Notification = require("../models/Notification");

const { calculateQuestXP } = require("./xpCalculator");

const {
    xpRequired,
    calculateRank,
} = require("../utils/levelSystem");

const {
    checkAchievements,
} = require("./achievementEngine");

const {
    rewardAttributes,
} = require("./attributeEngine");

async function createNotification(
    user,
    title,
    message,
    type = "system"
) {
    await Notification.create({
        user,
        title,
        message,
        type,
    });
}

async function updateCharacter(
    userId,
    quest,
    value
) {

    const xp = calculateQuestXP(
        quest,
        value
    );

    if (xp <= 0) return 0;

    const character = await Character.findOne({
        user: userId,
    });

    if (!character) {
        throw new Error("Character not found.");
    }

    // ==========================
    // Character XP
    // ==========================

    character.totalXp += xp;
    character.xp += xp;

    await createNotification(
        userId,
        "Quest Completed",
        `${quest.name} completed. +${xp} XP.`,
        "quest"
    );

    while (
        character.xp >=
        xpRequired(character.level)
    ) {

        character.xp -= xpRequired(character.level);
        character.level++;

        await createNotification(
            userId,
            "Level Up",
            `You reached Level ${character.level}.`,
            "level"
        );
    }

    const previousRank = character.rank;

    character.rank = calculateRank(
        character.level
    );

    if (previousRank !== character.rank) {

        await createNotification(
            userId,
            "Rank Promotion",
            `Rank ${previousRank} → ${character.rank}`,
            "rank"
        );

    }

    // ==========================
    // Attributes
    // ==========================

    await rewardAttributes(
        character,
        quest,
        xp
    );

    // ==========================
    // Skills
    // ==========================

    if (quest.skill) {

        const key =
            `${quest.category}/${quest.skill}`;

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

        const skill =
            character.skills.get(key);

        skill.totalXp += xp;
        skill.xp += xp;

        while (skill.xp >= 100) {

            skill.level++;
            skill.xp -= 100;

            await createNotification(
                userId,
                "Skill Level Up",
                `${quest.skill} Lv.${skill.level}`,
                "skill"
            );

        }

        character.skills.set(key, skill);

    }

    await character.save();

    await checkAchievements(userId);

    return xp;
}

module.exports = {
    updateCharacter,
};