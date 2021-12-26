import React from "react";
import Menu from "../components/Menu";
import { con } from "../db/connection";

const index = () => {
  return (
    <div>
      <Menu
        title="Main Page"
        menu={["Responsable", "Espace_Etudiant", "Jury", "Encadrant Externe"]}
      />
    </div>
  );
};

// export async function getServerSideProps() {
//   con.connect((err: any) => {
//     if (err) {
//       console.log("Connection wasn't successful");
//     } else {
//       console.log("Connection Was Successful");
//     }
//   });

//   return { props: {} };
// }

export default index;
