import dayjs from "dayjs";
import {Response} from "express";
import {db} from "../../config";
import {Quality, Spot} from "../../types/spot";

type Request = {
    body: Spot,
    params: { entryId: string }
  }

/*
  Fonction dans quality :
  si dans votes, le dernier vote date plus de 7 jours,
  alors quality passe à true
*/

const computeStatus = (quality: Quality) => {
  const lastDate = dayjs(quality.date);
  const nowDate = dayjs(dayjs(new Date()).format("YYYY-MM-DD"));
  const status = nowDate.diff(lastDate, "day") >= 2 ? false : true;
  return status;
};

export const getSpot = async (req: Request, res: Response) => {
  const {params: {entryId}} = req;
  try {
    const spot = db.collection("spots").doc(entryId);
    const currentSpot = (await spot.get()).data() || {};
    const formatedSpot = {
      name: currentSpot.name,
      coords: currentSpot.coords,
      quality: currentSpot.quality,
      status: computeStatus(currentSpot.quality),
      votes: currentSpot.votes,
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
