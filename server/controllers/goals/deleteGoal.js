const LongTermGoal = require("../../models/LongTermGoal");

const deleteGoal = async (req, res) => {
  try {
    const goal = await LongTermGoal.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!goal) {
      return res.status(404).json({ message: "Main Quest not found" });
    }

    res.json({ success: true, message: "Main Quest abandoned" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to delete Main Quest" });
  }
};

module.exports = deleteGoal;
