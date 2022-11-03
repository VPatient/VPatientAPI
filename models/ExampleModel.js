//mongodb example model to use in routes
import { Schema, model } from 'mongoose';

const ExampleSchema = Schema({
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

export default model('ExampleModel',ExampleSchema);