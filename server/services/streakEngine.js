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

        if (character.lastStreakDate !== today) {

            character.currentStreak++;

            character.longestStreak = Math.max(
                character.currentStreak,
                character.longestStreak
            );

            character.lastStreakDate = today;
        }

    } else {

        character.currentStreak = 0;

    }

}

module.exports = {
    updateStreak,
};