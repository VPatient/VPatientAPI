const router = require("express").Router();
const { auth, verifyTokenAndAdmin } = require('../auth/verifyToken');
const LifeActivityDiagnosisModel = require('../../models/LifeActivityDiagnosisModel');

// get all life activity diagnosis
router.get("/get", auth, verifyTokenAndAdmin, async(req, res) => {
    LifeActivityDiagnosisModel
        .find()
        .then(diagnosis => res.json(diagnosis))
        .catch(err => res.json({ message: err }));
});

// get specific life activity diagnosis by objectId
router.get("/getByObjectId", auth, verifyTokenAndAdmin, async(req, res) => {
    let diagnosisId = req.body.diagnosisId;

    LifeActivityDiagnosisModel
        .find({ _id: diagnosisId })
        .then(diagnosis => res.json(diagnosis))
        .catch(err => res.json({ message: err }));
});

// create life activity diagnosis
router.post("/create", auth, verifyTokenAndAdmin, async(req, res) => {
    const diagnosisModel = new LifeActivityDiagnosisModel({
        name: req.body.name,
        sequence: req.body.sequence
    });

    diagnosisModel
        .save()
        .then(diagnosis => res.json(diagnosis))
        .catch(err => res.json({ message: err }));
});

// update life activity diagnosis
router.put("/update", auth, verifyTokenAndAdmin, async(req, res) => {
    let diagnosisId = req.body.diagnosisId;

    LifeActivityDiagnosisModel
        .updateOne({ _id: diagnosisId }, {
            name: req.body.name,
            sequence: req.body.sequence
        })
        .then(diagnosis => res.json(diagnosis))
        .catch(err => res.json({ message: err }));
});

// delete life activity diagnosis
router.delete("/delete", auth, verifyTokenAndAdmin, async(req, res) => {
    let diagnosisId = req.body.diagnosisId;

    LifeActivityDiagnosisModel
        .deleteOne({ _id: diagnosisId })
        .then(diagnosis => res.json(diagnosis))
        .catch(err => res.json({ message: err }));
});

module.exports = router;