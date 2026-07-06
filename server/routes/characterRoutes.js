const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const getCharacterStatus =
require("../controllers/character/getCharacterStatus");

router.use(authMiddleware);

router.get("/", getCharacterStatus);

module.exports = router;