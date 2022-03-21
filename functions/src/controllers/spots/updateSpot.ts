import dayjs from "dayjs";
import {Response} from "express";
import {db} from "../../config";
import {Spot, Quality} from "../../types/spot";

type Request = {
    body: Spot,
    params: { entryId: string }
  }

/*
computeStatus check if at least one value for quality is true
check also if there are multiple vote in same range of date
if these conditions are true, then status is true
*/

const computeStatus = (quality: Quality, votes: Array<Quality>) => {
  let status = false;
  const lastDate: any = dayjs(quality?.date);
  if (
    (quality?.water || quality?.plastic || quality?.seal) &&
    (votes.some((el) =>
      lastDate.diff(dayjs(el?.date), "day") <= 3))
  ) {
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
      quality: computeStatus(quality, currentSpot.votes) ?
      quality : (!quality?.water && !quality?.plastic && !quality?.seal) ?
      quality : currentSpot.quality,
      votes: [...currentSpot.votes, quality],
      status: computeStatus(quality, currentSpot.votes) ? true :
      (!quality?.water && !quality?.plastic && !quality?.seal) ? false : false,
    };
    await spot.set(updatedSpot).catch((error) => {
      return res.status(400).json({
        status: "error",
        message: error.message,
      });
    });

    return res.status(200).json({
      status: "success",
      message: "spot updated successfully",
      data: updatedSpot,
    });
  } catch (error: any) {
    return res.status(500).json(error.message);
  }
};
