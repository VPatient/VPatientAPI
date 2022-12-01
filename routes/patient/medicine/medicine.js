const router = require("express").Router();
const { auth, verifyTokenAndAdmin, verifyTokenAndAuthorization } = require('../../auth/verifyToken');
const { queryValidation, idValidation } = require('../../../common/validation');
const { verifyPatient } = require('../verifyPatient');
const PatientModel = require('../../../models/PatientModel');
const MedicineModel = require('../../../models/MedicineModel');

// create patient medicines
router.post("/create", verifyTokenAndAdmin, verifyPatient, async (req, res) => {
    // get patient
    let patient = req.patient;

    // results array
    var medicines = [];

    // control models
    if (!req.body.medicines) return res.status(500);

    // fill results
    req.body.medicines.forEach(medicine => {
        var med = new MedicineModel({
            name: medicine.name,
            dose: medicine.dose,
            time: medicine.time,
            reason: medicine.reason,
            duration: medicine.duration,
            owner: patient._id
        });

        medicines.push(med);
    });

    // insert all
    MedicineModel.insertMany(medicines)
        .then(medicines => res.status(200).json(medicines))
        .catch(err => res.status(500).json({ message: err }));
});

// get patient medicines
router.get("/get", auth, verifyPatient, async (req, res) => {
    // get patient
    let patient = req.patient;

    // get results
    const traces = await MedicineModel.find({ owner: patient });

    // return
    res.status(200).json(traces);
});

module.exports = router;