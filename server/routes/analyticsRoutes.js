const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const getAnalytics = require("../controllers/analytics/getAnalytics");

router.get("/", authMiddleware, getAnalytics);

module.exports = router;