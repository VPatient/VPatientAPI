const router = require("express").Router();
const { auth, verifyTokenAndAdmin, verifyTokenAndAuthorization } = require('../../auth/verifyToken');
const { queryValidation, idValidation } = require('../../../common/validation');
const PatientModel = require('../../../models/PatientModel');
const BloodSugarTraceModel = require('../../../models/BloodSugarTraceModel');

// create patient blood sugar trace
router.post("/create", verifyTokenAndAdmin, async (req, res) => {
    // get patient id
    let patientId = req.body.patientId;

    // validation
    const { error } = idValidation(patientId);
    if (error) return res.status(400)
        .send(error.details[0].message);

    // get patient
    const patient = await PatientModel.findOne({ _id: patientId });

    // return if there is not such that patient
    if (!patient) res.status(500).json(`Cannot find patient with id ${patientId}`);

    // results array
    var traces = [];

    // control models
    if (!req.body.bloodSugarTrace) res.status(500);

    // fill results
    req.body.bloodSugarTrace.forEach(trace => {
        var bloodSugar = new BloodSugarTraceModel({
            time: trace.time,
            result: trace.result,
            note: trace.note,
            owner: patientId
        });

        traces.push(bloodSugar);
    });

    // insert all
    BloodSugarTraceModel.insertMany(traces)
        .then(traces => res.json(traces))
        .catch(err => res.json({ message: err }));
});

// get patient laboratory results
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
    const traces = await BloodSugarTraceModel.find({ owner: patientId });

    // return
    res.status(200).json(traces);
});

module.exports = router;