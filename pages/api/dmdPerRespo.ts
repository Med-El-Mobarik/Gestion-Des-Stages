import { con } from "../../db/connection";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { respo } = req.query;

  const sql = `SELECT * FROM demande WHERE responsable = ${respo}`;

  con.query(sql, (err: any, result: any) => {
    if (err) throw err;
    return res.json(result);
  });
}
