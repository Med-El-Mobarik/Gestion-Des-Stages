import Menu from "../components/Menu";
import { useEffect, useState } from "react";

const Etudiant = () => {
  const [name, setName] = useState("");

  useEffect(() => {
    const getlocal = () => {
      const item = localStorage.getItem("etudiant");
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
      <Menu
        title={name}
        menu={[
          "Demander_Stage",
          "Consulter_Lists_Des_Stages",
          "Mes_Demandes",
          "Stages_Affectees",
          "Deposer_Rapport",
        ]}
      />
    </div>
  );
};

export default Etudiant;
