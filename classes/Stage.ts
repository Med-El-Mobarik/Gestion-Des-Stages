import axios from "axios";

export default class Stage {
  num: number;
  lieu: string;
  date_dep: string;
  date_fin: string;
  sujet: string;

  constructor(lieu: string, sujet: string, date_dep: string, date_fin: string) {
    this.lieu = lieu;
    this.sujet = sujet;
    this.date_dep = date_dep;
    this.date_fin = date_fin;
  }

  static async get_all_stages() {
    const res = await axios.get("http://localhost:3000/api/getStages");
    return res;
  }

  public async enregitrer() {
    const res = await axios.get(
      `http://localhost:3000/api/enregitreStage?sujet=${this.sujet}&lieu=${this.lieu}&deb=${this.date_dep}&fin=${this.date_fin}`
    );
    return res;
  }

  static async delete(num: number) {
    const res = await axios.get(
      `http://localhost:3000/api/deletestage?num=${num}`
    );
    return res;
  }

  public async update(num: number) {
    const res = await axios.get(
      `http://localhost:3000/api/updatestage?num=${num}&lieu=${this.lieu}&sujet=${this.sujet}&date_dep=${this.date_dep}&date_fin=${this.date_fin}`
    );
    return res;
  }

  static async affecter(etudiant: number, num: number) {
    const res = await axios.get(
      `http://localhost:3000/api/affecterstage?num=${num}&etudiant=${etudiant}`
    );
    return res;
  }

  static async stagesaffected(etudiant: number) {
    const res = await axios.get(
      `http://localhost:3000/api/stagesaffected?etudiant=${etudiant}`
    );
    return res;
  }

  static async report(num: number) {
    const res = await axios.get(`http://localhost:3000/api/report?num=${num}`);
    return res;
  }

  static async desaffecter(num: number) {
    const res = await axios.get(
      `http://localhost:3000/api/desaffecter?num=${num}`
    );
    return res;
  }
}
