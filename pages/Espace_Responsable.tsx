import Menu from "../components/Menu";
import { useEffect, useState } from "react";

const Etudiant = () => {
  const [name, setName] = useState("");

  useEffect(() => {
    const getlocal = () => {
      const item = localStorage.getItem("responsable");
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
          "Consulter_Les_Demandes",
          "Les_Stages",
          "Les_Encadrants",
          "Les_Rapports",
          "Issues",
        ]}
      />
    </div>
  );
};

export default Etudiant;
