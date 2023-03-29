const mongoose = require('mongoose');

const PatientFallRiskSchema = new mongoose.Schema({
    fallRisk: { type: mongoose.Types.ObjectId, ref: 'FallRiskFormModel' },
    owner: { type: mongoose.Types.ObjectId, ref: 'PatientModel' }
}, { timestamps: true });

module.exports = mongoose.model('PatientFallRiskModel', PatientFallRiskSchema);