import { con } from "../../db/connection";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { num } = req.query;

  const sql = `UPDATE stage SET etudiant = ${0}, empech = '' WHERE num = ${num}`;

  con.query(sql, (err: any, result: any) => {
    if (err) throw err;
    return res.json({ success: true });
  });
}
