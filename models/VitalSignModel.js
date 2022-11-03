import { Schema, model } from 'mongoose';

const VitalSignSchema = new Schema ({
    date: {
        type: Date,
        required: true,
        default: Date.now,
    },
    bloodPressure: {
        type: String,
        required: true,
    },
    pulseOverMinute: {
        type: String,
        required: true,
    },
    breathOverMinute: {
        type: String,
        required: true,
    },
    bodyTemperature: {
        type: Number,
        required: true,
    },
    owner: { type: moongose.Types.ObjectId, ref: 'PatientModel' },
});

export default model('VitalSignModel', VitalSignSchema);