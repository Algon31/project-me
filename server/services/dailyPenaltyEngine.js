const { decayAttribute } = require("./attributeEngine");

async function applyPenalty(character, quests) {
    if (!quests || !Array.isArray(quests)) return;

    for (const q of quests) {
        if (!q.completed) {
            const questName = q.name || q.quest?.name || "";
            const affectsAttributes = q.quest?.affectsAttributes || [];

            // Check hardcoded defaults or quest-defined affected attributes
            if (questName === "Gym" || affectsAttributes.includes("Strength")) {
                await decayAttribute(character, "Strength");
            }
            if (questName === "Reading" || affectsAttributes.includes("Knowledge")) {
                await decayAttribute(character, "Knowledge");
            }

            // Decay any other custom attributes specified by the quest schema
            for (const attr of affectsAttributes) {
                if (attr !== "Strength" && attr !== "Knowledge") {
                    await decayAttribute(character, attr);
                }
            }
        }
    }
}

module.exports = {
    applyPenalty,
};