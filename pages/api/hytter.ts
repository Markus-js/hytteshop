import { NextApiRequest, NextApiResponse } from "next";

import { hytter } from "../../data";

export default (req: NextApiRequest, res: NextApiResponse) => {
  res.status(200).json({ hytter });
};
