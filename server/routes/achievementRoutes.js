const express=require("express");

const router=express.Router();

const auth=
require("../middleware/authMiddleware");

const getAchievements=
require("../controllers/achievement/getAchievements");

router.use(auth);

router.get("/",getAchievements);

module.exports=router;