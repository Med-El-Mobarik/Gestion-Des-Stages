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
    const sql = `INSERT INTO resultat (appreciation, file, encadrant, etudiant) VALUES('${
      fields.appreciation
    }', '${
      files.file.originalFilename
    }', ${+fields.encadrant}, ${+fields.etudiant})`;

    con.query(sql, (err: any, result: any) => {
      if (err) throw err;
      return res.json({ success: true });
    });
  });
};
