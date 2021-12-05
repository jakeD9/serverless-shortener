import type { NextApiRequest, NextApiResponse } from "next";
import { UrlData } from "../../common";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  // TODO: use axios instead of 🤢 fetch 🤢 for cleaner json parsing and error handling
  try {
    const result = await fetch(`${process.env.CLIENT_API_URL}/url`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(req.body),
    });
  
    if (result.ok) {
      const data: UrlData = await result.json();
      return res.status(200).json(data);
    } else {
      const message: string = await result.text();
      throw new Error(message);
    }
  } catch (err: unknown) {
    if (err instanceof Error) {
      return res.status(400).send(err.message);
    } else {
      return res.status(500).send("Something went wrong");
    }
  }
};
