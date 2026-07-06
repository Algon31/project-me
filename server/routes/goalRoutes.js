const express=require("express");

const router=express.Router();

const auth=
require("../middleware/authMiddleware");

const createGoal=
require("../controllers/goals/createGoal");

const getGoals=
require("../controllers/goals/getGoals");

const updateGoal=
require("../controllers/goals/updateGoal");

router.use(auth);

router.get("/",getGoals);

router.post("/",createGoal);

router.put("/:id",updateGoal);

module.exports=router;