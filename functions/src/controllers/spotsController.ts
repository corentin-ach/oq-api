import {Response} from "express";
import {db} from "../config";

type Spot = {
    name: string,
    points: Array<number>,
    quality: number
  }

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

export const updateSpot = async (req: Request, res: Response) => {
  const {body: {quality}, params: {entryId}} = req;
  try {
    const spot = db.collection("spots").doc(entryId);
    const currentSpot = (await spot.get()).data() || {};
    const updatedSpot = {
      name: currentSpot.name,
      points: currentSpot.points,
      quality: quality || currentSpot.quality,
    };
    await spot.set(updatedSpot).catch((error) => {
      return res.status(400).json({
        status: "error",
        message: error.message,
      });
    });

    return res.status(200).json({
      status: "success",
      message: "entry updated successfully",
      data: updatedSpot,
    });
  } catch (error: any) {
    return res.status(500).json(error.message);
  }
};
