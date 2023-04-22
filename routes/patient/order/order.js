const router = require("express").Router();
const { auth, verifyTokenAndAdmin, verifyTokenAndAuthorization } = require('../../auth/verifyToken');
const { queryValidation, idValidation } = require('../../../common/validation');
const { verifyPatient } = require('../verifyPatient');
const OrderMedicineModel = require('../../../models/OrderMedicineModel');
const OrderModel = require('../../../models/OrderModel');

// create a new order with given medicine names
router.post("/create", verifyTokenAndAdmin, verifyPatient, async(req, res) => {
    // get patient
    let patient = req.patient;

    // check if patient has an order
    const existingOrder = await OrderModel.findOne({ patient: patient._id });

    // if order exists
    if (existingOrder) {
        // return error
        return res.status(400).json({ message: "Patient already has an order" });
    }

    // create medicines
    let medicines = [];

    // get medicines by name
    for (let i = 0; i < req.body.medicines.length; i++) {
        // get medicine
        let medicine = await OrderMedicineModel.findOne({ medicineName: req.body.medicines[i] });

        // if medicine not found
        if (!medicine) {
            // return error
            return res.status(400).json({ message: "Medicine not found" });
        }

        // add medicine
        medicines.push(medicine);
    }

    // create model
    var order = new OrderModel({
        patient: patient._id,
        medicines: medicines
    });

    // insert
    OrderModel.create(order)
        .then(order => res.status(200).json(order))
        .catch(err => res.status(500).json({ message: err }));
});

// get patient orders with medicines
router.get("/get", auth, verifyPatient, async(req, res) => {
    // get patient
    let patient = req.patient;

    // get orders
    const orders = await OrderModel.find({ patient: patient._id }).populate('medicines');

    // return
    res.status(200).json(orders);
});

// remove patient order
router.delete("/remove", verifyTokenAndAdmin, verifyPatient, async(req, res) => {
    // get patient
    let patient = req.patient;

    // check if patient has an order
    const existingOrder = await OrderModel.findOne({ patient: patient._id });

    // if order does not exist
    if (!existingOrder) {
        // return error
        return res.status(400).json({ message: "Patient does not have an order" });
    }

    // remove order
    OrderModel.deleteOne({ patient: patient._id })
        .then(() => res.status(200).json({ message: "Order removed" }))
        .catch(err => res.status(500).json({ message: err }));
});

module.exports = router;