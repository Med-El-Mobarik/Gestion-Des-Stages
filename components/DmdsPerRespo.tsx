import { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
// import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
// import classes from "./etudListStages.module.scss";
import Demande from "../classes/Demande";
import Stage from "../classes/Stage";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

const etudListStages = () => {
  const [demandes, setDemandes] = useState([]);
  const [name, setName] = useState("");
  const [stages, setStages] = useState([]);
  const [student, setStudent] = useState<number>();
  const [open, setOpen] = useState(false);
  const [stage, setStage] = useState(1);

  useEffect(() => {
    const getlocal = () => {
      const item = localStorage.getItem("responsable");
      if (item) {
        const content = JSON.parse(item);
        return [`${content.nom} ${content.prenom}`, content.num];
      }
    };

    const getallStages = async () => {
      const result = await Stage.get_all_stages();
      setStages(result.data);
    };
    getallStages();

    const etudiant = getlocal();
    if (etudiant) {
      setName(etudiant[0]);
      const getDmdPerRespo = async () => {
        const demande = new Demande(null, "", undefined, +etudiant[1]);
        const result = await demande.getDmdPerRespo();
        setDemandes(result.data);
      };
      getDmdPerRespo();
    }
  }, []);

  const openAffect = (etudiant: number) => {
    setStudent(etudiant);
    setOpen(true);
  };

  //   const annulerDmd = async (num: number) => {
  //     const demande = new Demande(num, "", undefined, undefined);
  //     const res = await demande.annulerDmd();
  //     if (res.data.success) {
  //       alert("Demmande est annulée");
  //       setDemandes((prev) => {
  //         const newdmds = prev.filter((e: any) => e.num !== num);
  //         return newdmds;
  //       });
  //     }
  //   };

  const DmdAccord = async (num: number) => {
    const demande = new Demande(num, "", undefined, undefined);
    const res = await demande.accord();
    if (res.data.success) {
      alert(`Vous avez met l'accord sur La demande ${num}`);
      location.reload();
    }
  };
  const DmdRefus = async (num: number) => {
    const demande = new Demande(num, "", undefined, undefined);
    const res = await demande.refus();
    if (res.data.success) {
      alert(`Vous avez refus La demande ${num}`);
      location.reload();
    }
  };
  const showAccord = (accord: string) => {
    if (accord === "") {
      return <div>Pas Encore</div>;
    } else if (accord === "Oui") {
      return <div style={{ color: "#2ecc71" }}>Oui</div>;
    } else {
      return <div style={{ color: "#e74c3c" }}>Non</div>;
    }
  };
  const handleChange = (event: SelectChangeEvent) => {
    setStage(event.target.value as string);
  };
  const onSubmit = async (e: any) => {
    e.preventDefault();
    const res = await Stage.affecter(student, stage);
    if (res.data.success) {
      alert("Stage affected successfully");
      setOpen(false);
    } else {
      alert("something went wrong!");
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
      <h1 style={{ marginBottom: "40px", color: "#bdc3c7" }}>
        Les Demandes affectées au Mr.{name}
      </h1>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <form
          onSubmit={onSubmit}
          style={{
            width: "600px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "30px",
          }}
        >
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Stage</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={stage}
              label="Stage"
              onChange={handleChange}
            >
              {stages.map((e) => (
                <MenuItem key={e.num} value={e.num}>
                  {e.sujet}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button
            style={{ marginTop: "20px" }}
            type="submit"
            variant="contained"
          >
            Submit
          </Button>
        </form>
      </Dialog>
      <Table
        style={{ width: "60%", margin: "0 auto" }}
        sx={{ minWidth: 650 }}
        aria-label="simple table"
      >
        <TableHead style={{ backgroundColor: "#2980b9" }}>
          <TableRow style={{ borderRadius: "5px" }}>
            <TableCell style={{ color: "#fff" }}>Num</TableCell>
            <TableCell style={{ color: "#fff" }}>Objet</TableCell>
            <TableCell style={{ color: "#fff" }}>Etudiant</TableCell>
            <TableCell align="center" style={{ color: "#fff" }}>
              Accord
            </TableCell>
            <TableCell style={{ color: "#fff" }}>Action</TableCell>
            <TableCell style={{ color: "#fff" }}>Affecter</TableCell>
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
              <TableCell style={{ color: "#bdc3c7" }}>{row.etudiant}</TableCell>
              <TableCell style={{ color: "#bdc3c7" }} align="center">
                {showAccord(row.accord)}
              </TableCell>
              <TableCell
              // style={{ color: "#bdc3c7", display: "flex" }}
              // onClick={() => annulerDmd(row.num)}
              // style={{ display: "flex" }}
              >
                <div
                  onClick={() => DmdAccord(row.num)}
                  style={{ cursor: "pointer", color: "#2ecc71" }}
                >
                  Oui
                </div>
                &nbsp;---
                <div
                  onClick={() => DmdRefus(row.num)}
                  style={{ cursor: "pointer", color: "#e74c3c" }}
                >
                  Non
                </div>
              </TableCell>
              <TableCell style={{ color: "#bdc3c7" }}>
                {row.accord !== "Oui" ? (
                  "-"
                ) : (
                  <div
                    onClick={() => openAffect(row.etudiant)}
                    style={{ color: "#3498db", cursor: "pointer" }}
                  >
                    Affecter Stage
                  </div>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default etudListStages;
