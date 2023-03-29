const router = require("express").Router();
const { auth, verifyTokenAndAdmin } = require('../auth/verifyToken');
const LifeActivityRecordModel = require('../../models/LifeActivityRecordModel');

// get all life activity record
router.get("/get", auth, verifyTokenAndAdmin, async(req, res) => {
    LifeActivityRecordModel
        .find()
        .then(record => res.json(record))
        .catch(err => res.json({ message: err }));
});

// get specific life activity record by object id
router.get("/getById", auth, verifyTokenAndAdmin, async(req, res) => {
    let recordId = req.body.recordId;
    LifeActivityRecordModel
        .find({ _id: recordId })
        .then(record => res.json(record))
        .catch(err => res.json({ message: err }));

});

// get specific life activity record by section id
router.get("/getBySectionId", auth, verifyTokenAndAdmin, async(req, res) => {
    let sectionId = req.body.sectionId;
    LifeActivityRecordModel
        .find({ section: sectionId })
        .then(record => res.json(record))
        .catch(err => res.json({ message: err }));
});

// get specific life activity record by patient id
router.get("/getByPatientId", auth, verifyTokenAndAdmin, async(req, res) => {
    let patientId = req.body.patientId;
    LifeActivityRecordModel
        .find({ patient: patientId })
        .then(record => res.json(record))
        .catch(err => res.json({ message: err }));
});

// create life activity record
router.post("/create", auth, verifyTokenAndAdmin, async(req, res) => {
    const recordModel = new LifeActivityRecordModel({
        section: req.body.section,
        patient: req.body.patient,
        value: req.body.value,
    });

    recordModel
        .save()
        .then(record => res.json(record))
        .catch(err => res.json({ message: err }));
});

// update life activity record
router.put("/update", auth, verifyTokenAndAdmin, async(req, res) => {
    let recordId = req.body.recordId;

    LifeActivityRecordModel
        .updateOne({
            _id: recordId
        }, {
            section: req.body.section,
            patient: req.body.patient,
            value: req.body.value
        }).then(record => res.json(record))
        .catch(err => res.json({ message: err }));
});

// delete life activity record
router.delete("/delete", auth, verifyTokenAndAdmin, async(req, res) => {
    let recordId = req.body.recordId;

    LifeActivityRecordModel
        .deleteOne({ _id: recordId })
        .then(record => res.json(record))
        .catch(err => res.json({ message: err }));
});

module.exports = router;