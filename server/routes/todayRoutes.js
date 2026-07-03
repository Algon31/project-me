const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const getToday = require("../controllers/today/getToday");
const saveToday = require("../controllers/today/saveToday");

router.use(authMiddleware);

router.get("/", getToday);

router.post("/", saveToday);

module.exports = router;