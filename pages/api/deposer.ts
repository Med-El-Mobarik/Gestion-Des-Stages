import { con } from "../../db/connection";
import formidable from "formidable";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async (req: any, res: any) => {
  const form = formidable({
    uploadDir: "./public",
    keepExtensions: true,
    filename: function (name, ext) {
      return `${name}${ext}`;
    },
  });

  form.parse(req, (err, fields, files) => {
    const sql = `INSERT INTO rapport (etudiant, file) VALUES(${+fields.etudiant}, '${
      files.file.originalFilename
    }')`;

    con.query(sql, (err: any, result: any) => {
      if (err) throw err;
      return res.json({ success: true });
    });
  });
};
