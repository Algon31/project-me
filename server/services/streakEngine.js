async function updateStreak(character, quests) {

    const coreQuests = quests.filter(

        q => q.isCore

    );

    if (coreQuests.length === 0) {

        return;

    }

    const completed = coreQuests.every(

        q => q.completed

    );

    if (completed) {

        character.currentStreak++;

        character.longestStreak = Math.max(

            character.currentStreak,

            character.longestStreak

        );

    }

    else {

        character.currentStreak = 0;

    }

}

module.exports = {

    updateStreak,

};