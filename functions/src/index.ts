import * as functions from "firebase-functions";
import express from "express";
import {addEntry, getAllEntries} from "./entryController";
import {getAllSpots} from "./controllers/spotsController";

const app = express();

app.get("/", (req, res) => res.status(200).send("Hey there!"));
app.post("/entries", addEntry);
app.get("/entries", getAllEntries);
app.get("/spots", getAllSpots );

exports.app = functions.https.onRequest(app);
