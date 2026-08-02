const LongTermGoal = require("../../models/LongTermGoal");
const Character = require("../../models/Character");
const Notification = require("../../models/Notification");
const { xpRequired, calculateRank } = require("../../utils/levelSystem");

const updateGoal = async (req, res) => {
  try {
    const existingGoal = await LongTermGoal.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!existingGoal) {
      return res.status(404).json({ message: "Main Quest not found" });
    }

    const wasCompleted = existingGoal.completed;
    
    // Update goal fields
    const updatedGoal = await LongTermGoal.findOneAndUpdate(
      {
        _id: req.params.id,
        user: req.user.id,
      },
      {
        ...req.body,
        completedAt: req.body.completed && !wasCompleted ? new Date() : existingGoal.completedAt,
      },
      {
        new: true,
      }
    );

    // If goal just got completed, award Boss XP & Gold
    let xpEarned = 0;
    let levelUp = false;

    if (!wasCompleted && updatedGoal.completed) {
      xpEarned = updatedGoal.xpReward || 500;
      const character = await Character.findOne({ user: req.user.id });

      if (character) {
        character.totalXp += xpEarned;
        character.xp += xpEarned;

        while (character.xp >= xpRequired(character.level)) {
          character.xp -= xpRequired(character.level);
          character.level++;
          levelUp = true;

          await Notification.create({
            user: req.user.id,
            title: "Level Up!",
            message: `Reached Level ${character.level} from Main Quest Victory!`,
            type: "level",
          });
        }

        character.rank = calculateRank(character.level);
        await character.save();

        await Notification.create({
          user: req.user.id,
          title: "Main Quest Completed! 🏆",
          message: `Finished "${updatedGoal.title}". Earned +${xpEarned} Boss XP!`,
          type: "achievement",
        });
      }
    }

    res.json({
      goal: updatedGoal,
      xpEarned,
      levelUp,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update Main Quest" });
  }
};

module.exports = updateGoal;