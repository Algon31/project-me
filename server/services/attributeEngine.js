const Character = require("../models/Character");

async function rewardAttributes(character, quest, xp) {

    if (!quest.affectsAttributes) return;

    for (const attribute of quest.affectsAttributes) {

        const stat = character.attributes[attribute];

        if (!stat) continue;

        stat.totalXp += Math.round(xp * 0.20);

        stat.xp += Math.round(xp * 0.20);

        while (stat.xp >= 100) {

            stat.level++;
            stat.xp -= 100;

        }

    }

}

async function decayAttribute(character, attribute) {

    const stat = character.attributes[attribute];

    if (!stat) return;

    stat.xp -= 15;

    if (stat.xp < 0) {

        if (stat.level > 1) {

            stat.level--;
            stat.xp = 85;

        }

        else {

            stat.xp = 0;

        }

    }

}

module.exports = {

    rewardAttributes,

    decayAttribute,

};