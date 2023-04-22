const { default: mongoose } = require("mongoose");

const OrderMedicineSchema = new mongoose.Schema({
    medicineName: {
        type: String,
        required: true
    },
    dose: {
        type: String
    },
    periods: {
        type: String
    },
    type: {
        type: Number,
        required: true
    },
}, { timestamps: true });

module.exports = mongoose.model('OrderMedicineModel', OrderMedicineSchema);