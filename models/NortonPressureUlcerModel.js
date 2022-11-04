const mongoose = require('mongoose');

const NortonPressureUlcerSchema = new mongoose.Schema({
    physicalCondition: {
        type: Number,
        required: true
    },
    mentalCondition: {
        type: Number,
        required: true
    },
    activityCondition: {
        type: Number,
        required: true
    },
    movementCondition: {
        type: Number,
        required: true
    },
    incontinenceCondition: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    owner: { type: mongoose.Types.ObjectId, ref: 'PatientModel' }
},
{timestamps: true});

module.exports = mongoose.model('NortonPressureUlcerModel', NortonPressureUlcerSchema)