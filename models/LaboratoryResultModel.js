import { Schema, model } from 'mongoose';

const LaboratoryResultSchema = new Schema ({
    parameterName: {
        type: String,
        required: true,
    },
    result: {
        type: String,
        required: true,
    },
    unit: {
        type: String,
        required: true,
    },
    referanceInterval: {
        type: String,
        required: true,
    },
    owner: { type: moongose.Types.ObjectId, ref: 'PatientModel' },
});

export default model('LaboratoryResultModel', LaboratoryResultSchema);