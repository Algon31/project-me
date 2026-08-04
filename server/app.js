const express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require("fs");

const authRoutes = require("./routes/authRoutes");
const authMiddleware = require("./middleware/authMiddleware");
const questRoutes = require("./routes/questRoutes");
const todayRoutes = require("./routes/todayRoutes");
const characterRoutes = require("./routes/characterRoutes");
const analyticsRoutes = require("./routes/analyticsRoutes");
const achievementsRoutes = require("./routes/achievementRoutes");
const notificationRoutes = require("./routes/notificationRoutes");
const goalsRoutes = require("./routes/goalRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);

app.get("/api", (req, res) => {
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
app.use("/api/achievements", achievementsRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/goals", goalsRoutes);

// Serve client static build files in production or when client/dist exists
const clientDistPath = path.join(__dirname, "../client/dist");
if (fs.existsSync(clientDistPath)) {
    app.use(express.static(clientDistPath));

    // SPA fallback: redirect all non-API GET requests to index.html
    app.get("*", (req, res) => {
        if (!req.path.startsWith("/api")) {
            res.sendFile(path.join(clientDistPath, "index.html"));
        } else {
            res.status(404).json({ message: "API route not found" });
        }
    });
} else {
    app.get("/", (req, res) => {
        res.json({
            message: "Project: ME API is running 🚀",
        });
    });
}

module.exports = app;