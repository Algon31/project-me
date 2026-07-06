function calculateQuestXP(quest, value) {

    if (!quest.active) return 0;

    switch (quest.inputType) {

        case "checkbox":

            return value ? quest.xpReward : 0;

        case "number": {

            const amount = Number(value || 0);

            const xp = amount * quest.xpReward;

            return Math.min(xp, quest.maxXpPerDay);
        }

        case "text":

            return value && value.trim() !== ""
                ? quest.xpReward
                : 0;

        default:

            return 0;

    }

}

module.exports = {

    calculateQuestXP,

};