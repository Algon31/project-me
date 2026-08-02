const Achievement = require("../models/Achievement");
const Character = require("../models/Character");
const Notification = require("../models/Notification");
const DailyEntry = require("../models/DailyEntry");
const Quest = require("../models/Quest");
const LongTermGoal = require("../models/LongTermGoal");

const MASTER_ACHIEVEMENTS = [
  // Progression
  { key: "level_2", title: "First Step", description: "Reached Level 2.", icon: "🐣", category: "Progression", requirement: "Reach Level 2" },
  { key: "level_5", title: "Novice Hunter", description: "Reached Level 5.", icon: "⚔️", category: "Progression", requirement: "Reach Level 5" },
  { key: "level_10", title: "Rising Hunter", description: "Reached Level 10.", icon: "🛡️", category: "Progression", requirement: "Reach Level 10" },
  { key: "level_25", title: "Elite Hunter", description: "Reached Level 25.", icon: "🎖️", category: "Progression", requirement: "Reach Level 25" },
  { key: "level_50", title: "Master Hunter", description: "Reached Level 50.", icon: "👑", category: "Progression", requirement: "Reach Level 50" },
  { key: "level_100", title: "Monarch Status", description: "Reached Level 100.", icon: "🌌", category: "Progression", requirement: "Reach Level 100" },
  { key: "rank_s", title: "S-Rank Awakened", description: "Achieved prestigious S-Rank Status.", icon: "💎", category: "Progression", requirement: "Reach S-Rank" },

  // Consistency / Streaks
  { key: "streak_3", title: "Spark of Habit", description: "Maintained a 3-Day Quest Streak.", icon: "⚡", category: "Consistency", requirement: "3 Day Streak" },
  { key: "streak_7", title: "Week Warrior", description: "Maintained a 7-Day Quest Streak.", icon: "🔥", category: "Consistency", requirement: "7 Day Streak" },
  { key: "streak_14", title: "Fortnight Force", description: "Maintained a 14-Day Quest Streak.", icon: "🛡️", category: "Consistency", requirement: "14 Day Streak" },
  { key: "streak_30", title: "Monthly Mastery", description: "Maintained a 30-Day Quest Streak.", icon: "🌕", category: "Consistency", requirement: "30 Day Streak" },
  { key: "streak_100", title: "Century Grind", description: "Maintained a 100-Day Quest Streak.", icon: "🏆", category: "Consistency", requirement: "100 Day Streak" },
  { key: "streak_365", title: "Iron Will", description: "Maintained a 365-Day Quest Streak.", icon: "🏛️", category: "Consistency", requirement: "365 Day Streak" },

  // XP Milestones
  { key: "xp_100", title: "First Blood", description: "Earned your first 100 XP.", icon: "🩸", category: "XP Milestones", requirement: "Earn 100 XP" },
  { key: "xp_1000", title: "XP Collector", description: "Accumulated 1,000 Total XP.", icon: "💰", category: "XP Milestones", requirement: "Earn 1,000 XP" },
  { key: "xp_5000", title: "Dedicated Grinder", description: "Accumulated 5,000 Total XP.", icon: "🔮", category: "XP Milestones", requirement: "Earn 5,000 XP" },
  { key: "xp_10000", title: "Unstoppable Force", description: "Accumulated 10,000 Total XP.", icon: "🚀", category: "XP Milestones", requirement: "Earn 10,000 XP" },
  { key: "xp_50000", title: "XP Overlord", description: "Accumulated 50,000 Total XP.", icon: "⚡", category: "XP Milestones", requirement: "Earn 50,000 XP" },
  { key: "xp_100000", title: "Legendary Entity", description: "Accumulated 100,000 Total XP.", icon: "🌟", category: "XP Milestones", requirement: "Earn 100,000 XP" },

  // Campaigns & Mastery
  { key: "main_quest_1", title: "First Campaign", description: "Completed your first Main Quest.", icon: "📜", category: "Campaigns", requirement: "Complete 1 Main Quest" },
  { key: "main_quest_5", title: "Milestone Crusher", description: "Completed 5 Main Quests.", icon: "🔨", category: "Campaigns", requirement: "Complete 5 Main Quests" },
  { key: "main_quest_10", title: "Campaign Master", description: "Completed 10 Main Quests.", icon: "🏰", category: "Campaigns", requirement: "Complete 10 Main Quests" },
  { key: "physical_titan", title: "Physical Titan", description: "Strength or Endurance level reached Level 10.", icon: "💪", category: "Mastery", requirement: "Reach Attribute Lv 10" },
  { key: "mind_architect", title: "Mind Architect", description: "Knowledge or Focus level reached Level 10.", icon: "🧠", category: "Mastery", requirement: "Reach Attribute Lv 10" },
  { key: "forge_master", title: "Forge Specialist", description: "Created 10 custom Quests in The Forge.", icon: "⚒️", category: "Mastery", requirement: "Create 10 Quests" },

  // 5 Hidden Secret Achievements
  { key: "secret_night_owl", title: "Night Owl", description: "Completed a quest after midnight (between 12 AM and 4 AM).", icon: "🌙", category: "Secret", isSecret: true, requirement: "Complete a quest after midnight" },
  { key: "secret_overkill", title: "Overkill", description: "Earned 500+ XP in a single day.", icon: "💥", category: "Secret", isSecret: true, requirement: "Earn 500+ XP in one day" },
  { key: "secret_perfectionist", title: "Perfectionist", description: "Completed 100% of all active daily quests in a single day.", icon: "✨", category: "Secret", isSecret: true, requirement: "100% Daily Quest Completion" },
  { key: "secret_jack_of_trades", title: "Jack of All Trades", description: "Unlocked & leveled up 5 different Sub-Quest skills.", icon: "🎭", category: "Secret", isSecret: true, requirement: "Level up 5 Sub-Quest skills" },
  { key: "secret_relentless", title: "Relentless", description: "Completed 5 daily quests in a single day.", icon: "🦁", category: "Secret", isSecret: true, requirement: "Complete 5 quests in one day" },
];

