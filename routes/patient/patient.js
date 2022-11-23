const router = require("express").Router();
const verify = require('../auth/verifyToken');
const { queryValidation, idValidation } = require('../../common/validation');
const PatientModel = require('../../models/PatientModel');
const bloodSugarRoute = require('./bloodsugar/bloodsugar');
const diagnosisRoute = require('./diagnosis/diagnosis');
const fallRiskRoute = require('./fallrisk/fallrisk');
const laboratoryRoute = require('./laboratory/laboratory');
const medicineRoute = require('./medicine/medicine');
const nortonPressureUlcerRoute = require('./nortonpressureulcer/nortonpressureulcer');
const vitalSignRoute = require('./vitalsign/vitalsign');

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

// post request of patient by id
router.post("/get", verify, async (req, res) => {
    // validation
    const { error } = idValidation(req.body.patientId);

    if (error) return res.status(400)
        .send(error.details[0].message);

    // get id
    let patientId = req.body.patientId;

    // get patient
    const patient = await PatientModel.findOne({ _id: patientId });

    // return patient
    res.status(200).json(patient);
});

// split up route handling to handle subroutes
router.use("/bloodsugar", bloodSugarRoute); // use patient endpoints if url starts with /patient
router.use("/diagnosis", diagnosisRoute); // use patient endpoints if url starts with /patient
router.use("/fallrisk", fallRiskRoute); // use patient endpoints if url starts with /patient
router.use("/laboratory", laboratoryRoute); // use patient endpoints if url starts with /patient
router.use("/medicine", medicineRoute); // use patient endpoints if url starts with /patient
router.use("/nortonpressureulcer", nortonPressureUlcerRoute); // use patient endpoints if url starts with /patient
router.use("/vitalsign", vitalSignRoute); // use patient endpoints if url starts with /patient

module.exports = router;