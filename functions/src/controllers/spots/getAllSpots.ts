import {Response} from "express";
import {db} from "../../config";
import {Spot} from "../../types/spot";

type Request = {
    body: Spot,
    params: { entryId: string }
  }

export const getAllSpots = async (req: Request, res: Response) => {
  try {
    const allSpots: Spot[] = [];
    const querySnapshot = await db.collection("spots").get();
    querySnapshot.forEach((doc: any) => allSpots.push(doc.data()));
    return res.status(200).json(allSpots);
  } catch (error: any) {
    return res.status(500).json(error.message);
  }
};
