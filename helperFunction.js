// let dbParams = {};
// if (process.env.DATABASE_URL) {
//   dbParams.connectionString = process.env.DATABASE_URL;
// } else {
//   dbParams = {
//     host: process.env.DB_HOST,
//     port: process.env.DB_PORT,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASS,
//     database: process.env.DB_NAME
//   };
// }

// const getUserWithEmail = function(email) {
//   return db
//     .query(`SELECT * FROM users WHERE email = $1;`, [email])
//     .then(res => {
//       return res.rows[0];
//     })
//     .catch(err => err);
// };

const moment = require("moment");

const momentFunction = function(milliseconds) {
  return moment(milliseconds).format();
};

module.exports = momentFunction;
