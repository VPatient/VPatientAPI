const router = require("express").Router();
const verify = require('../../auth/verifyToken');
const { queryValidation, idValidation } = require('../../../common/validation');
const PatientModel = require('../../../models/PatientModel');
const FallRiskFormModel = require('../../../models/FallRiskFormModel');
const PatientFallRiskModel = require('../../../models/PatientFallRiskModel');

// create fall risk form factor
router.post("/factor/create", verify, async (req, res) => {

    // results array
    var factors = [];

    // control models
    if (!req.body.factors) res.status(500);

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
        .then(factors => res.json(factors))
        .catch(err => res.json({ message: err }));
});

// get fall risk factor form list
router.get("/factor/list", verify, async (req, res) => {

    // get factors
    const factors = await FallRiskFormModel.find();

    // return
    res.status(200).json(factors);
});

// create patient fall risk
router.post("/create", verify, async (req, res) => {
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

    // get order
    let order = req.body.factorOrder;

    // return if there is not such an order
    if (!order) res.status(500).json(`Invalid order ${order}`);

    // get factor
    const factor = await FallRiskFormModel.findOne({ order: order });

    if (!factor) res.status(500).json(`Cannot find any factor with order ${order}`)

    // create model
    var fallRisk = new PatientFallRiskModel({
        owner: patientId,
        fallRisk: factor._id
    });

    // insert
    PatientFallRiskModel.create(fallRisk)
        .then(vitalSign => res.json(vitalSign))
        .catch(err => res.json({ message: err }));
});

// get patient fall risk
router.get("/get", verify, async (req, res) => {
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

    // patient factors
    let fallRisks = [];

    // get patient factors
    const patientFactors = await PatientFallRiskModel.find({ owner: patientId });

    // return if there is no patient factors
    if (!patientFactors) res.status(500).json(`Cannot find any factors related with patient id ${patientId}`);

    // add to patient factors
    patientFactors.forEach(pfact => {
        fallRisks.push(pfact.fallRisk);
    });

    // get related fall risk form factors
    const formFactors = await FallRiskFormModel.find({ _id: {$in: fallRisks} });

    // return
    res.status(200).json(formFactors);
});

module.exports = router;