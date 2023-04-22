const router = require("express").Router();
const { auth, verifyTokenAndAdmin, verifyTokenAndAuthorization } = require('../../auth/verifyToken');
const OrderMedicineModel = require('../../../models/OrderMedicineModel');

// get all medicines
router.get("/get", auth, verifyTokenAndAdmin, async(req, res) => {
    // get medicines
    const medicines = await OrderMedicineModel.find();

    // return
    res.status(200).json(medicines);
});

// get medicine by name
router.get("/get/:name", auth, verifyTokenAndAdmin, async(req, res) => {
    // get medicine
    const medicine = await OrderMedicineModel.findOne({ medicineName: req.params.name });

    // if medicine not found
    if (!medicine) {
        // return error
        return res.status(400).json({ message: "Medicine not found" });
    }

    // return
    res.status(200).json(medicine);
});

// create a new order mdicine medicine
router.post("/create", verifyTokenAndAdmin, async(req, res) => {
    // create model
    var medicine = new OrderMedicineModel({
        medicineName: req.body.medicineName,
        dose: req.body.dose ? req.body.dose : "",
        periods: req.body.periods ? req.body.periods : "",
        type: req.body.type,
    });

    // insert medicine
    OrderMedicineModel.create(medicine)
        .then(medicine => res.status(200).json(medicine))
        .catch(err => res.status(500).json({ message: err }));
});

// delete medicine by name
router.delete("/delete", verifyTokenAndAdmin, async(req, res) => {

    // find and delete medicine
    OrderMedicineModel.deleteOne({ medicineName: req.body.medicineName })
        .then(medicine => res.status(200).json(medicine))
        .catch(err => res.status(500).json({ message: err }));
});

// update medicine by name
router.put("/update", verifyTokenAndAdmin, async(req, res) => {

    // find and update medicine
    OrderMedicineModel.updateOne({ medicineName: req.body.medicineName }, {
            medicineName: req.body.medicineName,
            dose: req.body.dose ? req.body.dose : "",
            periods: req.body.periods ? req.body.periods : "",
            type: req.body.type,
        })
        .then(medicine => res.status(200).json(medicine))
        .catch(err => res.status(500).json({ message: err }));
});

module.exports = router;