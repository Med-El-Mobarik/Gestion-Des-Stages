import TextField from "@mui/material/TextField";
import classes from "./Login.module.scss";
import Button from "@mui/material/Button";
import axios from "axios";
import { useRouter } from "next/router";

const Login = () => {
  const router = useRouter();

  const onSubmit = async (e: any) => {
    e.preventDefault();
    const numf = document.getElementById("etud-num") as HTMLInputElement;
    const passf = document.getElementById("etud-pass") as HTMLInputElement;
    const num = numf.value;
    const pass = passf.value;

    const res = await axios.get(
      `http://localhost:3000/api/loginrespo?num=${num}`
    );

    if (res.data.length === 0) {
      alert("Numéro de responsable est invalid");
    } else if (pass !== res.data[0].password) {
      alert("Mot de pass invalid");
    } else {
      localStorage.setItem(
        "responsable",
        JSON.stringify({
          num: num,
          nom: res.data[0].nom,
          prenom: res.data[0].prenom,
        })
      );
      router.push("Espace_Responsable");
    }
  };

  return (
    <div className={classes.box}>
      <form onSubmit={onSubmit}>
        <h1>Espace Responsable</h1>
        <TextField
          className={classes.field}
          id="etud-num"
          fullWidth
          label="Numéro"
          variant="standard"
        />
        <TextField
          className={classes.field}
          id="etud-pass"
          type="password"
          fullWidth
          label="Password"
          variant="standard"
        />
        <Button
          type="submit"
          className={classes.button}
          fullWidth
          variant="contained"
        >
          Login
        </Button>
      </form>
    </div>
  );
};

export default Login;
