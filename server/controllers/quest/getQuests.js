const Quest = require("../../models/Quest");

const getQuests = async (req,res)=>{

    try{

        const quests = await Quest.find({

            user:req.user.id,

            active:true,

        })
        .sort({
            order:1,
            createdAt:1,
        });

        res.json(quests);

    }

    catch(error){

        console.error(error);

        res.status(500).json({

            message:"Server Error",

        });

    }

};

module.exports = getQuests;