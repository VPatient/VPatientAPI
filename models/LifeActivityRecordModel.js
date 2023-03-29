const mongoose = require('mongoose');

const LifeActivityRecordSchema = new mongoose.Schema({
    question: { type: mongoose.Types.ObjectId, ref: 'LifeActivityQuestionModel' },
    patient: { type: mongoose.Types.ObjectId, ref: 'PatientModel' },
    correct_answer: {
        type: String,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('LifeActivityRecordModel', LifeActivityRecordSchema);