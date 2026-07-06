const Quest = require("../../models/Quest");

const updateQuest = async (req,res)=>{

    try{

        const quest = await Quest.findOneAndUpdate(

            {

                _id:req.params.id,

                user:req.user.id,

            },

            req.body,

            {

                new:true,

            }

        );

        res.json(quest);

    }

    catch(error){

        console.error(error);

        res.status(500).json({

            message:"Server Error",

        });

    }

};

module.exports = updateQuest;