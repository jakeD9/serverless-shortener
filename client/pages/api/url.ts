import type { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  console.log(req.body);
  fetch(`${process.env.CLIENT_API_URL}/url`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(req.body),
  })
    .then((data) => {
      if (data.ok) {
        return res.status(200).json(data);
      } else {
        return data.text().then((msg) => {
          throw new Error(msg);
        });
      }
    })
    .catch((err) => {
      return res.status(400).send(err.message);
    });
};
