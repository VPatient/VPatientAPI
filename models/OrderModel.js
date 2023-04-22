const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    patient: { type: mongoose.Types.ObjectId, ref: 'PatientModel' },
    medicines: [{ type: mongoose.Types.ObjectId, ref: 'OrderMedicineModel' }],
}, { timestamps: true });

module.exports = mongoose.model('OrderModel', OrderSchema);