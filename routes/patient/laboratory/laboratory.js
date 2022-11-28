const router = require("express").Router();
const {auth,verifyTokenAndAdmin,verifyTokenAndAuthorization} = require('../../auth/verifyToken');
const { queryValidation, idValidation } = require('../../../common/validation');
const PatientModel = require('../../../models/PatientModel');
const LaboratoryResultModel = require('../../../models/LaboratoryResultModel');

// create patient laboratory results
router.post("/create", auth, async (req, res) => {
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
    var results = [];

    // control models
    if (!req.body.laboratoryResults) res.status(500);

    // fill results
    req.body.laboratoryResults.forEach(result => {
        var laboratoryResult = new LaboratoryResultModel({
            parameterName: result.parameterName,
            result: result.result,
            unit: result.unit,
            referanceInterval: result.referanceInterval,
            owner: patientId
        });

        results.push(laboratoryResult);
    });

    // insert all
    LaboratoryResultModel.insertMany(results)
        .then(results => res.json(results))
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
    const results = await LaboratoryResultModel.find({ owner: patientId });

    // return
    res.status(200).json(results);

});

module.exports = router;