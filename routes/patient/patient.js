const router = require("express").Router();
const verify = require('../auth/verifyToken');
const { queryValidation, idValidation } = require('../../common/validation');
const PatientModel = require('../../models/PatientModel');
const LaboratoryResultModel = require('../../models/LaboratoryResultModel');
const BloodSugarTraceModel = require('../../models/BloodSugarTraceModel');
const NortonPressureUlcerModel = require('../../models/NortonPressureUlcerModel');
const MedicineModel = require('../../models/MedicineModel');
const VitalSignModel = require('../../models/VitalSignModel');
const FallRiskFormModel = require('../../models/FallRiskFormModel');
const PatientFallRiskModel = require('../../models/PatientFallRiskModel');
const PatientDiagnosisModel = require('../../models/PatientDiagnosisModel');

// create request of patient
router.post("/create", verify, async (req, res) => {

    // create patient model
    var patientModel = new PatientModel({
        name: req.body.name,
        gender: req.body.gender,
        age: req.body.age,
        maritalStatus: req.body.maritalStatus,
        degree: req.body.degree,
        job: req.body.job,
        children: req.body.children,
        insurance: req.body.insurance,
        racialAndReligion: req.body.racialAndReligion,
        companion: req.body.companion,
        bloodType: req.body.bloodType,
        contagiousDisease: req.body.contagiousDisease,
        primaryDiagnosis: req.body.primaryDiagnosis,
        height: req.body.height,
        weight: req.body.weight,
        hospitalizationReason: req.body.hospitalizationReason,
        chronicDisease: req.body.chronicDisease,
        previouslyHospitalized: req.body.previouslyHospitalized,
        allergies: req.body.allergies,
        cigaretteHabit: req.body.cigaretteHabit,
        alcoholHabit: req.body.alcoholHabit,
        substanceAbuse: req.body.substanceAbuse,
        motherCauseofDeath: req.body.motherCauseofDeath,
        dadCauseofDeath: req.body.dadCauseofDeath,
        siblingCauseofDeath: req.body.siblingCauseofDeath,
        closeRelativeCauseofDeath: req.body.closeRelativeCauseofDeath,
        painLocation: req.body.painLocation,
        painIntensity: req.body.painIntensity,
        painType: req.body.painType,
        painQualification: req.body.painQualification
    });

    // 
    patientModel.save()
        .then(patient => res.json(patient))
        .catch(err => res.json({ message: err }));
});

// get list request of patient
router.get("/list", verify, async (req, res) => {

    // get all patients
    const scenarios = await PatientModel.find();

    // return scenarios
    res.status(200).json(scenarios);
});

// get request of patient by id
router.get("/get", verify, async (req, res) => {
    // validation
    const { error } = queryValidation(req.query);
    if (error) return res.status(400)
        .send(error.details[0].message);

    // get id
    let patientId = req.query.id;

    // get patient
    const patient = await PatientModel.findOne({ _id: patientId });

    // return patient
    res.status(200).json(patient);
});

// create patient laboratory results
router.post("/laboratory/create", verify, async (req, res) => {
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
router.get("/laboratory/get", verify, async (req, res) => {
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

// create patient blood sugar trace
router.post("/bloodsugar/create", verify, async (req, res) => {
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
router.get("/bloodsugar/get", verify, async (req, res) => {
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

// create patient norton pressure ulcer
router.post("/nortonpressureulcer/create", verify, async (req, res) => {
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
    var nortonPressureUlcer = new NortonPressureUlcerModel({
        physicalCondition: req.body.physicalCondition,
        mentalCondition: req.body.mentalCondition,
        activityCondition: req.body.activityCondition,
        movementCondition: req.body.movementCondition,
        incontinenceCondition: req.body.incontinenceCondition,
        owner: patientId
    });

    // insert
    NortonPressureUlcerModel.create(nortonPressureUlcer)
        .then(pressureUlcer => res.json(pressureUlcer))
        .catch(err => res.json({ message: err }));
});

// get patient norton pressure ulcer
router.get("/nortonpressureulcer/get", verify, async (req, res) => {
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
    const traces = await NortonPressureUlcerModel.find({ owner: patientId });

    // return
    res.status(200).json(traces);
});

// create patient medicines
router.post("/medicine/create", verify, async (req, res) => {
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
    var medicines = [];

    // control models
    if (!req.body.medicines) res.status(500);

    // fill results
    req.body.medicines.forEach(medicine => {
        var med = new MedicineModel({
            name: medicine.name,
            dose: medicine.dose,
            time: medicine.time,
            reason: medicine.reason,
            duration: medicine.duration,
            owner: patientId
        });

        medicines.push(med);
    });

    // insert all
    MedicineModel.insertMany(medicines)
        .then(medicines => res.json(medicines))
        .catch(err => res.json({ message: err }));
});

// get patient medicines
router.get("/medicine/get", verify, async (req, res) => {
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
    const traces = await MedicineModel.find({ owner: patientId });

    // return
    res.status(200).json(traces);
});

// create patient vital signs
router.post("/vitalsign/create", verify, async (req, res) => {
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
router.get("/vitalsign/get", verify, async (req, res) => {
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

// create fall risk form factor
router.post("/fallrisk/factor/create", verify, async (req, res) => {

    // results array
    var factors = [];

    // control models
    if (!req.body.factors) res.status(500);

    // fill results
    req.body.factors.forEach(factor => {
        var fact = new FallRiskFormModel({
            factor: factor.factor,
            major: factor.major,
            point: factor.point,
            order: factor.order
        });

        factors.push(fact);
    });

    // insert all
    FallRiskFormModel.insertMany(factors)
        .then(factors => res.json(factors))
        .catch(err => res.json({ message: err }));
});

// get fall risk factor form list
router.get("/fallrisk/factor/list", verify, async (req, res) => {

    // get factors
    const factors = await FallRiskFormModel.find();

    // return
    res.status(200).json(factors);
});

// create patient fall risk
router.post("/fallrisk/create", verify, async (req, res) => {
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

    // get order
    let order = req.body.factorOrder;

    // return if there is not such an order
    if (!order) res.status(500).json(`Invalid order ${order}`);

    // get factor
    const factor = await FallRiskFormModel.findOne({ order: order });

    if (!factor) res.status(500).json(`Cannot find any factor with order ${order}`)

    // create model
    var fallRisk = new PatientFallRiskModel({
        owner: patientId,
        fallRisk: factor._id
    });

    // insert
    PatientFallRiskModel.create(fallRisk)
        .then(vitalSign => res.json(vitalSign))
        .catch(err => res.json({ message: err }));
});

// get patient fall risk
router.get("/fallrisk/get", verify, async (req, res) => {
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

    // patient factors
    let fallRisks = [];

    // get patient factors
    const patientFactors = await PatientFallRiskModel.find({ owner: patientId });

    // return if there is no patient factors
    if (!patientFactors) res.status(500).json(`Cannot find any factors related with patient id ${patientId}`);

    // add to patient factors
    patientFactors.forEach(pfact => {
        fallRisks.push(pfact.fallRisk);
    });

    // get related fall risk form factors
    const formFactors = await FallRiskFormModel.find({ _id: {$in: fallRisks} });

    // return
    res.status(200).json(formFactors);
});

// create patient diagnosis
router.post("/diagnosis/create", verify, async (req, res) => {
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
router.get("/diagnosis/get", verify, async (req, res) => {
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