const express = require('express');
const app = express(); // express app
const dotenv = require('dotenv'); // import dotenv
const mongoose = require("mongoose") // import MongoDb
const cors = require('cors'); // for CORS policy
const bodyParser = require('body-parser'); // body parser to parse as json
dotenv.config(); // configure dotenv to use secret keys


// routes
const exampleRoute = require('./routes/exampleRoute');
const authRoute = require('./routes/auth/auth');
const scenarioRoute = require('./routes/scenarioRoute');

// connect mongodb server
mongoose.connect(
    process.env.MONGO_DB_URL
)
.then(()=>console.log("DB Connection Successfull"))
.catch((err)=>console.log(err));

//middlewares
app.use(express.json());
app.use(bodyParser.json());// using body-parser for the requests
app.use(cors()); // for CORS-POLICY

app.use("/api/exampleRoute",exampleRoute); // use exampleRoute endpoints if url starts with /api/exampleRoute
app.use("/auth",authRoute); // use auth endpoints if url starts with /auth
app.use("/scenario",scenarioRoute); // use scenario endpoints if url starts with /auscenarioth

// start the app <npm start>
app.listen(process.env.PORT || 5000, () => {
    console.log("The Server Is Running...");
});
