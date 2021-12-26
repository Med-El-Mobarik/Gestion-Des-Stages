import { con } from "../../db/connection";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { objet, etud, respo } = req.query;
  console.log(objet, etud, respo);

  const sql = `INSERT INTO demande(objet, etudiant, responsable) values('${objet}', ${etud}, ${respo})`;

  con.query(sql, (err: any, result: any) => {
    if (err) throw err;
    return res.json({ success: true });
  });
}
