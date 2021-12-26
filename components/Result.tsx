import classes from "./Result.module.scss";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import Encadrant from "../classes/Encadrant";

const Result = () => {
  const [file, setFile] = useState();
  const [data, setData] = useState<any[] | undefined>([]);

  useEffect(() => {
    const getlocal = () => {
      const item = localStorage.getItem("encadrant");
      if (item) {
        const content = JSON.parse(item);
        return [content.num, content.etudiant];
      }
    };

    const encadrant = getlocal();
    setData(encadrant);
  }, []);

  const onFileChange = (event: any) => {
    // Update the state
    setFile(event.target.files[0]);
  };

  const onSubmit = async (e: any) => {
    e.preventDefault();
    const apprecf = document.getElementById("appreciation") as HTMLInputElement;
    const apprec = apprecf.value;

    const encadrant = new Encadrant(+data[0]);
    const res = await encadrant.enregistrerApprec(apprec, file, +data[1]);
    if (res.data.success) {
      alert("Appréciation enregistrée");
    }
  };

  return (
    <div className={classes.container}>
      <form onSubmit={onSubmit}>
        <TextField
          //   className={classes.field}
          fullWidth
          label="Appréciation"
          variant="standard"
          id="appreciation"
        />
        <input type="file" name="file" onChange={onFileChange} />
        <Button className={classes.btn} type="submit">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default Result;
