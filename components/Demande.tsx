import { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Button from "@mui/material/Button";
import classes from "./Demance.module.scss";
import dmd from "../classes/Demande";

const Demande = () => {
  const [respo, setRespo] = useState("");
  const [name, setName] = useState("");
  const [num, setNum] = useState();

  useEffect(() => {
    const getlocal = () => {
      const item = localStorage.getItem("etudiant");
      if (item) {
        const content = JSON.parse(item);
        return [`${content.nom} ${content.prenom}`, content.num];
      }
    };

    const etud = getlocal();
    if (etud) {
      setName(etud[0]);
      setNum(etud[1]);
    }
  }, []);

  const handleChange = (event: SelectChangeEvent) => {
    setRespo(event.target.value as string);
  };

  const onSubmit = async (e: any) => {
    e.preventDefault();
    const objetf = document.getElementById("dmd-objet") as HTMLInputElement;
    const objet = objetf.value;

    const demande = new dmd(null, objet, num, +respo);

    const success = await demande.enregistrer();
    if (success.success) {
      alert("La demande est enregitré");
    }
  };

  return (
    <div className={classes.main}>
      <form onSubmit={onSubmit}>
        <h1 style={{ color: "#9b59b6" }}>{name}</h1>
        <TextField
          id="dmd-objet"
          fullWidth
          style={{ marginBottom: "20px" }}
          label="Objectif"
          variant="standard"
        />
        <InputLabel id="demo-simple-select-label">Responsable</InputLabel>
        <Select
          fullWidth
          labelId="demo-simple-select-label"
          value={respo}
          label="Responsable"
          onChange={handleChange}
        >
          <MenuItem value={1}>Responsable 1</MenuItem>
          <MenuItem value={2}>Responsable 2</MenuItem>
        </Select>
        <Button
          style={{
            marginTop: "20px",
            paddingTop: "15px",
            paddingBottom: "15px",
          }}
          variant="contained"
          type="submit"
        >
          Submit Demande
        </Button>
      </form>
    </div>
  );
};

export default Demande;
