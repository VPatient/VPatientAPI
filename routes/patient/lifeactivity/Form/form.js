const router = require("express").Router();
const { verifyTokenAndAdmin } = require('../../../auth/verifyToken');
const LifeActivityFormModel = require('../../../../models/LifeActivityFormModel');
const { verifyFormBySequence } = require("../verify");

// get all life activity form model
router.get("/get", verifyTokenAndAdmin, async(req, res) => {
    LifeActivityFormModel
        .find()
        .then(forms => res.json(forms))
        .catch(err => res.json({ message: err }));
});

// create life activity form model
router.post("/create", verifyTokenAndAdmin, async(req, res) => {
    // create life activity form model
    const formModel = new LifeActivityFormModel({
        name: req.body.name,
        sequence: req.body.sequence
    });

    // save
    formModel
        .save()
        .then(formModel => res.json(formModel))
        .catch(err => res.json({ message: err }));
});

// delete life activity form model by sequence
router.post("/delete", verifyTokenAndAdmin, verifyFormBySequence, async(req, res) => {
    // get form
    let form = req.form;

    // delete form
    LifeActivityFormModel.findByIdAndDelete(form._id)
        .then(() => res.json({ message: "Deleted" }))
        .catch(err => res.json({ message: err }));
});

// update life activity form model by sequence
router.post("/update", verifyTokenAndAdmin, verifyFormBySequence, async(req, res) => {
    // get form
    let form = req.form;

    // find and update form
    await LifeActivityFormModel.findByIdAndUpdate(form._id, {
        name: req.body.name
    }, { new: true }).then(form => res.json(form));
});

module.exports = router;