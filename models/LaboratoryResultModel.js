const mongoose = require('mongoose');

const LaboratoryResultSchema = new mongoose.Schema({
    parameterName: {
        type: String,
        required: true
    },
    result: {
        type: String,
        required: true
    },
    unit: {
        type: String,
        required: true
    },
    referanceInterval: {
        type: String,
        required: true
    },
    owner: { type: mongoose.Types.ObjectId, ref: 'PatientModel' }
});

module.exports = mongoose.model('LaboratoryResultModel', LaboratoryResultSchema)