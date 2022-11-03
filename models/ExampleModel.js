//mongodb example model to use in routes
const mongoose = require('mongoose');

const ExampleSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    ex: Number,
    date: {
        type: Date,
        default: Date.now
    }
});

mongoose.model('ExampleModel', ExampleSchema);