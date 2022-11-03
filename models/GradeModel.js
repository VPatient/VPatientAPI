const mongoose = require('mongoose');

const GradeSchema = new mongoose.Schema({
    user: { type: mongoose.Types.ObjectId, ref: 'UserModel' },
    patient: { type: mongoose.Types.ObjectId, ref: 'PatientModel' },
    grade: {
        type: Number,
        required: true
    }
});

mongoose.model('GradeModel', GradeSchema);