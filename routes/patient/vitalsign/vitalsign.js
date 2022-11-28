const router = require("express").Router();
const {auth,verifyTokenAndAdmin,verifyTokenAndAuthorization} = require('../../auth/verifyToken');
const { queryValidation, idValidation } = require('../../../common/validation');
const PatientModel = require('../../../models/PatientModel');
const VitalSignModel = require('../../../models/VitalSignModel');

// create patient vital signs
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
    var vitalSign = new VitalSignModel({
        date: req.body.date,
        bloodPressure: req.body.bloodPressure,
        pulseOverMinute: req.body.pulseOverMinute,
        breathOverMinute: req.body.breathOverMinute,
        bodyTemperature: req.body.bodyTemperature,
        owner: patientId
    });

    // insert
    VitalSignModel.create(vitalSign)
        .then(vitalSign => res.json(vitalSign))
        .catch(err => res.json({ message: err }));
});

// get patient medicines
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
    const traces = await VitalSignModel.find({ owner: patientId });

    // return
    res.status(200).json(traces);
});

module.exports = router;