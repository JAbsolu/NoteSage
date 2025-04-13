const Quiz = require("../../models/Quiz");
const User = require("../../models/User");


const getUserQuizzes = async (req, res) => {
    const { id } = req.query;

    try {
        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({ message: `user ${id} not found, unable to find user quizzes`, data: [] });
        }

        const userQuizzes = await Quiz.find({ userId: id });

        if (!userQuizzes) {
            res.status(404).json({ message: `no quizzes found for user ${user.firstName}`, data: [] });
        }

        res.status(200).json({ message: `user quizzes fetched`, data: userQuizzes});
    } catch(error) {
        res.status.json({ message: error.message })
    }
}

module.exports = getUserQuizzes;
