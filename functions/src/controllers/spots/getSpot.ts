import {Response} from "express";
import {db} from "../../config";

type Spot = {
    name: string,
    coords: Array<number>,
    quality: number
  }

type Request = {
    body: Spot,
    params: { entryId: string }
  }

export const getSpot = async (req: Request, res: Response) => {
  const {params: {entryId}} = req;
  try {
    const spot = db.collection("spots").doc(entryId);
    const currentSpot = (await spot.get()).data() || {};
    const formatedSpot = {
      name: currentSpot.name,
      coords: currentSpot.coords,
      quality: currentSpot.quality,
    };
    return res.status(200).json({
      status: "success",
      message: "get spot  successfully",
      data: formatedSpot,
    });
  } catch (error: any) {
    return res.status(500).json(error.message);
  }
};
