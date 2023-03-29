const mongoose = require('mongoose');

const LifeActivityRecordSchema = new mongoose.Schema({
    section: { type: mongoose.Types.ObjectId, ref: 'LifeActivitySectionModel' },
    patient: { type: mongoose.Types.ObjectId, ref: 'PatientModel' },
    value: {
        type: String,
        required: true
    },
}, { timestamps: true });

module.exports = mongoose.model('LifeActivityRecordModel', LifeActivityRecordSchema)