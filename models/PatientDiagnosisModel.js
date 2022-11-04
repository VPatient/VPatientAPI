const mongoose = require('mongoose');

const PatientDiagnosisSchema = new mongoose.Schema ({
    name: {
        type: String,
        required: true
    },
    true: {
        type: Boolean,
        required: true
    },
    owner: { type: mongoose.Types.ObjectId, ref: 'PatientModel' }
},
{timestamps: true});

mongoose.model('PatientDiagnosisModel', PatientDiagnosisSchema);