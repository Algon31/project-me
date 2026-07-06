const LongTermGoal=
require("../../models/LongTermGoal");

const getGoals=async(req,res)=>{

    const goals=
    await LongTermGoal.find({

        user:req.user.id,

    });

    res.json(goals);

};

module.exports=getGoals;