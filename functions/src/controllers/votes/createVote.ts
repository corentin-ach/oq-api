import {Response} from "express";
import {db} from "../../config";

type Quality = {
    water: boolean,
    plastic: boolean,
    seal: boolean,
}

type Vote = {
    date: Date,
    quality: Quality,
    spot: string,
}

type Request = {
    body: Vote,
    params: { entryId: string }
}

export const createVote = async (req: Request, res: Response) => {
  const {date, quality, spot} = req.body;
  try {
    const vote = db.collection("votes").doc();
    const newVote = {
      id: vote.id,
      date,
      quality,
      spot,
    };
    await vote.set(newVote);
    return res.status(200).send({
      status: "success",
      message: "entry added successfully",
      data: newVote,
    });
  } catch (err: any) {
    return res.status(500).json(err.message);
  }
};
