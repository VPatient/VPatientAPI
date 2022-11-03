import { Schema, model } from 'mongoose';

const FallRiskFormSchema = new Schema ({
    factor: {
        type: String,
        required: true,
    },
    major: {
        type: Boolean,
        required: true,
    },
    point: {
        type: Number,
    },
});

export default model('FallRiskFormModel', FallRiskFormSchema);