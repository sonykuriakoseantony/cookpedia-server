const feedbacks = require('../model/feedbackModel')

// add a feedback
exports.addFeedbackController = async (req, res) => {
    console.log("Inside addFeedbackController");
    const { name, email, message } = req.body;
    try {
        const newFeedback = await feedbacks.create({
             name, email, message
        });
        res.status(200).json(newFeedback);
    } catch (err) {
        res.status(500).json(err);
        console.log(err);
    }
}

// get all feedbacks
exports.getAllFeedbacksController = async (req, res) => {
    console.log("--------Inside getAllFeedbacksController--------");
    try{
        const allFeedbacks = await feedbacks.find();
        res.status(200).json(allFeedbacks);
    }catch(err){
        res.status(500).json(err);
        console.log(err);
    }
}