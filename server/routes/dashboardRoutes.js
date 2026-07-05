const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const getDashboard = require("../controllers/dashboard/getDashboard");

router.use(authMiddleware);

router.get("/", getDashboard);

module.exports = router;