const LongTermGoal=
require("../../models/LongTermGoal");

const updateGoal=async(req,res)=>{

    const goal=
    await LongTermGoal.findOneAndUpdate(

        {

            _id:req.params.id,

            user:req.user.id,

        },

        req.body,

        {

            new:true,

        }

    );

    res.json(goal);

};

module.exports=updateGoal;