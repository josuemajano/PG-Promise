const pgp = require("pg-promise")(); // import pg-promise library
const db = pgp("postgres://localhost:5432/todo_app");  // create a variable to represent our database connection

db.any("SELECT * from TASKS").then((tasks) => console.log(tasks));