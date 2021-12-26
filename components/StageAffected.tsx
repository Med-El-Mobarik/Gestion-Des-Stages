import { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
// import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
// import classes from "./etudListStages.module.scss";
import Stage from "../classes/Stage";

const etudListStages = () => {
  const [stages, setStages] = useState([]);

  useEffect(() => {
    const getlocal = () => {
      const item = localStorage.getItem("etudiant");
      if (item) {
        const content = JSON.parse(item);
        return [`${content.nom} ${content.prenom}`, content.num];
      }
    };

    const etudiant = getlocal();

    const getallStages = async () => {
      const result = await Stage.stagesaffected(+etudiant[1]);
      setStages(result.data);
    };
    getallStages();
  }, []);

  const report = async (num: number) => {
    const res = await Stage.report(num);
    if (res.data.success) {
      alert("Report Was Successful!");
    } else {
      alert("Something Went Wrong!");
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
      <Table
        style={{ width: "60%", margin: "0 auto" }}
        sx={{ minWidth: 650 }}
        aria-label="simple table"
      >
        <TableHead style={{ backgroundColor: "#2980b9" }}>
          <TableRow style={{ borderRadius: "5px" }}>
            <TableCell style={{ color: "#fff" }}>Num</TableCell>
            <TableCell style={{ color: "#fff" }}>Lieu</TableCell>
            <TableCell style={{ color: "#fff" }}>sujet</TableCell>
            <TableCell style={{ color: "#fff" }}>Date_Dep</TableCell>
            <TableCell style={{ color: "#fff" }}>Date_fin</TableCell>
            <TableCell style={{ color: "#fff" }}>Report</TableCell>
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
              <TableCell
                onClick={() => report(row.num)}
                style={{ color: "tomato", cursor: "pointer" }}
              >
                Report
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default etudListStages;
