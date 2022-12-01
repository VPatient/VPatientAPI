const router = require("express").Router();
const { auth, verifyTokenAndAdmin, verifyTokenAndAuthorization } = require('../../auth/verifyToken');
const { queryValidation, idValidation } = require('../../../common/validation');
const { verifyPatient } = require('../verifyPatient');
const PatientModel = require('../../../models/PatientModel');
const NortonPressureUlcerModel = require('../../../models/NortonPressureUlcerModel');

// create patient norton pressure ulcer
router.post("/create", verifyTokenAndAdmin, verifyPatient, async (req, res) => {
    // get patient
    let patient = req.patient;

    // create model
    var nortonPressureUlcer = new NortonPressureUlcerModel({
        physicalCondition: req.body.physicalCondition,
        mentalCondition: req.body.mentalCondition,
        activityCondition: req.body.activityCondition,
        movementCondition: req.body.movementCondition,
        incontinenceCondition: req.body.incontinenceCondition,
        owner: patient._id
    });

    // insert
    NortonPressureUlcerModel.create(nortonPressureUlcer)
        .then(pressureUlcer => res.status(200).json(pressureUlcer))
        .catch(err => res.status(500).json({ message: err }));
});

// get patient norton pressure ulcer
router.get("/get", auth, verifyPatient, async (req, res) => {
   // get patient
   let patient = req.patient;

    // get results
    const traces = await NortonPressureUlcerModel.find({ owner: patient });

    // return
    res.status(200).json(traces);
});

module.exports = router;