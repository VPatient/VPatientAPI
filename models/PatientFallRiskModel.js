import { Schema, model } from 'mongoose';

const PatientFallRiskSchema = new Schema ({
    fallRisk: { type: moongose.Types.ObjectId, ref: 'FallRiskFormModel' },
    owner: { type: moongose.Types.ObjectId, ref: 'PatientModel' },
});

export default model('PatientFallRiskModel', PatientFallRiskSchema);