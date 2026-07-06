const Achievement =
require("../../models/Achievement");

const getAchievements=async(req,res)=>{

    const achievements=
    await Achievement.find({

        user:req.user.id,

    })
    .sort({
        unlockedAt:-1
    });

    res.json(achievements);

};

module.exports=
getAchievements;