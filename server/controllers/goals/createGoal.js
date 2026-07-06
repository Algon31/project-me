const LongTermGoal =
require("../../models/LongTermGoal");

const createGoal=async(req,res)=>{

    const goal=
    await LongTermGoal.create({

        user:req.user.id,

        ...req.body,

    });

    res.status(201).json(goal);

};

module.exports=createGoal;