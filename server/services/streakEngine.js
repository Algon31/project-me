const Quest = require("../models/Quest");
const DailyEntry = require("../models/DailyEntry");

async function updateStreak(character, userId) {

    const today = new Date().toISOString().split("T")[0];

    // Get today's entry with quest references populated
    const entry = await DailyEntry.findOne({
        user: userId,
        date: today,
    }).populate("quests.quest");

    if (!entry) {
        return;
    }

    const coreQuests = entry.quests.filter(
        (q) => q.quest?.questType === "Core"
    );

    if (coreQuests.length === 0) {
        return;
    }

    const completed = coreQuests.every(
        (q) => q.completed
    );

    if (completed) {

        const todayDate = new Date(today);

        if (!character.lastStreakDate) {

            character.currentStreak = 1;

        } else {

            const lastDate = new Date(character.lastStreakDate);

            const diffDays = Math.floor(
                (todayDate - lastDate) / (1000 * 60 * 60 * 24)
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

    } else {

            return;

    }

}

module.exports = {
    updateStreak,
};