const express = require('express');
const app = express(); // express app
const dotenv = require('dotenv'); // import dotenv
const mongoose = require("mongoose") // import MongoDb
const cors = require('cors'); // for CORS policy
const fs = require('fs'); // file system
const https = require('https'); // https
const http = require('http'); // http
const bodyParser = require('body-parser'); // body parser to parse as json
dotenv.config(); // configure dotenv to use secret keys


// routes
const authRoute = require('./routes/auth/auth');
const scenarioRoute = require('./routes/scenario/scenario');
const patientRoute = require('./routes/patient/patient');
const gradeRoute = require('./routes/grade/grade');
const userRoute = require('./routes/user/user');

// connect mongodb server
mongoose.connect(
        process.env.MONGO_DB_URL
    )
    .then(() => console.log("DB connection established"))
    .catch((err) => console.log(err));

// middlewares
app.use(express.json()); // express
app.use(bodyParser.json()); // using body-parser for the requests
app.use(cors()); // for CORS-POLICY

app.use("/auth", authRoute); // use auth endpoints if url starts with /auth
app.use("/scenario", scenarioRoute); // use scenario endpoints if url starts with /scenario
app.use("/patient", patientRoute); // use patient endpoints if url starts with /patient
app.use("/grade", gradeRoute); // use grade endpoints if url starts with /grade
app.use("/user", userRoute); // use user endpoints if url starts with /user


// get certificates
const privLocation = process.env.PRIVATE_LOCATION;
const privateKey = fs.readFileSync(`${privLocation}/privkey.pem`, 'utf8');
const certificate = fs.readFileSync(`${privLocation}/cert.pem`, 'utf8');
const ca = fs.readFileSync(`${privLocation}/chain.pem`, 'utf8');

// create credentials
const credentials = {
    key: privateKey,
    cert: certificate,
    ca: ca
};

// uncaught exception handler to catch uncaught exceptions
// prevents the app from crashing
process.on('uncaughtException', (err, origin) => {
    console.log(
        `Caught exception: ${err}\n` +
        `Exception origin: ${origin}`,
    );
});


// starting both http & https servers
const httpServer = http.createServer(app);
const httpsServer = https.createServer(credentials, app);

// get http port
const httpPort = process.env.HTTP_PORT;

// get https port
const httpsPort = process.env.HTTPS_PORT;

// start servers
httpServer.listen(httpPort, () => {
    console.log('HTTP Server running on port ' + httpPort);
});

httpsServer.listen(httpsPort, () => {
    console.log('HTTPS Server running on port ' + httpsPort);
});