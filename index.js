const express = require('express');
const app = express(); // express app
const dotenv = require('dotenv'); // import dotenv
const mongoose = require("mongoose") // import MongoDb
const cors = require('cors'); // for CORS policy
const fs = require('fs'); // file system
const https = require('https'); // https
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
    .then(() => console.log("DB Connection Successfull"))
    .catch((err) => console.log(err));

// middlewares
app.use(express.json()); // express
app.use(bodyParser.json());// using body-parser for the requests
app.use(cors()); // for CORS-POLICY

app.use("/auth", authRoute); // use auth endpoints if url starts with /auth
app.use("/scenario", scenarioRoute); // use scenario endpoints if url starts with /scenario
app.use("/patient", patientRoute); // use patient endpoints if url starts with /patient
app.use("/grade", gradeRoute); // use grade endpoints if url starts with /grade
app.use("/user", userRoute); // use user endpoints if url starts with /user

https
  .createServer(
		// Provide the private and public key to the server by reading each
		// file's content with the readFileSync() method.
    {
      key: fs.readFileSync("vpatient.key"),
      cert: fs.readFileSync("vpatient.crt"),
    },
    app
  )
  .listen(process.env.port || 5555, () => {
    console.log("Server is runing at port 5000");
  });
