const router = require("express").Router();
const { auth, verifyTokenAndAdmin, verifyTokenAndAuthorization } = require('../../auth/verifyToken');
const { queryValidation, idValidation } = require('../../../common/validation');
const { verifyPatient } = require('../verifyPatient');
const PatientModel = require('../../../models/PatientModel');
const VitalSignModel = require('../../../models/VitalSignModel');

// create patient vital signs
router.post("/create", verifyTokenAndAdmin, verifyPatient, async (req, res) => {
    // get patient
    let patient = req.patient;

    // create model
    var vitalSign = new VitalSignModel({
        date: req.body.date,
        bloodPressure: req.body.bloodPressure,
        pulseOverMinute: req.body.pulseOverMinute,
        breathOverMinute: req.body.breathOverMinute,
        bodyTemperature: req.body.bodyTemperature,
        owner: patient._id
    });

    // insert
    VitalSignModel.create(vitalSign)
        .then(vitalSign => res.status(200).json(vitalSign))
        .catch(err => res.status(500).json({ message: err }));
});

// get patient medicines
router.get("/get", auth, verifyPatient, async (req, res) => {
    // get patient
    let patient = req.patient;

    // get results
    const traces = await VitalSignModel.find({ owner: patient._id });

    // return
    res.status(200).json(traces);
});

module.exports = router;