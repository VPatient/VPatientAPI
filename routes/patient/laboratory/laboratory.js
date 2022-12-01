const router = require("express").Router();
const { auth, verifyTokenAndAdmin, verifyTokenAndAuthorization } = require('../../auth/verifyToken');
const { queryValidation, idValidation } = require('../../../common/validation');
const { verifyPatient } = require('../verifyPatient');
const PatientModel = require('../../../models/PatientModel');
const LaboratoryResultModel = require('../../../models/LaboratoryResultModel');

// create patient laboratory results
router.post("/create", verifyTokenAndAdmin, verifyPatient, async (req, res) => {
    // get patient
    let patient = req.patient;

    // results array
    var results = [];

    // control models
    if (!req.body.laboratoryResults) return res.status(500).json('Invalid format');

    // fill results
    req.body.laboratoryResults.forEach(result => {
        var laboratoryResult = new LaboratoryResultModel({
            parameterName: result.parameterName,
            result: result.result,
            unit: result.unit,
            referanceInterval: result.referanceInterval,
            owner: patient._id
        });

        results.push(laboratoryResult);
    });

    // insert all
    LaboratoryResultModel.insertMany(results)
        .then(results => res.status(200).json(results))
        .catch(err => res.status(500).json({ message: err }));
});

// get patient laboratory results
router.get("/get", auth, verifyPatient, async (req, res) => {
    // get patient
    let patient = req.patient;

    // get results
    const results = await LaboratoryResultModel.find({ owner: patient });

    // return
    res.status(200).json(results);

});

module.exports = router;