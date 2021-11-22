import * as functions from "firebase-functions";
import express from "express";
import {getAllSpots, updateSpot} from "./controllers/spotsController";

const app = express();

app.get("/", (req, res) => res.status(200).send("Hey there!"));
app.get("/spots", getAllSpots );
app.patch("/spot/:entryId", updateSpot);

exports.app = functions.https.onRequest(app);
