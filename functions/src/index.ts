import * as functions from "firebase-functions";
import express from "express";
import {getAllSpots, updateSpot, getSpot} from "./controllers/spotsController";
import {createVote} from "./controllers/votesController";

import cors from "cors";

const app = express();

app.use(cors());

app.get("/", (req, res) => res.status(200).send("Hey there!"));
app.get("/spots", getAllSpots );
app.patch("/spot/:entryId", updateSpot);
app.get("/spot/:entryId", getSpot);
app.post("/votes", createVote);

exports.app = functions.https.onRequest(app);
