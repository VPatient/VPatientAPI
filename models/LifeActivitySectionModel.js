const mongoose = require('mongoose');

const LifeActivitySectionSchema = new mongoose.Schema({
    section: { type: mongoose.Types.ObjectId, ref: 'LifeActivityDiagnosisModel' },
    value: {
        type: Array,
        required: true
    },
}, { timestamps: true });

module.exports = mongoose.model('LifeActivitySectionModel', LifeActivitySectionSchema)