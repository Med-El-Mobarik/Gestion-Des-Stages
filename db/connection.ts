const mysql = require("mysql");

export const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "uml",
});

// export const connection = () => {
//   con.connect((err: any) => {
//     if (err) {
//       console.log("Database not Connected :(");
//     } else {
//       console.log("Connection was successfull");
//     }
//   });
  
// };