import { con } from "../../db/connection";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { num, lieu, sujet, date_dep, date_fin } = req.query;

  const sql = `UPDATE stage SET lieu = '${lieu}' , sujet = '${sujet}' , date_deb = '${date_dep}' , date_fin = '${date_fin}' WHERE num = ${num}`;

  con.query(sql, (err: any, result: any) => {
    if (err) throw err;
    return res.json({ success: true });
  });
}
