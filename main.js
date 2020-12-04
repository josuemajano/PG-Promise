const pgp = require('pg-promise')();
const db = pgp("postgres://username:password@host:port/database");

db.any("SELECT * from USERS").then((users) => console.log(users));