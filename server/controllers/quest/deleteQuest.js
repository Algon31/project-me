const Quest = require("../../models/Quest");

const deleteQuest = async (req, res) => {
    try {

        const quest = await Quest.findOneAndUpdate(
            {
                _id: req.params.id,
                user: req.user.id,
            },
            {
                active: false,
            },
            {
                new: true,
            }
        );

        if (!quest) {
            return res.status(404).json({
                message: "Quest not found.",
            });
        }

        res.json({
            message: "Quest deleted successfully.",
            quest,
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Server Error",
        });

    }
};

module.exports = deleteQuest;