import axios from "axios";

export default class Rapport {
  public etudiant: number;
  file: File;
  public note: number;

  public async save() {
    const data = new FormData();
    data.append("etudiant", `${this.etudiant}`);
    data.append("file", this.file);
    const res = await axios.post(`http://localhost:3000/api/deposer`, data);
    return res;
  }

  static async get_all_rapports() {
    const res = await axios.get("http://localhost:3000/api/getRapports");
    return res;
  }

  public async donnerNote() {
    const res = await axios.get(
      `http://localhost:3000/api/donnerNote?note=${this.note}&etudiant=${this.etudiant}`
    );
    return res;
  }
}
