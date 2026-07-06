const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const createQuest = require("../controllers/quest/createQuest");
const getQuests = require("../controllers/quest/getQuests");
const updateQuest = require("../controllers/quest/updateQuest");
const deleteQuest = require("../controllers/quest/deleteQuest");

router.use(authMiddleware);

router.get("/", getQuests);

router.post("/", createQuest);

router.put("/:id", updateQuest);

router.delete("/:id", deleteQuest);

module.exports = router;