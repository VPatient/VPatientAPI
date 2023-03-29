const mongoose = require('mongoose');

const LifeActivityQuestionSchema = new mongoose.Schema({
    form: { type: mongoose.Types.ObjectId, ref: 'LifeActivityFormModel' },
    title: {
        type: String,
        required: true
    },
    fields: {
        type: Array,
        required: true
    },
    remark: {
        type: Boolean,
        default: false
    },
    type: {
        type: String,
        default: 'dropdown'
    },
    is_mandatory: {
        type: Boolean,
        default: true
    },
    show_answer: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

module.exports = mongoose.model('LifeActivityQuestionModel', LifeActivityQuestionSchema);