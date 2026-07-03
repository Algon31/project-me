const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const authMiddleware = require("./middleware/authMiddleware");
const metricRoutes = require("./routes/metricRoutes");
const todayRoutes = require("./routes/todayRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
    res.json({
        message: "Project: ME API is running 🚀",
    });
});
app.get("/api/profile", authMiddleware, (req, res) => {
    res.json({
        message: "Welcome to Project: ME",
        user: req.user,
    });
});
app.use("/api/metrics", metricRoutes);
app.use("/api/today", todayRoutes);


module.exports = app;