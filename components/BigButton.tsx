import classes from "./BigButton.module.scss";
import { useRouter } from "next/router";

interface Props {
  text: string;
}

const BigButton = (props: Props) => {
  const { text } = props;

  const router = useRouter();

  const onClick = (text: string) => {
    if (text === "Espace_Etudiant") {
      router.push("login_etudiant");
    } else if (text === "Responsable") {
      router.push("login_responsable");
    } else if (text === "Encadrant Externe") {
      router.push("login_encadrant")
    } else {
      router.push(text);
    }
  };

  return (
    <div onClick={() => onClick(text)} className={classes.elem}>
      {text} &gt;
    </div>
  );
};

export default BigButton;
