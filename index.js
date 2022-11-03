//imports and configurations
import express, { json } from "express";  // import express
const app = express(); // express app
import { config } from 'dotenv'; // import dotenv
import { connect } from "mongoose"; // import MongoDb
import cors from 'cors'; // for CORS policy
import { json as _json } from 'body-parser'; // body parser to parse as json
config(); // configure dotenv to use secret keys


// routes
import exampleRoute from './routes/exampleRoute';

// connect mongodb server
connect(
    process.env.MONGO_DB_URL
)
    .then(() => console.log("DB Connection Successful"))
    .catch((err) => console.log(err));

// middlewares
app.use(json());
app.use(_json()); // using body-parser for the requests
app.use(cors()); // for CORS-POLICY

app.use("/api/exampleRoute", exampleRoute); // use exampleRoute endpoints if url starts with /api/exampleRoute

// start the app <npm start>
app.listen(process.env.PORT || 5000, () => {
    console.log("The Server Is Running...");
});

// nodejs connect to firebase?
server.js

initializeApp

