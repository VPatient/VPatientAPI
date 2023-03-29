const router = require("express").Router();
const { auth, verifyTokenAndAdmin } = require('../auth/verifyToken');
const LifeActivitySectionModel = require('../../models/LifeActivitySectionModel');
const LifeActivityDiagnosisModel = require('../../models/LifeActivityDiagnosisModel');


// get all life activity section
router.get("/get", auth, verifyTokenAndAdmin, async(req, res) => {
    LifeActivitySectionModel
        .find()
        .then(section => res.json(section))
        .catch(err => res.json({ message: err }));
});

// get specific life activity section
router.get("/getById", auth, verifyTokenAndAdmin, async(req, res) => {
    let sectionDiagnosisId = req.body.sectionDiagnosisId;

    LifeActivitySectionModel
        .find({ _id: sectionDiagnosisId })
        .then(section => res.json(section))
        .catch(err => res.json({ message: err }));
});

// get specific life activity section by section id
router.get("/getBySectionId", auth, verifyTokenAndAdmin, async(req, res) => {
    let sectionId = req.body.sectionId;
    LifeActivitySectionModel
        .find({ section: sectionId })
        .then(section => res.json(section))
        .catch(err => res.json({ message: err }));
});

// create life activity section
router.post("/create", auth, verifyTokenAndAdmin, async(req, res) => {
    // get section name
    let name = req.body.sectionName;

    // get life activity diagnosis by name
    let diagnosis = LifeActivityDiagnosisModel.findOne({ name: name });

    // check if section exists
    if (!diagnosis) {
        return res.status(404).json({ message: "Diagnosis does not exist" });
    }

    // create section model
    const sectionModel = new LifeActivitySectionModel({
        section: diagnosis._id,
        value: req.body.value,
    });

    sectionModel
        .save()
        .then(section => res.json(section))
        .catch(err => res.json({ message: err }));
});

// update life activity section
router.put("/update", auth, verifyTokenAndAdmin, async(req, res) => {
    let sectionDiagnosisId = req.body.sectionDiagnosisId;

    LifeActivitySectionModel
        .updateOne({ _id: sectionDiagnosisId }, {
            section: req.body.section,
            value: req.body.value
        })
        .then(section => res.json(section))
        .catch(err => res.json({ message: err }));
});

// delete life activity section
router.delete("/delete", auth, verifyTokenAndAdmin, async(req, res) => {
    let sectionDiagnosisId = req.body.sectionDiagnosisId;

    LifeActivitySectionModel
        .deleteOne({ _id: sectionDiagnosisId })
        .then(section => res.json(section))
        .catch(err => res.json({ message: err }));
});

module.exports = router;