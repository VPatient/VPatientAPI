const router = require("express").Router();
const ScenarioModel = require('../../models/ScenarioModel');
const verify = require('../auth/verifyToken');


router.get("/get:id", verify, async (req, res) => {
    // get id
    let patientId = req.params.id;

    // get all scenarios
    const scenarios = await ScenarioModel.find({ patient: patientId });

    // return scenarios
    res.status(200).json(scenarios);
});

router.post("/create", verify, async (req, res) => {
    // get patient id
    let patientId = req.body.patientId;

    // declare scenarios
    var scenarios = [];

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

    scenarios.create()
        .then(scenario => res.json(scenario))
        .catch(err => res.json({ message: err }));
});

router.post("/", verify, async (req, res) => {

    const scenario = new ScenarioModel({
        patient: req.body.patient,
        sequence: req.body.sequence,
        text: req.body.text,
        reply: req.body.reply,
        action: req.body.action
    });

    scenario.save()
        .then(scenario => res.json(scenario))
        .catch(err => res.json({ message: err }));
});

router.put("/:id", verify, async (req, res) => {
    try {
        const updatedScenario = await ScenarioModel.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, { new: true });

        res.status(200).json(updatedScenario);

    } catch (err) {
        res.status(500).json(err);
    }
});

router.delete("/:id", verify, async (req, res) => {
    ScenarioModel.findByIdAndRemove(req.params.id)
        .then(screnario => res.json(`Successfully deleted: ${screnario}`))
        .catch(err => res.json({ message: err }))
});


module.exports = router;