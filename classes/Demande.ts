// import Etudiant from "./Etudiant";
// import Responsable from "./Responsable";
import axios from "axios";

export default class Demande {
  num: number | null | undefined;
  objet: string | undefined;
  etudiant: number | undefined;
  responsable: number | undefined;

  constructor(
    num: number | null,
    objet: string,
    etudiant: number | undefined,
    responsable: number | undefined
  ) {
    this.num = num;
    this.objet = objet;
    this.etudiant = etudiant;
    this.responsable = responsable;
  }

  public async enregistrer() {
    const res = await axios.get(
      `http://localhost:3000/api/enrdemande?objet=${this.objet}&etud=${this.etudiant}&respo=${this.responsable}`
    );
    return res.data;
  }

  static async getDmdPerEtud(etudiant: number) {
    const res = await axios.get(
      `http://localhost:3000/api/dmdPerEtud?etud=${etudiant}`
    );
    return res;
  }

  public async getDmdPerRespo() {
    const res = await axios.get(
      `http://localhost:3000/api/dmdPerRespo?respo=${this.responsable}`
    );
    return res;
  }

  public async annulerDmd() {
    const res = await axios.get(
      `http://localhost:3000/api/annulerDmd?num=${this.num}`
    );
    return res;
  }

  public async accord() {
    const res = await axios.get(
      `http://localhost:3000/api/accord?num=${this.num}&acc=Oui`
    );
    return res;
  }

  public async refus() {
    const res = await axios.get(
      `http://localhost:3000/api/refus?num=${this.num}&acc=Non`
    );
    return res;
  }
}
