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
    const recordMap = await notion.getPage("https://corentin-ach.notion.site/58e64e68e650487db426a44a4e22de62?v=01b6801733a54252a1a40dc89654c24c");
    return res.status(200).json({
      data: recordMap,
    });
  } catch (error: any) {
    return res.status(500).json(error.message);
  }
};
