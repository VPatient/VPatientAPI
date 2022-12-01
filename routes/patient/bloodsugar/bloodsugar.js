const router = require("express").Router();
const { auth, verifyTokenAndAdmin, verifyTokenAndAuthorization } = require('../../auth/verifyToken');
const { queryValidation, idValidation } = require('../../../common/validation');
const { verifyPatient } = require('../verifyPatient');
const PatientModel = require('../../../models/PatientModel');
const BloodSugarTraceModel = require('../../../models/BloodSugarTraceModel');

// create patient blood sugar trace
router.post("/create", verifyTokenAndAdmin, verifyPatient, async (req, res) => {
    // get patient
    let patient = req.patient;

    // results array
    var traces = [];

    // control models
    if (!req.body.bloodSugarTrace) return res.status(500).json('Invalid format');

    // fill results
    req.body.bloodSugarTrace.forEach(trace => {
        var bloodSugar = new BloodSugarTraceModel({
            time: trace.time,
            result: trace.result,
            note: trace.note,
            owner: patient._id
        });

        traces.push(bloodSugar);
    });

    // insert all
    BloodSugarTraceModel.insertMany(traces)
        .then(traces => res.status(200).json(traces))
        .catch(err => res.status(500).json({ message: err }));
});

// get patient laboratory results
router.get("/get", auth, verifyPatient, async (req, res) => {
    // get patient
    let patient = req.patient;

    // get results
    const traces = await BloodSugarTraceModel.find({ owner: patient });

    // return
    res.status(200).json(traces);
});

module.exports = router;