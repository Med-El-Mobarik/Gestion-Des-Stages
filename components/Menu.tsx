import BigButton from "./BigButton";
import classes from "./Menu.module.scss";

interface Props {
  menu: string[];
  title: string | undefined;
}

const Menu = (props: Props) => {
  const { menu, title } = props;

  return (
    <div className={classes.menu}>
      <h1>{title}</h1>
      {menu.map((e, id) => (
        <BigButton key={id} text={e} />
      ))}
    </div>
  );
};

export default Menu;
