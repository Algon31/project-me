# Project: ME v2

> Become the Main Character of Your Life.

Project: ME is a gamified personal growth application that transforms everyday self-improvement into an RPG-like progression system. Instead of simply tracking habits, every action contributes toward building your character.

Daily quests reward experience points, attributes grow over time, skills improve through repetition, sub-quests grant granular mastery, and long-term consistency shapes your character's progression.

The goal is simple:

**Level up yourself in real life.**

---

## 💡 Core Philosophy

Most productivity apps measure completed tasks.

Project: ME measures **character progression**.

Every completed quest makes your character stronger.

Instead of asking:

> "Did I finish my habits today?"

Project: ME asks:

> "Who did I become today?"

---

# ⚔️ Features

## 👤 Character Progression

Build a character that grows alongside you.

- 📈 Character Levels
- ⚡ XP System
- 👑 Rank System (E → S Rank)
- 🔥 Current & Longest Streaks
- 🧠 Multiple Attributes
- 🗡️ Independent Skills & Sub-Quest Skills

---

## 📜 Daily Quests & Sub-Quests

Complete real-world tasks to earn XP.

Examples:

- 🏋️ Gym & Workouts (Pushups, Squats, Cardio)
- 📚 Reading & Learning
- 💻 Coding & Side Projects
- 🧘 Meditation & Focus
- 📝 Journaling
- ⚡ Any custom quest

Each quest supports:

- ☑️ Checkbox input
- 🔢 Number input (with daily XP cap limits)
- 💬 Text input
- 🧩 Granular Sub-Quests (partial & full rewards)

---

## 📊 RPG Progression Engine

Every quest contributes directly toward your character.

Attributes include:

- 🏋️ **Strength**
- 🏃 **Endurance**
- ❤️ **Health**
- 🧠 **Knowledge**
- 🎯 **Focus**
- 🎨 **Creativity**
- 🛡️ **Discipline**
- 🔥 **Consistency**

Skills level up independently through repetition and sub-quest completions.

```text
Knowledge
├── Programming
├── React
├── Linux
└── AI
```

---

## ⚒️ Forge

Create and customize your own quests.

Customize:

- 🏷️ Quest Type (Core vs Optional)
- 📁 Category
- 💎 XP Reward
- 🎯 Difficulty
- 📝 Input Type
- 🧠 Attributes affected
- ⚔️ Skills & Sub-Quests affected

---

## 📈 Progress & Analytics

Track your personal evolution through comprehensive charts.

View:

- ⚡ XP progression curves
- ✅ Completion rate & consistency
- 🗓️ Daily performance logs
- 📊 Long-term growth trends

---

## 🏆 Master & Secret Achievements

Unlock 30 total achievements across 5 categories, including 5 hidden secret achievements:

- 🐣 **Progression**: First Step, Novice Hunter, Rising Hunter, Elite Hunter, Master Hunter, Monarch Status, S-Rank Awakened
- 🔥 **Consistency**: Spark of Habit (3d), Week Warrior (7d), Fortnight Force (14d), Monthly Mastery (30d), Century Grind (100d), Iron Will (365d)
- 💰 **XP Milestones**: First Blood, XP Collector, Dedicated Grinder, Unstoppable Force, XP Overlord, Legendary Entity
- 🏰 **Campaigns & Mastery**: First Campaign, Milestone Crusher, Campaign Master, Physical Titan, Mind Architect, Forge Specialist
- 🔒 **Secret Achievements**: 
  - Wanna Know?? Play and Find out!!

---

## 🔔 Notifications & Real-Time Feedback

Receive instant progression alerts when:

- 🎯 Completing quests
- 📈 Leveling up character & skills
- 👑 Achieving rank promotions
- 🏆 Unlocking master & secret achievements

---

## 📜 Main Quests (Campaigns)

Set long-term milestones that require days or weeks of dedicated effort to complete.

---

# 🛠️ Tech Stack

#### Frontend
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)
![Axios](https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white)

#### Backend
![NodeJS](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![ExpressJS](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)

---

# 📁 Project Structure

```text
client/              # React frontend (Vite, React Router, Tailwind)
server/              # Express REST API, Game Engine & Mongoose models
  ├── controllers/   # Request handlers
  ├── middleware/    # Auth & JWT verification
  ├── models/        # Mongoose schemas (Character, Quest, Achievement, etc.)
  ├── routes/        # API route definitions
  ├── services/      # Core Game Engine (XP, Streaks, Skills, Achievements)
  ├── tests/         # Automated unit test suites
  └── utils/         # Level formulas and date utilities
scripts/             # System verification and build automation scripts
```

---

# 🧪 Automated Testing & Verification

Project: ME includes an automated system verification test suite.

### Run All System Tests & Frontend Build Check

```bash
npm run test:all
```

### Run Backend Unit Tests Only

```bash
npm test --prefix server
```

The test runner covers:

- 🎮 **Game Engine**: XP formulas, rank scaling (E → S), level requirements.
- 🔥 **Streak Engine**: Daily tracking, consecutive logic, timezone offsets.
- 🗡️ **Skill & Sub-Quest Engine**: XP allocation, level calculations, remainder XP.
- 👤 **Character Engine**: Character progression, rank promotions, safe XP deductions.
- 🏆 **Achievement Engine**: Requirement evaluations for all 30 master/secret achievements.
- 🔑 **Auth Middleware**: JWT validation, Bearer token extraction, 401 error handling.
- 🗓️ **Date Utilities**: Date string formatting, UTC & client timezone offset handling.

---


# 📌 Current Status

Version: **v2.0**

Current implementation includes:

- ✅ Authentication & JWT Security
- ✅ Character & Attribute System
- ✅ Daily Quest & Sub-Quest System
- ✅ RPG Progression & Rank Engine
- ✅ Dynamic Skill Leveling
- ✅ Master & Secret Achievements (30 Total)
- ✅ Real-Time Notifications
- ✅ Analytics & XP Trends
- ✅ Main Quests / Campaigns
- ✅ Automated Verification & Test Suite
- ✅ Production SPA Fallback Configuration

---

# 🌟 Vision

Project: ME is designed as a long-term self-improvement RPG.

The objective is not simply to complete tasks, but to continuously improve the person behind the screen.

Every day is another opportunity to gain experience.

Every quest completed is progress.

Every level earned represents real personal growth.

---

> Become 1% Better Every Day. 🚀