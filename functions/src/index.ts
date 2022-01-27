import * as functions from "firebase-functions";
import express from "express";

import cors from "cors";
import helmet from "helmet";
import {getAllSpots} from "./controllers/spots/getAllSpots";
import {updateSpot} from "./controllers/spots/updateSpot";
import {getSpot} from "./controllers/spots/getSpot";
import {getNotion} from "./controllers/notion/getNotion";

const app = express();

app.use(cors());
app.use(helmet());

app.get("/", (req, res) => res.status(200).send("Hey there!"));
app.get("/spots", getAllSpots );
app.patch("/spot/:entryId", updateSpot);
app.get("/spot/:entryId", getSpot);
app.get("/notion", getNotion);

exports.app = functions.https.onRequest(app);
