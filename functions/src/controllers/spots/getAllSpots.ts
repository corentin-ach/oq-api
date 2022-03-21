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
    querySnapshot.forEach((doc: any) => {
      const formatedSpot = {
        id: doc.data().id,
        name: doc.data().name,
        coords: doc.data().coords,
        quality: {
          date: doc.data().quality.date,
          water: doc.data().quality.water,
          plastic: doc.data().quality.plastic,
          seal: doc.data().quality.seal,
        },
        status: doc.data().status,
        votes: doc.data().votes,
      };
      return allSpots.push(formatedSpot);
    });
    return res.status(200).json(allSpots);
  } catch (error: any) {
    return res.status(500).json(error.message);
  }
};
