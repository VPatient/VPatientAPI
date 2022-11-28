const router = require("express").Router();
const {auth,verifyTokenAndAdmin,verifyTokenAndAuthorization} = require('../auth/verifyToken');
const { queryValidation, idValidation } = require('../../common/validation');
const ScenarioModel = require('../../models/ScenarioModel');
const PatientModel = require('../../models/PatientModel');

// get scenario(s) based on patientId
router.get("/get", auth, async (req, res) => {
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
router.put("/:id", auth, async (req, res) => {
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
router.delete("/:id", auth, async (req, res) => {
    ScenarioModel.findByIdAndRemove(req.params.id)
        .then(screnario => res.json(`Successfully deleted: ${screnario}`))
        .catch(err => res.json({ message: err }))
});

// GET SCENARIO STATS
router.get("/stats", async(req,res)=>{
    const date = new Date();
    const lastYear = new Date(date.setFullYear(date.getFullYear()-1));
    try{

        
        // total scenarios created by months
        // returns the last 1 year scenario data
        const data = await ScenarioModel.aggregate([
            {
                $match : {
                    createdAt: {$gte: lastYear}
                }
            },
            {
                $project: {
                    month: {$month: "$createdAt"}
                },
            },
            {
                $group: {
                    _id: "$month",
                    total: {$sum: 1},
                }
            }

        ]);
        res.status(200).json(data);

    }
    catch (err){
        res.status(500).json(err);
    }
});

module.exports = router;