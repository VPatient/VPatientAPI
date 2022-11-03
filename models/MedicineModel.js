const mongoose = require('mongoose');

const MedicineSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    dose: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    reason: {
        type: String,
        required: true
    },
    duration: {
        type: String,
        required: true
    },
    owner: { type: mongoose.Types.ObjectId, ref: 'PatientModel' }
});

module.exports = mongoose.model('MedicineModel', MedicineSchema)