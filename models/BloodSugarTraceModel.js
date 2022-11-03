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
});

mongoose.model('BloodSugarTraceModel', BloodSugarTraceSchema);