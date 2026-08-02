const Achievement = require("../../models/Achievement");
const { MASTER_ACHIEVEMENTS, checkAchievements } = require("../../services/achievementEngine");

const getAchievements = async (req, res) => {
  try {
    await checkAchievements(req.user.id);

    const userUnlocked = await Achievement.find({
      user: req.user.id,
      unlocked: true,
    });

    const unlockedMap = new Map();
    userUnlocked.forEach((item) => {
      unlockedMap.set(item.key, item);
    });

    let secretIndex = 1;

    // Merge master achievements with user status
    const allAchievements = MASTER_ACHIEVEMENTS.map((master) => {
      const found = unlockedMap.get(master.key);
      const isSecret = master.isSecret || false;
      const isUnlocked = Boolean(found && found.unlocked);

      let title = master.title;
      let description = master.description;
      let icon = master.icon;

      if (isSecret && !isUnlocked) {
        title = `Hidden Secret #${secretIndex}`;
        description = "This secret achievement is shrouded in mystery. Complete hidden actions to discover and unlock!";
        icon = "🔒";
        secretIndex++;
      } else if (isSecret && isUnlocked) {
        secretIndex++;
      }

      return {
        _id: found?._id || master.key,
        key: master.key,
        title,
        description,
        icon,
        category: master.category,
        isSecret,
        requirement: isSecret && !isUnlocked ? "Secret Requirement" : master.requirement,
        unlocked: isUnlocked,
        unlockedAt: found ? found.unlockedAt : null,
      };
    });

    res.json(allAchievements);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to load achievements" });
  }
};

module.exports = getAchievements;