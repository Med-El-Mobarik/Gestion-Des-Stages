import { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import classes from "./etudListStages.module.scss";
import Demande from "../classes/Demande";

const etudListStages = () => {
  const [demandes, setDemandes] = useState([]);
  const [name, setName] = useState("");

  useEffect(() => {
    const getlocal = () => {
      const item = localStorage.getItem("etudiant");
      if (item) {
        const content = JSON.parse(item);
        return [`${content.nom} ${content.prenom}`, content.num];
      }
    };

    const etudiant = getlocal();
    if (etudiant) {
      setName(etudiant[0]);
      const getDmdsPerEtud = async () => {
        const result = await Demande.getDmdPerEtud(+etudiant[1]);
        console.log(result.data);
        setDemandes(result.data);
      };
      getDmdsPerEtud();
    }
  }, []);

  const annulerDmd = async (num: number) => {
    const demande = new Demande(num, "", undefined, undefined);
    const res = await demande.annulerDmd();
    if (res.data.success) {
      alert("Demmande est annulée");
      setDemandes((prev) => {
        const newdmds = prev.filter((e: any) => e.num !== num);
        return newdmds;
      });
    }
  };

  const showAccord = (accord: string) => {
    if (accord === "") {
      return <div style={{ color: "#bdc3c7" }}>Pas Encore</div>;
    } else if (accord === "Oui") {
      return <div style={{ color: "#27ae60" }}>Oui</div>;
    } else {
      return <div style={{ color: "#e74c3c" }}>Non</div>;
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        flexDirection: "column",
      }}
    >
      <h1 style={{ color: "#bdc3c7", marginBottom: "40px" }}>
        Les Demandes Du {name}
      </h1>
      <Table
        style={{ width: "60%", margin: "0 auto" }}
        sx={{ minWidth: 650 }}
        aria-label="simple table"
      >
        <TableHead style={{ backgroundColor: "#2980b9" }}>
          <TableRow style={{ borderRadius: "5px" }}>
            <TableCell style={{ color: "#fff" }}>Num</TableCell>
            <TableCell style={{ color: "#fff" }}>Objet</TableCell>
            <TableCell style={{ color: "#fff" }}>Responsable</TableCell>
            <TableCell align="center" style={{ color: "#fff" }}>
              Accord
            </TableCell>
            <TableCell align="center" style={{ color: "#fff" }}>
              Actions
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {demandes.map((row: any) => (
            <TableRow
              key={row.num}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell style={{ color: "#bdc3c7" }}>{row.num}</TableCell>
              <TableCell style={{ color: "#bdc3c7" }}>{row.objet}</TableCell>
              <TableCell style={{ color: "#bdc3c7" }}>
                {row.responsable}
              </TableCell>
              <TableCell align="center">{showAccord(row.accord)}</TableCell>
              {row.accord === "Oui" ? (
                <TableCell></TableCell>
              ) : (
                <TableCell
                  align="center"
                  onClick={() => annulerDmd(row.num)}
                  style={{
                    backgroundColor: "#e74c3c",
                    color: "white",
                    cursor: "pointer",
                  }}
                >
                  Annuler
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default etudListStages;
