import { Schema, model } from 'mongoose';

const NortonPressureUlcerSchema = new Schema({
    physicalCondition: {
        type: Number,
        required: true,
    },
    mentalCondition: {
        type: Number,
        required: true,
    },
    activityCondition: {
        type: Number,
        required: true,
    },
    movementCondition: {
        type: Number,
        required: true,
    },
    incontinenceCondition: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    owner: { type: moongose.Types.ObjectId, ref: 'PatientModel' },
});

export default model('NortonPressureUlcerModel', NortonPressureUlcerSchema);