const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");

const authMiddleware = require("./middleware/authMiddleware");

const questRoutes = require("./routes/questRoutes");
const todayRoutes = require("./routes/todayRoutes");
const characterRoutes = require("./routes/characterRoutes");
const analyticsRoutes = require("./routes/analyticsRoutes");
const achivementsRoutes = require("./routes/achievementRoutes");
const notificationRoutes = require("./routes/notificationRoutes");
const goalsRoutes = require("./routes/goalRoutes")

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

        message: "Welcome to Project : ME",

        user: req.user,

    });

});

app.use("/api/quests", questRoutes);

app.use("/api/today", todayRoutes);

app.use("/api/character", characterRoutes);

app.use("/api/analytics", analyticsRoutes);
app.use("/api/achievements", achivementsRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/goals", goalsRoutes);

module.exports = app;