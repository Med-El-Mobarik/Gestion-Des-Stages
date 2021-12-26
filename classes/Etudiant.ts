import Personne from "./Personne"
import Rapport from './Rapport';

export default class Etudiant extends Personne{
    public async deposer(file: File) {
        const rapport = new Rapport();
        rapport.etudiant = this.num;
        rapport.file = file;

        const res = await rapport.save();
        return res;
    }
}