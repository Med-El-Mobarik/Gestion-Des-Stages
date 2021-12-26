import Menu from "../components/Menu";
import { useEffect, useState } from "react";

const Etudiant = () => {
  const [name, setName] = useState("");

  useEffect(() => {
    const getlocal = () => {
      const item = localStorage.getItem("encadrant");
      if (item) {
        const content = JSON.parse(item);
        return `${content.nom} ${content.prenom}`;
      }
    };

    const name = getlocal();
    if (name) {
      setName(name);
    }
  }, []);

  return (
    <div>
      <Menu title={`Mr. ${name}`} menu={["Donner_Resultat"]} />
    </div>
  );
};

export default Etudiant;
