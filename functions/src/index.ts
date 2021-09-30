import * as functions from "firebase-functions";
import express from "express";
import {addEntry, getAllEntries} from "./entryController";

const app = express();

app.get("/", (req, res) => res.status(200).send("Hey there!"));
app.post("/entries", addEntry);
app.get("/entries", getAllEntries);

exports.app = functions.https.onRequest(app);
