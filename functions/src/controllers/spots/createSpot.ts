import {Response} from "express";
import {db} from "../../config";
import {Spot} from "../../types/spot";


type Request = {
    body: Spot,
    params: { entryId: string }
  }

export const createSpot = async (req: Request, res: Response) => {
  const {name, coords} = req.body;
  try {
    const spot = db.collection("spots").doc();
    const createdSpot = {
      id: spot.id,
      name,
      coords,
      quality: {
        water: false,
        plastic: false,
        seal: false,
        date: "2022-01-06",
      },
      status: false,
      votes: [],
    };
    spot.set(createdSpot);
    res.status(201).send({
      status: "success",
      message: "spot added successfully",
      data: createdSpot,
    });
  } catch (err: any) {
    res.status(500).json(err.message);
  }
};
