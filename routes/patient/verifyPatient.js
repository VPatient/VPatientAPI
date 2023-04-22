const { queryValidation, idValidation } = require('../../common/validation');
const PatientModel = require('../../models/PatientModel');

// verify patient middleware
const verifyPatient = async(req, res, next) => {
    // get id from query
    let queryId = req.query.id;

    // if id is present then validate
    if (queryId) {
        // validation
        const { error } = idValidation(queryId);

        // if there is an error return
        if (error) return res.status(400)
            .send(error.details[0].message);

        // get id
        let patientId = req.query.id;

        // get patient
        const patient = await PatientModel.findOne({ _id: patientId });

        // return if there is not such that patient
        if (!patient) return res.status(500).json(`Cannot find patient with id ${patientId}`);

        // if patient is present then add patient to request
        req.patient = patient;

        // proceed to route
        return next();
    }

    // if id is given in body then get id then validate

    // get patient id
    let patientId = req.body.patientId;

    // validation
    const { error } = idValidation(patientId);
    if (error) return res.status(400)
        .send(error.details[0].message);

    // get patient
    const patient = await PatientModel.findOne({ _id: patientId });

    // return if there is not such that patient
    if (!patient) return res.status(500).json(`Cannot find patient with id ${patientId}`);

    // if patient is present then add patient to request
    req.patient = patient;

    // proceed to route
    next();
}

module.exports = { verifyPatient };