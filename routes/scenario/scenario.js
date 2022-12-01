const router = require("express").Router();
const { auth, verifyTokenAndAdmin } = require('../auth/verifyToken');
const { queryValidation, idValidation } = require('../../common/validation');
const { verifyPatient } = require('../patient/verifyPatient');
const ScenarioModel = require('../../models/ScenarioModel');
const PatientModel = require('../../models/PatientModel');

// get scenario(s) based on patientId
router.get("/get", auth, verifyPatient, async (req, res) => {
    // get patient
    let patient = req.patient;

    // get all scenarios
    const scenarios = await ScenarioModel.find({ patient: patient });

    // return scenarios
    res.status(200).json(scenarios);
});

// create scenario(s)
router.post("/create", verifyTokenAndAdmin, verifyPatient, async (req, res) => {
    // get patient
    let patient = req.patient;

    // declare scenarios
    var scenarios = [];

    // control models
    if (!req.body.scenarios) return res.status(500).json('Invalid format');

    // fill scenarios
    req.body.scenarios.forEach(scenario => {
        var scenarioModel = new ScenarioModel({
            patient: patient._id,
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
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
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
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
    ScenarioModel.findByIdAndRemove(req.params.id)
        .then(screnario => res.json(`Successfully deleted: ${screnario}`))
        .catch(err => res.json({ message: err }));
});

// GET SCENARIO STATS
router.get("/stats", auth, async (req, res) => {
    const date = new Date();
    const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));
    try {
        // total scenarios created by months
        // returns the last 1 year scenario data
        const data = await ScenarioModel.aggregate([
            {
                $match: {
                    createdAt: { $gte: lastYear }
                }
            },
            {
                $project: {
                    month: { $month: "$createdAt" }
                },
            },
            {
                $group: {
                    _id: "$month",
                    total: { $sum: 1 },
                }
            }

        ]);
        res.status(200).json(data);

    }
    catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;