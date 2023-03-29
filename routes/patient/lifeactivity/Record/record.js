const router = require("express").Router();
const { verifyTokenAndAuthorization } = require('../../../auth/verifyToken');
const { verifyPatient } = require('../../verifyPatient');
const LifeActivityRecordModel = require('../../../../models/LifeActivityRecordModel');
const { verifyQuestionByTitle } = require("../verify");


// get all life activity record populated with patient and question
router.get("/get", verifyTokenAndAuthorization, async(req, res) => {
    LifeActivityRecordModel
        .find()
        .populate("patient")
        .populate("question")
        .then(record => res.json(record))
        .catch(err => res.json({ message: err }));
});

// create life activity record by question title
router.post("/create", verifyTokenAndAuthorization, verifyPatient, verifyQuestionByTitle, async(req, res) => {
    // get patient
    let patient = req.patient;

    // get question
    let question = req.question;

    // check if correct answer is in the fields
    if (!question.fields.includes(req.body.correct_answer)) return res.status(400).json({ message: "Correct answer is not in the fields" });

    // create life activity record
    const record = new LifeActivityRecordModel({
        patient: patient._id,
        question: question._id,
        correct_answer: req.body.correct_answer
    });

    // check if there is a record with this pair
    const checkRecord = await LifeActivityRecordModel.findOne({ patient: patient._id, question: question._id });

    // check if record exists
    if (checkRecord) return res.status(400).json({ message: "Record already exists" });

    // save
    record
        .save()
        .then(record => res.json(record))
        .catch(err => res.json({ message: err }));
});

// update life activity record by question title and patient id
router.post("/update", verifyTokenAndAuthorization, verifyPatient, verifyQuestionByTitle, async(req, res) => {
    // get patient
    let patient = req.patient;

    // get question
    let question = req.question;

    // get record
    const record = await LifeActivityRecordModel.findOne({ patient: patient._id, question: question._id });

    // check if record exists
    if (!record) return res.status(400).json({ message: "Record does not exist" });

    // update record
    record.correct_answer = req.body.answer;

    // save
    record
        .save()
        .then(record => res.json(record))
        .catch(err => res.json({ message: err }));
});

// delete life activity record by question title and patient id
router.post("/delete", verifyTokenAndAuthorization, verifyPatient, verifyQuestionByTitle, async(req, res) => {
    // get patient
    let patient = req.patient;

    // get question
    let question = req.question;

    // get record
    const record = await LifeActivityRecordModel.findOne({ patient: patient._id, question: question._id });

    // check if record exists
    if (!record) return res.status(400).json({ message: "Record does not exist" });

    // delete record
    LifeActivityRecordModel.findByIdAndDelete(record._id)
        .then(() => res.json({ message: "Deleted" }))
        .catch(err => res.json({ message: err }));
});

module.exports = router;