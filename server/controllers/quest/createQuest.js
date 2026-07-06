const Quest = require("../../models/Quest");

const createQuest = async (req, res) => {

    try {

        const quest = await Quest.create({

            user: req.user.id,

            ...req.body,

        });

        res.status(201).json(quest);

    }

    catch(error){

        console.error(error);

        res.status(500).json({

            message:"Server Error",

        });

    }

};

module.exports = createQuest;