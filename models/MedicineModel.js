import { Schema, model } from 'mongoose';

const MedicineSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    dose: {
        type: String,
        required: true,
    },
    time: {
        type: String,
        required: true,
    },
    reason: {
        type: String,
        required: true,
    },
    duration: {
        type: String,
        required: true,
    },
    owner: { type: moongose.Types.ObjectId, ref: 'PatientModel' },
});

export default model('MedicineModel', MedicineSchema);