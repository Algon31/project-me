const Skill = require("../models/Skill");

const addSkillXP = async (

    characterId,

    quest,

    xp

) => {

    if (!quest.skill) return;

    let skill = await Skill.findOne({

        character: characterId,

        name: quest.skill,

    });

    if (!skill) {

        skill = await Skill.create({

            character: characterId,

            attribute:
                quest.affectsAttributes[0] || "Knowledge",

            category: quest.category,

            name: quest.skill,

        });

    }

    skill.totalXp += xp;

    skill.xp += xp;

    while (skill.xp >= 100) {

        skill.level++;

        skill.xp -= 100;

    }

    await skill.save();

};

module.exports = {

    addSkillXP,

};