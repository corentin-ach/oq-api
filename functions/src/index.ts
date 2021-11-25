import * as functions from "firebase-functions";
import express from "express";
import {getAllSpots, updateSpot} from "./controllers/spotsController";
import cors from "cors";
import helmet from "helmet";

const app = express();

app.use(cors());
app.use(helmet());

app.get("/", (req, res) => res.status(200).send("Hey there!"));
app.get("/spots", getAllSpots );
app.get("/spot/:entryId", updateSpot);

exports.app = functions.https.onRequest(app);
