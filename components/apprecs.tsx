import { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Result from "../classes/Result";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";

const etudListStages = () => {
  const [stages, setStages] = useState([]);

  useEffect(() => {
    const getallappresc = async () => {
      const result = await Result.getallappreciations();
      setStages(result.data);
    };
    getallappresc();
  }, []);

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
            <TableCell style={{ color: "#fff" }}>Encadrant</TableCell>
            <TableCell style={{ color: "#fff" }}>Etudiant</TableCell>
            <TableCell style={{ color: "#fff" }}>Appréciation</TableCell>
            <TableCell style={{ color: "#fff" }}>File</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {stages.map((row: any) => (
            <TableRow
              key={row.num}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell style={{ color: "#bdc3c7" }}>
                {row.encadrant}
              </TableCell>
              <TableCell style={{ color: "#bdc3c7" }}>{row.etudiant}</TableCell>
              <TableCell style={{ color: "#bdc3c7" }}>
                {row.appreciation}
              </TableCell>
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
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default etudListStages;
