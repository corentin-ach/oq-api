import {Response} from "express";
import {NotionAPI} from "notion-client";

type Request = {
    body: any,
    params: { entryId: string }
}

export const getNotion = async (req: Request, res: Response) => {
  const notion = new NotionAPI();
  try {
    // eslint-disable-next-line max-len
    const recordMap = await notion.getPage("https://corentin-ach.notion.site/Readme-Oavel-test-cb19e75baa684be4a0deba7242728fcc");
    return res.status(200).json(recordMap);
  } catch (error: any) {
    return res.status(500).json(error.message);
  }
};
