const router = require("express").Router();
const { verifyTokenAndAdmin } = require('../../../auth/verifyToken');
const LifeActivityQuestionModel = require('../../../../models/LifeActivityQuestionModel');
const { verifyFormBySequence, verifyQuestionByTitle } = require("../verify");

// create life activity question model by form sequence
router.post("/create", verifyTokenAndAdmin, verifyFormBySequence, async(req, res) => {
    // get form
    let form = req.form;

    // create life activity question model
    const questionModel = new LifeActivityQuestionModel({
        form: form._id,
        title: req.body.title,
        fields: req.body.fields,
        remark: req.body.remark ? req.body.remark : false,
        type: req.body.type ? req.body.type : "dropdown",
        is_mandatory: req.body.is_mandatory ? req.body.is_mandatory : false,
        show_answer: req.body.show_answer ? req.body.show_answer : false
    });

    // save
    questionModel
        .save()
        .then(questionModel => res.json(questionModel))
        .catch(err => res.json({ message: err }));
});

// update life activity question model by question title
router.post("/update", verifyTokenAndAdmin, verifyQuestionByTitle, async(req, res) => {
    // get question
    let question = req.question;

    // update question
    question.title = req.body.title;
    question.fields = req.body.fields;
    question.remark = req.body.remark ? req.body.remark : false;
    question.type = req.body.type ? req.body.type : "dropdown";
    question.is_mandatory = req.body.is_mandatory ? req.body.is_mandatory : false;
    question.show_answer = req.body.show_answer ? req.body.show_answer : false;

    // save
    question
        .save()
        .then(question => res.json(question))
        .catch(err => res.json({ message: err }));
});

// delete life activity question model by question title
router.post("/delete", verifyTokenAndAdmin, verifyQuestionByTitle, async(req, res) => {
    // get question
    let question = req.question;

    // delete question
    LifeActivityQuestionModel.findByIdAndDelete(question._id)
        .then(() => res.json({ message: "Deleted" }))
        .catch(err => res.json({ message: err }));
});

// get all life activity question model populated with forms
router.get("/get", verifyTokenAndAdmin, async(req, res) => {
    LifeActivityQuestionModel
        .find()
        .populate("form")
        .then(questions => res.json(questions))
        .catch(err => res.json({ message: err }));
});


module.exports = router;