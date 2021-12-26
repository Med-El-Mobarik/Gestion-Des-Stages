import { con } from "../../db/connection";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { num } = req.query;

  const sql = `SELECT * FROM etudiant WHERE num = ${num}`;

  con.query(sql, (err: any, result: any) => {
    if (err) throw err;
    return res.json(result);
  });
}
