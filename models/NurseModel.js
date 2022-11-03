import { Schema, model } from 'mongoose';

const NurseSchema = new Schema ({
    uid: {
        type: String,
        required: true,
        index: { unique: true },
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
    },
    registerDate: {
        type: Date,
        default: Date.now,
    },
});

export default model('NurseModel', NurseSchema);