const router = require("express").Router();
const ScenarioModel = require('../models/ScenarioModel');
const verify = require('../routes/auth/verifyToken');


router.get("/", (req, res) => {
    res.send("TODO- Get scenarios!");
});

router.post("/",verify, async (req, res) => {

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

router.put("/:id", verify,async (req, res) => {
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