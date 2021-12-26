import { con } from "../../db/connection";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { lieu, sujet, deb, fin } = req.query;

  console.log(lieu, sujet, deb, fin);

  const sql = `INSERT INTO stage(lieu, sujet, date_deb, date_fin) values('${lieu}', '${sujet}', '${deb}', '${fin}')`;

  con.query(sql, (err: any, result: any) => {
    if (err) throw err;
    return res.json({ success: true });
  });
}
