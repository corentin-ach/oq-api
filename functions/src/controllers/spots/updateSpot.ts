import {Response} from "express";
import {db} from "../../config";

type Quality = {
  status: boolean,
  water: boolean,
  plastic: boolean,
  seal: boolean,
}

type Spot = {
    name: string,
    coords: Array<number>,
    quality: Quality
  }

type Request = {
    body: Spot,
    params: { entryId: string }
  }


export const updateSpot = async (req: Request, res: Response) => {
  const {body: {name, coords, quality}, params: {entryId}} = req;
  try {
    const spot = db.collection("spots").doc(entryId);
    const currentSpot = (await spot.get()).data() || {};
    const updatedSpot = {
      name: name || currentSpot.name,
      coords: coords || currentSpot.coords,
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
