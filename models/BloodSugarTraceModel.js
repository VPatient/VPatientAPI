import { Schema, model } from 'mongoose';

const BloodSugarTraceSchema = new Schema ({
    time: {
        type: Date,
        required: true,
    },
    result: {
        type: String,
        required: true,
    },
    note: {
        type: String,
    },
    owner: { type: moongose.Types.ObjectId, ref: 'PatientModel' },
});

export default model('BloodSugarTraceModel', BloodSugarTraceSchema);