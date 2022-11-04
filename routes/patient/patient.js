const router = require("express").Router();
const PatientModel = require('../../models/PatientModel');
const verify = require('../auth/verifyToken');

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
    // get id
    var patientId = req.query.id;

    if (!patientId) res.status(400);

    // get patient
    const patient = await PatientModel.findOne({ _id: patientId });

    // return patient
    res.status(200).json(patient);
});

module.exports = router;