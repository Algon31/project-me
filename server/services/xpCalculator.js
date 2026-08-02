function calculateQuestXP(quest, value) {
    if (!quest.active) return 0;

    // Check if subQuests exist and value passes completedSubQuests array
    if (quest.subQuests && Array.isArray(quest.subQuests) && quest.subQuests.length > 0) {
        let completedSubs = [];
        if (Array.isArray(value)) {
            completedSubs = value;
        } else if (value && typeof value === "object" && Array.isArray(value.completedSubQuests)) {
            completedSubs = value.completedSubQuests;
        } else if (value === true) {
            completedSubs = quest.subQuests;
        }

        if (completedSubs.length === 0) return 0;

        const ratio = completedSubs.length / quest.subQuests.length;
        return Math.round(quest.xpReward * ratio);
    }

    switch (quest.inputType) {
        case "checkbox":
            return value ? quest.xpReward : 0;

        case "number": {
            const amount = Number(value || 0);
            const xp = amount * quest.xpReward;
            return Math.min(xp, quest.maxXpPerDay);
        }

        case "text":
            return value && String(value).trim() !== ""
                ? quest.xpReward
                : 0;

        default:
            return 0;
    }
}

module.exports = {
    calculateQuestXP,
};