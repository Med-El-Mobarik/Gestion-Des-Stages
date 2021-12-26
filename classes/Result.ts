import axios from "axios";

export default class Result {
  appréciation: string;
  file: File;
  encadrant: number;
  etudiant: number;

  constructor(
    appréciation: string,
    file: File,
    encadrant: number,
    etudiant: number
  ) {
    this.appréciation = appréciation;
    this.file = file;
    this.encadrant = encadrant;
    this.etudiant = etudiant;
  }

  public async save() {
    const data = new FormData();
    data.append("appreciation", this.appréciation);
    data.append("file", this.file);
    data.append("encadrant", `${this.encadrant}`);
    data.append("etudiant", `${this.etudiant}`);

    const res = await axios.post(`http://localhost:3000/api/aatest1`, data, {
      headers: { "content-type": "multipart/form-data" },
    });
    return res;
  }

  static async getallappreciations() {
    const res = await axios.get(`http://localhost:3000/api/getallapprecs`);
    return res;
  }
}
