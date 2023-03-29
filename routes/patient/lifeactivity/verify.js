const LifeActivityFormModel = require('../../../models/LifeActivityFormModel');
const LifeActivityQuestionModel = require('../../../models/LifeActivityQuestionModel');

// verify life activity form by sequence
const verifyFormBySequence = async(req, res, next) => {
    // get form sequence
    const formSequence = parseInt(req.body.sequence, 10);

    // if form sequence is not provided
    if (!formSequence) {
        // return error
        return res.status(400).json({ message: "Form sequence is required" });
    }

    // get form by sequence
    var form = await LifeActivityFormModel.findOne({ sequence: formSequence });

    // check if form exists
    if (!form) {
        // return error
        return res.status(400).json({ message: "Form does not exist" });
    }

    // if form exists add form to request
    req.form = form;

    // proceed to route
    next();
}

// verify life activity question middleware
const verifyQuestionByTitle = async(req, res, next) => {
    // get question name
    const questionTitle = req.body.title;

    // get question by name
    var question = await LifeActivityQuestionModel.findOne({ title: questionTitle });

    // check if form exists
    if (!question) {
        // return error
        return res.status(400).json({ message: "Question does not exist" });
    }

    // if form exists add form to request
    req.question = question;

    // proceed to route
    next();
}

module.exports = { verifyFormBySequence, verifyQuestionByTitle };