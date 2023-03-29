const mongoose = require('mongoose');

const LifeActivityFormSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    sequence: {
        type: Number,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('LifeActivityFormModel', LifeActivityFormSchema);