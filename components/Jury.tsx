import { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Rapport from "../classes/Rapport";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import TextField from "@mui/material/TextField";

const etudListStages = () => {
  const [stages, setStages] = useState([]);
  const [open, setOpen] = useState(false);
  const [etudiant, setEtudiant] = useState();

  useEffect(() => {
    const getAllRaports = async () => {
      const result = await Rapport.get_all_rapports();
      setStages(result.data);
    };
    getAllRaports();
  }, []);

  const onSubmit = async (e: any) => {
    e.preventDefault();
    const rapport = new Rapport();
    const notef = document.getElementById("jury-note") as HTMLInputElement;
    const note = notef.value;

    rapport.note = +note;
    rapport.etudiant = etudiant;

    const res = await rapport.donnerNote();

    if (res.data.success) {
      setOpen(false);
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
      }}
    >
      <Dialog open={open} onClose={() => setOpen(false)}>
        <form
          style={{ display: "flex", flexDirection: "column", padding: "20px" }}
          onSubmit={onSubmit}
        >
          <TextField
            type="number"
            id="jury-note"
            label="Note"
            variant="standard"
          />
          <Button
            type="submit"
            style={{ marginTop: "30px" }}
            variant="contained"
          >
            Submit
          </Button>
        </form>
      </Dialog>
      <Table
        style={{ width: "50%", margin: "0 auto" }}
        sx={{ minWidth: 650 }}
        aria-label="simple table"
      >
        <TableHead style={{ backgroundColor: "#2980b9" }}>
          <TableRow style={{ borderRadius: "5px" }}>
            <TableCell style={{ color: "#fff" }}>Etudiant</TableCell>
            <TableCell style={{ color: "#fff" }}>File</TableCell>
            <TableCell style={{ color: "#fff" }}>Note</TableCell>
            <TableCell style={{ color: "#fff" }}>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {stages.map((row: any) => (
            <TableRow
              key={row.num}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell style={{ color: "#bdc3c7" }}>{row.etudiant}</TableCell>
              <TableCell
                onClick={() => {
                  window.open(`/${row.file}`, "blank");
                }}
                style={{
                  cursor: "pointer",
                  color: "#bdc3c7",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    color: "#f39c12",
                  }}
                >
                  File <ArrowForwardIosRoundedIcon fontSize="small" />
                </div>
              </TableCell>
              <TableCell style={{ color: "#bdc3c7" }}>
                {row.note ? row.note + " / 20" : "-"}
              </TableCell>
              <TableCell
                onClick={() => {
                  setEtudiant(row.etudiant);
                  setOpen(true);
                }}
                style={{ color: "#3498db", cursor: "pointer" }}
              >
                Affecter note
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default etudListStages;
