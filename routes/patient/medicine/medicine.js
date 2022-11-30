const router = require("express").Router();
const { auth, verifyTokenAndAdmin, verifyTokenAndAuthorization } = require('../../auth/verifyToken');
const { queryValidation, idValidation } = require('../../../common/validation');
const PatientModel = require('../../../models/PatientModel');
const MedicineModel = require('../../../models/MedicineModel');

// create patient medicines
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

    // results array
    var medicines = [];

    // control models
    if (!req.body.medicines) res.status(500);

    // fill results
    req.body.medicines.forEach(medicine => {
        var med = new MedicineModel({
            name: medicine.name,
            dose: medicine.dose,
            time: medicine.time,
            reason: medicine.reason,
            duration: medicine.duration,
            owner: patientId
        });

        medicines.push(med);
    });

    // insert all
    MedicineModel.insertMany(medicines)
        .then(medicines => res.json(medicines))
        .catch(err => res.json({ message: err }));
});

// get patient medicines
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
    const traces = await MedicineModel.find({ owner: patientId });

    // return
    res.status(200).json(traces);
});

module.exports = router;