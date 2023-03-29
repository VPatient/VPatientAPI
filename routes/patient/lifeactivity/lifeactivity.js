const router = require("express").Router();
const { auth } = require("../../auth/verifyToken");
const { verifyPatient } = require('../verifyPatient');
const LifeActivityFormModel = require('../../../models/LifeActivityFormModel');
const LifeActivityQuestionModel = require('../../../models/LifeActivityQuestionModel');
const LifeActivityRecordModel = require('../../../models/LifeActivityRecordModel');
const FormRoute = require("./Form/form");
const QuestionRoute = require("./Question/question");
const RecordRoute = require("./Record/record");

// get all forms with questions and records for patient
router.get("", auth, verifyPatient, async(req, res) => {
    // get patient
    let patient = req.patient;

    // get records with given patient id
    const records = await LifeActivityRecordModel.find({ patient: patient._id });

    console.log(records);

    // get questions with records
    const questions = await LifeActivityQuestionModel.find({ _id: { $in: records.map(record => record.question) } });

    console.log(questions);

    // get forms with questions
    const forms = await LifeActivityFormModel.find({ _id: { $in: questions.map(question => question.form) } });

    console.log(forms);

    const formattedData = forms.map(form => {
        return {
            "form_title": form.name,
            "form_sequence": form.sequence,
            "data": questions.filter(question => question.form.toString() === form._id.toString()).map(question => {
                return {
                    "question_id": question._id,
                    "fields": question.fields,
                    "correct_answer": records.find(record => record.question.toString() === question._id.toString()).correct_answer,
                    "title": question.title,
                    "description": "",
                    "type": question.type,
                    "remark": question.remark,
                    "is_mandatory": question.is_mandatory,
                    "show_answer": question.show_answer
                }
            })
        }
    });

    res.json(formattedData);
});

router.use("/form", FormRoute); // /patient/lifeActivity/diagnosisForm
router.use("/record", RecordRoute); // /patient/lifeActivity/diagnosisRecord
router.use("/question", QuestionRoute); // /patient/lifeActivity/diagnosis

module.exports = router;