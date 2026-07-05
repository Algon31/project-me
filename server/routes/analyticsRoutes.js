const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const getAnalytics = require("../controllers/analytics/getAnalytics");

router.use(authMiddleware);

router.get("/", getAnalytics);

module.exports = router;