import Personne from "./Personne";
import axios from "axios";
import Result from "./Result";

export default class Encadrant extends Personne {
  public async enregistrerApprec(
    appréciation: string,
    file: File,
    etudiant: number
  ) {
    const result = new Result(appréciation, file, this.num, etudiant);
    const res = await result.save();
    return res;
  }
}
