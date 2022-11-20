const mongoose = require('mongoose');

const BloodSugarTraceSchema = new mongoose.Schema ({
    time: {
        type: Date,
        required: true
    },
    result: {
        type: String,
        required: true
    },
    note: {
        type: String
    },
    owner: { type: mongoose.Types.ObjectId, ref: 'PatientModel' }
},
{timestamps: true});

module.exports = mongoose.model('BloodSugarTraceModel', BloodSugarTraceSchema);