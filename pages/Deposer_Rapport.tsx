import { useCallback, useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import Button from "@mui/material/Button";
import Etudiant from "../classes/Etudiant";

const Deposer_Rapport = () => {
  const [file, setFile] = useState();
  const [etud, setEtud] = useState<number>();

  useEffect(() => {
    const getlocal = () => {
      const item = localStorage.getItem("etudiant");
      if (item) {
        const content = JSON.parse(item);
        return content.num;
      }
    };

    const etudiant = getlocal();
    setEtud(+etudiant);
  }, []);

  const onDrop = useCallback((acceptedFiles) => {
    setFile(acceptedFiles[0]);
    console.log(acceptedFiles[0]);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const onClick = async () => {
    const etudiant = new Etudiant(etud);
    const res = await etudiant.deposer(file);
    if (res.data.success) {
      alert("Rapport Uploaded!");
    }
  };

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          backgroundColor: "#ecf0f1",
          width: "50%",
          height: "30%",
          borderRadius: "5px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
        {...getRootProps()}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <p style={{ fontSize: "22px" }}>
              Glisser Et Déposer Ton Rapport ici! <br />
            </p>
            <div
              style={{ color: "#7f8c8d", marginTop: "20px", fontSize: "18px" }}
            >
              {file ? (file.name ? `(${file.name})` : "") : ""}
            </div>
          </div>
        )}
      </div>
      {file && (
        <Button
          onClick={onClick}
          style={{ marginTop: "20px", padding: "15px 60px" }}
          variant="contained"
        >
          Submit
        </Button>
      )}
    </div>
  );
};

export default Deposer_Rapport;
