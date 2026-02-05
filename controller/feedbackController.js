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

// get approved feedbacks
exports.getApprovedFeedbacksController = async (req, res) => {
    console.log("--------Inside getApprovedFeedbacksController--------");
    try{
        const approvedFeedbacks = await feedbacks.find({status : {$eq : 'approve'}});
        res.status(200).json(approvedFeedbacks);
    }catch(err){
        res.status(500).json(err);
        console.log(err);
    }
}

//update feedback status
exports.updateFeedbackController = async (req, res) => {
    console.log("Inside updateFeedbackController");

    console.log(req.body);
    
    const { id } = req.params;
    const { status } = req.body;
    try {
        const updateFeedback = await feedbacks.findById({_id : id});
        updateFeedback.status = status;
        await updateFeedback.save();
        res.status(200).json(updateFeedback);
    } catch (err) {
        res.status(500).json(err);
        console.log(err);
    }
}