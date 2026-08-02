const Quest = require("../models/Quest");
const DailyEntry = require("../models/DailyEntry");
const { getFormattedDate } = require("../utils/dateUtils");

async function updateStreak(character, userId, timezoneOffset = null) {
    const today = getFormattedDate(new Date(), timezoneOffset);

    // Get total active Core Quests for this user
    const totalCoreCount = await Quest.countDocuments({
        user: userId,
        questType: "Core",
        active: true,
    });

    if (totalCoreCount === 0) {
        return;
    }

    const entry = await DailyEntry.findOne({
        user: userId,
        date: today,
    }).populate("quests.quest");

    if (!entry) {
        return;
    }

    const completedCoreCount = entry.quests.filter((q) => {
        const type = q.quest?.questType || q.questType;
        return q.completed && type === "Core";
    }).length;

    // Streak increments ONLY if ALL active core quests are completed
    if (completedCoreCount >= totalCoreCount) {
        const todayDate = new Date(`${today}T00:00:00.000Z`);

        if (!character.lastStreakDate) {
            character.currentStreak = 1;
        } else {
            const lastDate = new Date(`${character.lastStreakDate}T00:00:00.000Z`);
            const diffDays = Math.round(
                (todayDate.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24)
            );

            if (diffDays === 1) {
                // Consecutive day
                character.currentStreak++;
            } else if (diffDays > 1) {
                // Missed one or more days
                character.currentStreak = 1;
            } else {
                // Already counted today
                return;
            }
        }

        character.longestStreak = Math.max(
            character.currentStreak,
            character.longestStreak
        );

        character.lastStreakDate = today;
    }
}

module.exports = {
    updateStreak,
};