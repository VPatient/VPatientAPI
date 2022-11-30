const router = require("express").Router();
const { auth, verifyTokenAndAdmin, verifyTokenAndAuthorization } = require('../../auth/verifyToken');
const { queryValidation, idValidation } = require('../../../common/validation');
const PatientModel = require('../../../models/PatientModel');
const NortonPressureUlcerModel = require('../../../models/NortonPressureUlcerModel');

// create patient norton pressure ulcer
router.post("/create", verifyTokenAndAdmin, async (req, res) => {
    // get patient id
    let patientId = req.body.owner;

    // validation
    const { error } = idValidation(patientId);
    if (error) return res.status(400)
        .send(error.details[0].message);

    // get patient
    const patient = await PatientModel.findOne({ _id: patientId });

    // return if there is not such that patient
    if (!patient) res.status(500).json(`Cannot find patient with id ${patientId}`);

    // create model
    var nortonPressureUlcer = new NortonPressureUlcerModel({
        physicalCondition: req.body.physicalCondition,
        mentalCondition: req.body.mentalCondition,
        activityCondition: req.body.activityCondition,
        movementCondition: req.body.movementCondition,
        incontinenceCondition: req.body.incontinenceCondition,
        owner: patientId
    });

    // insert
    NortonPressureUlcerModel.create(nortonPressureUlcer)
        .then(pressureUlcer => res.json(pressureUlcer))
        .catch(err => res.json({ message: err }));
});

// get patient norton pressure ulcer
router.get("/get", auth, async (req, res) => {
    // validation
    const { error } = queryValidation(req.query);
    if (error) return res.status(400)
        .send(error.details[0].message);

    // get id
    let patientId = req.query.id;

    // get patient
    const patient = await PatientModel.findOne({ _id: patientId });

    // return if there is not such that patient
    if (!patient) res.status(500).json(`Cannot find patient with id ${patientId}`);

    // get results
    const traces = await NortonPressureUlcerModel.find({ owner: patientId });

    // return
    res.status(200).json(traces);
});

module.exports = router;