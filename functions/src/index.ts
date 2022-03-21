import * as functions from "firebase-functions";
import express from "express";

import cors from "cors";
import helmet from "helmet";
import {getAllSpots} from "./controllers/spots/getAllSpots";
import {updateSpot} from "./controllers/spots/updateSpot";
import {createSpot} from "./controllers/spots/createSpot";

const app = express();

app.use(cors());
app.use(helmet());

app.get("/", (req, res) => res.status(200).send("Hey there!"));
app.get("/spots", getAllSpots );
app.patch("/spot/:entryId", updateSpot);
app.post("/spots", createSpot);

exports.app = functions.https.onRequest(app);
