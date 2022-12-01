const router = require("express").Router();
const { auth, verifyTokenAndAdmin, verifyTokenAndAuthorization } = require('../../auth/verifyToken');
const { queryValidation, idValidation } = require('../../../common/validation');
const { verifyPatient } = require('../verifyPatient');
const PatientModel = require('../../../models/PatientModel');
const FallRiskFormModel = require('../../../models/FallRiskFormModel');
const PatientFallRiskModel = require('../../../models/PatientFallRiskModel');

// create fall risk form factor
router.post("/factor/create", verifyTokenAndAdmin, async (req, res) => {

    // results array
    var factors = [];

    // control models
    if (!req.body.factors) return res.status(500).json('Invalid format');

    // fill results
    req.body.factors.forEach(factor => {
        var fact = new FallRiskFormModel({
            factor: factor.factor,
            major: factor.major,
            point: factor.point,
            order: factor.order
        });

        factors.push(fact);
    });

    // insert all
    FallRiskFormModel.insertMany(factors)
        .then(factors => res.status(200).json(factors))
        .catch(err => res.status(500).json({ message: err }));
});

// get fall risk factor form list
router.get("/factor/list", auth, async (req, res) => {

    // get factors
    const factors = await FallRiskFormModel.find();

    // return
    res.status(200).json(factors);
});

// create patient fall risk
router.post("/create", verifyTokenAndAdmin, verifyPatient, async (req, res) => {
    // get patient
    let patient = req.patient;

    // get order
    let order = req.body.factorOrder;

    // return if there is not such an order
    if (!order) return res.status(500).json(`Invalid order ${order}`);

    // get factor
    const factor = await FallRiskFormModel.findOne({ order: order });

    if (!factor) return res.status(500).json(`Cannot find any factor with order ${order}`);

    // create model
    var fallRisk = new PatientFallRiskModel({
        owner: patient._id,
        fallRisk: factor._id
    });

    // insert
    PatientFallRiskModel.create(fallRisk)
        .then(vitalSign => res.status(200).json(vitalSign))
        .catch(err => res.status(500).json({ message: err }));
});

// get patient fall risk
router.get("/get", auth, verifyPatient, async (req, res) => {
    // get patient
    let patient = req.patient;

    // patient factors
    let fallRisks = [];

    // get patient factors
    const patientFactors = await PatientFallRiskModel.find({ owner: patient });

    // return if there is no patient factors
    if (!patientFactors) return res.status(500).json(`Cannot find any factors related with patient id ${patient._id}`);

    // add to patient factors
    patientFactors.forEach(pfact => {
        fallRisks.push(pfact.fallRisk);
    });

    // get related fall risk form factors
    const formFactors = await FallRiskFormModel.find({ _id: { $in: fallRisks } });

    // return
    res.status(200).json(formFactors);
});

module.exports = router;