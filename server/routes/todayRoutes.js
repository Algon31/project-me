const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const getToday = require("../controllers/today/getToday");
const saveQuest = require("../controllers/today/saveQuest");

router.use(authMiddleware);

router.get("/", getToday);

router.post("/quest/:id", saveQuest);

module.exports = router;