const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");

const createGoal = require("../controllers/goals/createGoal");
const getGoals = require("../controllers/goals/getGoals");
const updateGoal = require("../controllers/goals/updateGoal");
const deleteGoal = require("../controllers/goals/deleteGoal");

router.use(auth);

router.get("/", getGoals);
router.post("/", createGoal);
router.put("/:id", updateGoal);
router.delete("/:id", deleteGoal);

module.exports = router;