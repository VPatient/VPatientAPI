const router = require("express").Router();
const { auth, verifyTokenAndAdmin, verifyTokenAndAuthorization } = require('../../routes/auth/verifyToken');
const { gradeValidation, queryValidation, gradeQueryValidation } = require('../../common/validation');
const PatientModel = require('../../models/PatientModel');
const GradeModel = require('../../models/GradeModel');
const UserModel = require('../../models/UserModel');

// create grade model
router.post("/create", auth, async (req, res) => {
    // get patient id
    let patientId = req.body.patientId;

    // validation
    const { error } = gradeValidation(req.body);
    if (error) return res.status(400)
        .send(error.details[0].message);

    // get patient
    const patient = await PatientModel.findOne({ _id: patientId });

    // return if there is not such that patient
    if (!patient) res.status(500).json(`Cannot find patient with id ${patientId}`);

    // get secret
    let secret = req.body.secret;

    // control secret
    if (process.env.GRADE_SECRET !== secret) res.status(500).json('Invalid parameters');

    // get user
    const user = await UserModel.findOne({ _id: req.user._id });

    // control if there is one grade given paired with user and patient
    const existingModel = await GradeModel.findOne({
        user: user,
        patient: patient
    });

    // if there is one existing model then inform user
    if (existingModel) res.status(500).send('User is already graded from this patient');

    // get grade
    let grade = req.body.grade;

    // if not then create a patient grade model
    const gradeModel = new GradeModel({
        user: user,
        patient: patient,
        grade: grade
    });

    // save grade model
    gradeModel.save()
        .then(grade => res.json(grade))
        .catch(err => res.json({ message: err }));
});

// list grades of patient by id
router.get("/list", auth, async (req, res) => {
    // validation
    const { error } = queryValidation(req.query);

    if (error) return res.status(400)
        .send(error.details[0].message);

    // get id
    let patientId = req.query.id;

    // get patient
    const patient = await PatientModel.findOne({ _id: patientId });

    // return if there is not such that patient
    if (!patient) res.status(500).json(`Cannot find patient with id ${patientId}`);

    const gradeModel = await GradeModel.find({ patient: patient });

    // return grade model
    res.status(200).json(gradeModel);
});

// get request of patient by id
router.get("/get", auth, async (req, res) => {
    // query validation
    const { error } = gradeQueryValidation(req.query);

    if (error) return res.status(400)
        .send(error.details[0].message);

    // get patient id
    let patientId = req.query.id;

    // get user id
    let userId = req.query.userId;

    // get patient
    const patient = await PatientModel.findOne({ _id: patientId });

    // return if there is not such that patient
    if (!patient) res.status(500).json(`Cannot find patient with id ${patientId}`);

    // get user
    const user = await UserModel.findOne({ _id: userId });

    // return if there is not such that patient
    if (!user) res.status(500).json(`Cannot find user with id ${userId}`);

    const gradeModel = await GradeModel.findOne({ patient: patient, user: user });

    // return grade model
    res.status(200).json(gradeModel);
});

module.exports = router;