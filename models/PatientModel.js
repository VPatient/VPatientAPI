const mongoose = require('mongoose');

const PatientSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    maritalStatus: {
        type: String,
        required: true
    },
    degree: {
        type: String,
        required: true
    },
    job: {
        type: String,
        required: true
    },
    children: {
        type: Number,
        required: true
    },
    insurance: {
        type: String,
        required: true
    },
    racialAndReligion: {
        type: String,
        required: true
    },
    companion: {
        type: String,
        required: true
    },
    bloodType: {
        type: String,
        required: true
    },
    contagiousDisease: {
        type: Boolean,
        required: true,
        default: false
    },
    primaryDiagnosis: {
        type: String,
        required: true
    },
    height: {
        type: Number,
        required: true
    },
    weight: {
        type: Number,
        required: true
    },
    hospitalizationReason: {
        type: String,
        required: true
    },
    chronicDiseases: {
        type: String
    },
    previouslyHospitalized: {
        type: String
    },
    allergies: {
        type: String
    },
    cigaretteHabit: {
        type: String
    },
    alcoholHabit: {
        type: String
    },
    substanceAbuse: {
        type: String
    },
    motherCauseofDeath: {
        type: String
    },
    dadCauseofDeath: {
        type: String
    },
    siblingCauseofDeath: {
        type: String
    },
    closeRelativeCauseofDeath: {
        type: String
    },
    painLocation: {
        type: String
    },
    painIntensity: {
        type: Number
    },
    painType: {
        type: String
    },
    painQualification: {
        type: String
    }
});

modules.export = mongoose.model('PatientModel', PatientSchema);