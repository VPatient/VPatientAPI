const router = require("express").Router();
const {auth,verifyTokenAndAdmin,verifyTokenAndAuthorization} = require('../../auth/verifyToken');
const { queryValidation, idValidation } = require('../../../common/validation');
const PatientModel = require('../../../models/PatientModel');
const PatientDiagnosisModel = require('../../../models/PatientDiagnosisModel');

// create patient diagnosis
router.post("/create", auth, async (req, res) => {
    // get patient id
    let patientId = req.body.owner;

    // validation
    const { error } = idValidation(patientId);
    if (error) return res.status(400)
        .send(error.details[0].message);

    // get patient
    const patient = await PatientModel.findOne({ _id: patientId });

    // return if there is not such that patient
    if (!patient) res.status(500).json(`Cannot find patient with id ${patientId}`);

    // create model
    var patientDiagnosis = new PatientDiagnosisModel({
        name: req.body.name,
        true: req.body.true,
        owner: patientId
    });

    // insert
    PatientDiagnosisModel.create(patientDiagnosis)
        .then(diagnosis => res.json(diagnosis))
        .catch(err => res.json({ message: err }));
});

// get patient diagnosis
router.get("/get", auth, async (req, res) => {
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

    // get results
    const diagnosis = await PatientDiagnosisModel.find({ owner: patientId });

    // return
    res.status(200).json(diagnosis);
});

module.exports = router;