const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const createMetric = require("../controllers/metric/createMetric");
const getMetrics = require("../controllers/metric/getMetrics");
const updateMetric = require("../controllers/metric/updateMetric");
const deleteMetric = require("../controllers/metric/deleteMetric");

router.use(authMiddleware);

router.get("/", getMetrics);

router.post("/", createMetric);

router.put("/:id", updateMetric);

router.delete("/:id", deleteMetric);

module.exports = router;