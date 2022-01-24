import {Response} from "express";
import {db} from "../../config";

type Quality = {
  water: boolean,
  plastic: boolean,
  seal: boolean,
}

type Spot = {
    name: string,
    coords: Array<number>,
    quality: Quality,
    status: boolean,
  }

type Request = {
    body: Spot,
    params: { entryId: string }
  }

const computeStatus = (quality: Quality) => {
  let status = false;
  if (quality.water || quality.plastic || quality.seal) {
    status = true;
  } else status = false;
  return status;
};

export const updateSpot = async (req: Request, res: Response) => {
  const {body: {quality}, params: {entryId}} = req;
  try {
    const spot = db.collection("spots").doc(entryId);
    const currentSpot = (await spot.get()).data() || {};
    const updatedSpot = {
      id: currentSpot.id,
      name: currentSpot.name,
      coords: currentSpot.coords,
      quality: quality || currentSpot.quality,
      status: computeStatus(quality),
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
