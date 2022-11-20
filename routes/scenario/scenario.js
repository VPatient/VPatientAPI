const router = require("express").Router();
const verify = require('../auth/verifyToken');
const { queryValidation, idValidation } = require('../../common/validation');
const ScenarioModel = require('../../models/ScenarioModel');
const PatientModel = require('../../models/PatientModel');

// get scenario(s) based on patientId
router.get("/get", verify, async (req, res) => {
    // validation
    const { error } = queryValidation(req.query);
    if (error) return res.status(400)
        .send(error.details[0].message);

    // get id
    let patientId = req.query.id;

    // get all scenarios
    const scenarios = await ScenarioModel.find({ patient: patientId });

    // return scenarios
    res.status(200).json(scenarios);
});

// create scenario(s)
router.post("/create", verify, async (req, res) => {
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

    // declare scenarios
    var scenarios = [];

    // control models
    if (!req.body.scenarios) res.status(500);

    // fill scenarios
    req.body.scenarios.forEach(scenario => {
        var scenarioModel = new ScenarioModel({
            patient: patientId,
            sequence: scenario.sequence,
            text: scenario.text,
            reply: scenario.reply,
            action: scenario.action
        });

        scenarios.push(scenarioModel);
    });

    // insert all
    ScenarioModel.insertMany(scenarios)
        .then(scenarios => res.json(scenarios))
        .catch(err => res.json({ message: err }));
});

// update scenario
router.put("/:id", verify, async (req, res) => {
    // get patient id
    let scenarioId = req.params.id;

    // validation
    const { error } = idValidation(scenarioId);
    if (error) return res.status(400)
        .send(error.details[0].message);

    try {
        const updatedScenario = await ScenarioModel.findByIdAndUpdate(scenarioId, {
            $set: req.body
        }, { new: true });

        res.status(200).json(updatedScenario);

    } catch (err) {
        res.status(500).json(err);
    }
});

// delete scenario
router.delete("/:id", verify, async (req, res) => {
    ScenarioModel.findByIdAndRemove(req.params.id)
        .then(screnario => res.json(`Successfully deleted: ${screnario}`))
        .catch(err => res.json({ message: err }))
});


module.exports = router;