async function unlock(userId, master) {
  let existing = await Achievement.findOne({ user: userId, key: master.key });
  if (existing && existing.unlocked) return;

  if (existing) {
    existing.unlocked = true;
    existing.unlockedAt = new Date();
    await existing.save();
  } else {
    await Achievement.create({
      user: userId,
      key: master.key,
      title: master.title,
      description: master.description,
      icon: master.icon,
      category: master.category,
      isSecret: master.isSecret || false,
      requirement: master.requirement,
      unlocked: true,
      unlockedAt: new Date(),
    });
  }

  await Notification.create({
    user: userId,
    title: master.isSecret ? "🔒 Secret Achievement Unlocked!" : "🏆 Achievement Earned",
    message: master.title,
    type: "achievement",
  });
}

async function checkAchievements(userId) {
  const character = await Character.findOne({ user: userId });
  if (!character) return;

  const questCount = await Quest.countDocuments({ user: userId });
  const completedGoalsCount = await LongTermGoal.countDocuments({ user: userId, completed: true });

  const currentHour = new Date().getHours();

  // Levels
  if (character.level >= 2) await unlock(userId, MASTER_ACHIEVEMENTS[0]);
  if (character.level >= 5) await unlock(userId, MASTER_ACHIEVEMENTS[1]);
  if (character.level >= 10) await unlock(userId, MASTER_ACHIEVEMENTS[2]);
  if (character.level >= 25) await unlock(userId, MASTER_ACHIEVEMENTS[3]);
  if (character.level >= 50) await unlock(userId, MASTER_ACHIEVEMENTS[4]);
  if (character.level >= 100) await unlock(userId, MASTER_ACHIEVEMENTS[5]);
  if (character.rank === "S") await unlock(userId, MASTER_ACHIEVEMENTS[6]);

  // Streaks
  if (character.currentStreak >= 3) await unlock(userId, MASTER_ACHIEVEMENTS[7]);
  if (character.currentStreak >= 7) await unlock(userId, MASTER_ACHIEVEMENTS[8]);
  if (character.currentStreak >= 14) await unlock(userId, MASTER_ACHIEVEMENTS[9]);
  if (character.currentStreak >= 30) await unlock(userId, MASTER_ACHIEVEMENTS[10]);
  if (character.currentStreak >= 100) await unlock(userId, MASTER_ACHIEVEMENTS[11]);
  if (character.currentStreak >= 365) await unlock(userId, MASTER_ACHIEVEMENTS[12]);

  // Total XP
  if (character.totalXp >= 100) await unlock(userId, MASTER_ACHIEVEMENTS[13]);
  if (character.totalXp >= 1000) await unlock(userId, MASTER_ACHIEVEMENTS[14]);
  if (character.totalXp >= 5000) await unlock(userId, MASTER_ACHIEVEMENTS[15]);
  if (character.totalXp >= 10000) await unlock(userId, MASTER_ACHIEVEMENTS[16]);
  if (character.totalXp >= 50000) await unlock(userId, MASTER_ACHIEVEMENTS[17]);
  if (character.totalXp >= 100000) await unlock(userId, MASTER_ACHIEVEMENTS[18]);

  // Campaigns & Mastery
  if (completedGoalsCount >= 1) await unlock(userId, MASTER_ACHIEVEMENTS[19]);
  if (completedGoalsCount >= 5) await unlock(userId, MASTER_ACHIEVEMENTS[20]);
  if (completedGoalsCount >= 10) await unlock(userId, MASTER_ACHIEVEMENTS[21]);

  const strengthLvl = character.attributes?.Strength?.level || 1;
  const enduranceLvl = character.attributes?.Endurance?.level || 1;
  if (strengthLvl >= 10 || enduranceLvl >= 10) await unlock(userId, MASTER_ACHIEVEMENTS[22]);

  const knowledgeLvl = character.attributes?.Knowledge?.level || 1;
  const focusLvl = character.attributes?.Focus?.level || 1;
  if (knowledgeLvl >= 10 || focusLvl >= 10) await unlock(userId, MASTER_ACHIEVEMENTS[23]);

  if (questCount >= 10) await unlock(userId, MASTER_ACHIEVEMENTS[24]);

  // Secret 1: Night Owl (Between 12 AM and 4 AM)
  if (currentHour >= 0 && currentHour < 4) {
    await unlock(userId, MASTER_ACHIEVEMENTS[25]);
  }

  // Secret 2: Overkill (500+ XP in 1 day)
  const todayEntry = await DailyEntry.findOne({ user: userId }).sort({ createdAt: -1 });
  if (todayEntry && todayEntry.totalXP >= 500) {
    await unlock(userId, MASTER_ACHIEVEMENTS[26]);
  }

  // Secret 3: Perfectionist (100% daily completion)
  if (todayEntry && todayEntry.completionPercentage === 100 && todayEntry.totalQuests > 0) {
    await unlock(userId, MASTER_ACHIEVEMENTS[27]);
  }

  // Secret 4: Jack of All Trades (5 sub-quest skills)
  const skillsCount = Object.keys(character.skills || {}).length;
  if (skillsCount >= 5) {
    await unlock(userId, MASTER_ACHIEVEMENTS[28]);
  }

  // Secret 5: Relentless (5 quests completed today)
  if (todayEntry && todayEntry.completedQuests >= 5) {
    await unlock(userId, MASTER_ACHIEVEMENTS[29]);
  }
}

module.exports = {
  checkAchievements,
  MASTER_ACHIEVEMENTS,
};