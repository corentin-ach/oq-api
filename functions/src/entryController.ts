import {Response} from "express";
import {db} from "./config";

type EntryType = {
    title: string,
    text: string,
    coverImageUrl: string
  }

type Request = {
    body: EntryType,
    params: { entryId: string }
  }

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const addEntry = async (req: Request, res: Response) => {
  const {title, text} = req.body;
  try {
    const entry = db.collection("entries").doc();
    const entryObject = {
      id: entry.id,
      title,
      text,
    };

    await entry.set(entryObject);

    res.status(200).send({
      status: "success",
      message: "entry added successfully",
      data: entryObject,
    });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(500).json(error.message);
  }
};

export default addEntry;
