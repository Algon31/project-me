const Achievement = require("../models/Achievement");
const Character = require("../models/Character");
const Notification = require("../models/Notification");

async function unlock(user, title, description) {

    let achievement =
        await Achievement.findOne({

            user,
            title,

        });

    if (achievement) return;

    await Achievement.create({

        user,

        title,

        description,

        unlocked: true,

        unlockedAt: new Date(),

    });

    await Notification.create({

        user,

        title: "Achievement Earned",

        message: title,

        type: "achievement",

    });

}

async function checkAchievements(userId) {

    const character =
        await Character.findOne({

            user: userId,

        });

    if (!character) return;

    if (character.level >= 2) {

        await unlock(

            userId,

            "First Level Up",

            "Reached Level 2."

        );

    }

    if (character.level >= 10) {

        await unlock(

            userId,

            "Rising Hunter",

            "Reached Level 10."

        );

    }

    if (character.level >= 25) {

        await unlock(

            userId,

            "Elite Hunter",

            "Reached Level 25."

        );

    }

    if (character.totalXp >= 1000) {

        await unlock(

            userId,

            "1000 XP",

            "Earned 1000 XP."

        );

    }

    if (character.currentStreak >= 7) {

        await unlock(

            userId,

            "7 Day Streak",

            "Stayed consistent."

        );

    }

    if (character.currentStreak >= 30) {

        await unlock(

            userId,

            "30 Day Streak",

            "Incredible consistency."

        );

    }
    if (character.totalXp >= 5000) {

        await unlock(

            userId,

            "Dedicated",

            "Earned 5000 XP."

        );

    }

    if (character.totalXp >= 10000) {

        await unlock(

            userId,

            "Unstoppable",

            "Earned 10000 XP."

        );

    }

    if (character.currentStreak >= 100) {

        await unlock(

            userId,

            "Legend",

            "100 Day Streak."

        );

    }

}

module.exports = {

    checkAchievements,

};