import dayjs from "dayjs";
import {Response} from "express";
import {db} from "../../config";
import {Quality, Spot} from "../../types/spot";

type Request = {
    body: Spot,
    params: { entryId: string }
  }

const computeStatus = (quality: Quality) => {
  const lastDate = dayjs(quality.date);
  const nowDate = dayjs(dayjs(new Date()).format("YYYY-MM-DD"));
  const status = nowDate.diff(lastDate, "day") >= 7 ? false : true;
  return status;
};

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
          water: computeStatus(doc.data().quality) ?
          doc.data().quality.water : false,
          plastic: computeStatus(doc.data().quality) ?
          doc.data().quality.plastic : false,
          seal: computeStatus(doc.data().quality) ?
          doc.data().quality.seal : false,
        },
        status: computeStatus(doc.data().quality),
        votes: doc.data().votes,
      };
      console.log(formatedSpot);
      return allSpots.push(formatedSpot);
    });
    return res.status(200).json(allSpots);
  } catch (error: any) {
    return res.status(500).json(error.message);
  }
};
