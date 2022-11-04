const mongoose = require('mongoose');

const VitalSignSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true,
        default: Date.now
    },
    bloodPressure: {
        type: String,
        required: true
    },
    pulseOverMinute: {
        type: String,
        required: true
    },
    breathOverMinute: {
        type: String,
        required: true
    },
    bodyTemperature: {
        type: String,
        required: true
    },
    owner: { type: mongoose.Types.ObjectId, ref: 'PatientModel' }
},
{timestamps: true});

module.exports = mongoose.model('VitalSignModel', VitalSignSchema)