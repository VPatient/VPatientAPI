const mongoose = require('mongoose');

const FallRiskFormSchema = new mongoose.Schema({
    factor: {
        type: String,
        required: true
    },
    major: {
        type: Boolean,
        required: true
    },
    point: {
        type: Number,
    }
});

module.exports = mongoose.model('FallRiskFormModel', FallRiskFormSchema)