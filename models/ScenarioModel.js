const mongoose = require('mongoose');

const ScenarioSchema = mongoose.Schema({
    patient: { type: mongoose.Types.ObjectId, ref: 'PatientModel' },
    sequence: {
        type: Number,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    reply: {
        type: Boolean,
        required: true
    },
    action: {
        type: Boolean,
        default: false
    },
    date: {
        type: Date,
        default: Date.now
    },
    
},
{timestamps: true});

module.exports = mongoose.model("ScenarioModel",ScenarioSchema);
