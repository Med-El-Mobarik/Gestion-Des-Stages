import { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
// import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import classes from "./ResoiStages.module.scss";
import Stage from "../classes/Stage";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import TextField from "@mui/material/TextField";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";

const etudListStages = () => {
  const [stages, setStages] = useState([]);
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [editElem, seteditElem] = useState();

  useEffect(() => {
    const getallStages = async () => {
      const result = await Stage.get_all_stages();
      setStages(result.data);
    };
    getallStages();
  }, []);

  const onSubmit = async (e: any) => {
    e.preventDefault();
    const lieuf = document.getElementById("stage-lieu") as HTMLInputElement;
    const sujetf = document.getElementById("stage-sujet") as HTMLInputElement;
    const debf = document.getElementById("stage-deb") as HTMLInputElement;
    const finf = document.getElementById("stage-fin") as HTMLInputElement;

    const lieu = lieuf.value;
    const sujet = sujetf.value;
    const deb = debf.value;
    const fin = finf.value;

    const stage = new Stage(lieu, sujet, deb, fin);
    const res = await stage.enregitrer();
    if (res.data.success) {
      alert("Stage est ajouté");
      location.reload();
    }
  };

  const deleteStage = async (num: number) => {
    const res = await Stage.delete(num);
    if (res.data.success) {
      alert("stage deleted successfully!");
      location.reload();
    }
  };

  const openEdit = async (num: number) => {
    const elem = stages.find((e: any) => e.num == num);
    seteditElem(elem);
    console.log(elem);
    setEditOpen(true);
  };

  const editStage = async (e: any) => {
    e.preventDefault();

    const lieuf = document.getElementById("edit-lieu") as HTMLInputElement;
    const sujetf = document.getElementById("edit-sujet") as HTMLInputElement;
    const debf = document.getElementById("edit-deb") as HTMLInputElement;
    const finf = document.getElementById("edit-fin") as HTMLInputElement;

    const lieu = lieuf.value;
    const sujet = sujetf.value;
    const deb = debf.value;
    const fin = finf.value;

    const stage = new Stage(lieu, sujet, deb, fin);
    const res = await stage.update(editElem.num);
    if (res.data.success) {
      alert("Stage a été modifié!");
      location.reload();
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
      <Dialog open={open} onClose={() => setOpen(false)}>
        <form onSubmit={onSubmit} className={classes.form}>
          <TextField id="stage-lieu" label="Lieu" variant="standard" />
          <TextField id="stage-sujet" label="Sujet" variant="standard" />
          <TextField
            defaultValue="2022-01-01"
            type="date"
            id="stage-deb"
            label="Date Debut"
            variant="standard"
          />
          <TextField
            defaultValue="2022-01-01"
            type="date"
            id="stage-fin"
            label="Date Fin"
            variant="standard"
          />
          <Button
            style={{ marginTop: "20px" }}
            type="submit"
            variant="contained"
          >
            Submit
          </Button>
        </form>
      </Dialog>
      {editElem && (
        <Dialog open={editOpen} onClose={() => setEditOpen(false)}>
          <form onSubmit={editStage} className={classes.form}>
            <TextField
              defaultValue={editElem.lieu}
              id="edit-lieu"
              label="Lieu"
              variant="standard"
            />
            <TextField
              defaultValue={editElem.sujet}
              id="edit-sujet"
              label="Sujet"
              variant="standard"
            />
            <TextField
              defaultValue={editElem.date_deb}
              type="date"
              id="edit-deb"
              label="Date Debut"
              variant="standard"
            />
            <TextField
              defaultValue={editElem.date_fin}
              type="date"
              id="edit-fin"
              label="Date Fin"
              variant="standard"
            />
            <Button
              style={{ marginTop: "20px" }}
              type="submit"
              variant="contained"
            >
              Submit
            </Button>
          </form>
        </Dialog>
      )}
      <Table
        style={{ width: "60%", margin: "0 auto" }}
        sx={{ minWidth: 650 }}
        aria-label="simple table"
      >
        <TableHead style={{ backgroundColor: "#2980b9" }}>
          <TableRow style={{ borderRadius: "5px" }}>
            <TableCell style={{ color: "#fff" }}>Num</TableCell>
            <TableCell style={{ color: "#fff" }}>Lieu</TableCell>
            <TableCell style={{ color: "#fff" }}>Sujet</TableCell>
            <TableCell style={{ color: "#fff" }}>Date_Dep</TableCell>
            <TableCell style={{ color: "#fff" }}>Date_fin</TableCell>
            <TableCell style={{ color: "#fff" }}>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {stages.map((row: any) => (
            <TableRow
              key={row.num}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell style={{ color: "#bdc3c7" }}>{row.num}</TableCell>
              <TableCell style={{ color: "#bdc3c7" }}>{row.lieu}</TableCell>
              <TableCell style={{ color: "#bdc3c7" }}>{row.sujet}</TableCell>
              <TableCell style={{ color: "#bdc3c7" }}>{row.date_deb}</TableCell>
              <TableCell style={{ color: "#bdc3c7" }}>{row.date_fin}</TableCell>
              <TableCell style={{ color: "#bdc3c7" }}>
                <DeleteRoundedIcon
                  style={{ cursor: "pointer", color: "tomato" }}
                  onClick={() => deleteStage(row.num)}
                />{" "}
                <EditRoundedIcon
                  onClick={() => openEdit(row.num)}
                  style={{ cursor: "pointer", color: "#2980b9" }}
                />{" "}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Button
        onClick={() => setOpen(true)}
        style={{ marginTop: "30px" }}
        variant="contained"
      >
        Ajouter Stage
      </Button>
    </div>
  );
};

export default etudListStages;
