const router = require("express").Router();
const { auth, verifyTokenAndAdmin, verifyTokenAndAuthorization } = require('../../auth/verifyToken');
const { queryValidation, idValidation } = require('../../../common/validation');
const { verifyPatient } = require('../verifyPatient');
const PatientModel = require('../../../models/PatientModel');
const PatientDiagnosisModel = require('../../../models/PatientDiagnosisModel');

// create patient diagnosis
router.post("/create", verifyTokenAndAdmin, verifyPatient, async (req, res) => {
    // get patient
    let patient = req.patient;

    // create model
    var patientDiagnosis = new PatientDiagnosisModel({
        name: req.body.name,
        true: req.body.true,
        owner: patient._id
    });

    // insert
    PatientDiagnosisModel.create(patientDiagnosis)
        .then(diagnosis => res.status(200).json(diagnosis))
        .catch(err => res.status(500).json({ message: err }));
});

// get patient diagnosis
router.get("/get", auth, verifyPatient, async (req, res) => {
    // get patient
    let patient = req.patient;

    // get results
    const diagnosis = await PatientDiagnosisModel.find({ owner: patient });

    // return
    res.status(200).json(diagnosis);
});

module.exports = router;