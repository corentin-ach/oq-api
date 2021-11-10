import * as functions from "firebase-functions";
import express from "express";
import {addEntry, getAllEntries} from "./entryController";
import {getAllSpots, updateSpot} from "./controllers/spotsController";

const app = express();

app.get("/", (req, res) => res.status(200).send("Hey there!"));
app.post("/entries", addEntry);
app.get("/entries", getAllEntries);
app.get("/spots", getAllSpots );
app.get("/spot", updateSpot);

exports.app = functions.https.onRequest(app);
