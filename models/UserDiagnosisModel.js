const mongoose = require('mongoose');

const UserDiagnosisSchema = new mongoose.Schema({
    user: { type: mongoose.Types.ObjectId, ref: 'UserModel' },
    patient: { type: mongoose.Types.ObjectId, ref: 'PatientModel' },
    diagnosis: { type: mongoose.Types.ObjectId, ref: 'PatientDiagnosisModel' }
},
{timestamps: true});

mongoose.model('UserDiagnosisModel', UserDiagnosisSchema);