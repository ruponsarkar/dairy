const { application } = require("express");
const { uuid } = require("uuidv4");
const db = require("./index");
const async = require("async");
const _ = require("underscore");
const { resolve } = require("path");
const { reject } = require("underscore");
const moment = require("moment");


// data base create query (MySql) 
// CREATE TABLE admins (
//     id INT AUTO_INCREMENT PRIMARY KEY,
//     name VARCHAR(100),
//     mobileNumber VARCHAR(15),
//     email VARCHAR(100) UNIQUE,
//     role VARCHAR(50),
//     district VARCHAR(50),
//     password VARCHAR(255),
//     status ENUM('Active', 'Inactive') NOT NULL
//   );
  

module.exports = {
  addOrUpdateAdmin(form, callback) {
    let insertQuery = `
  INSERT INTO admins (name, mobileNumber, email, role, district, password, status) 
  VALUES (?, ?, ?, ?, ?, ?, ?)
  ON DUPLICATE KEY UPDATE 
    name = VALUES(name),
    mobileNumber = VALUES(mobileNumber),
    role = VALUES(role),
    district = VALUES(district),
    password = VALUES(password),
    status = VALUES(status)
`;

    let params = [
      form.name,
      form.mobileNumber,
      form.email,
      form.role,
      form.district,
      form.password,
      form.status,
    ];

    let message = {};
    db.query(insertQuery, params, (err, result) => {
      if (err) {
        console.error("Database error:", err);
        message = {
          status: 400,
          message: "failed",
        };
      } else {
        message = {
          status: 200,
          message: "success",
        };
      }
      callback && callback(message);
    });
  },

  getAdmins(callback) {
    let query = `SELECT * FROM admins`;
    let message = {};
    db.query(query, (err, result) => {
      console.log(err);
      if (!err) {
        message = {
          status: 200,
          message: result,
        };
        callback && callback(message);
      } else {
        message = {
          status: 400,
          message: "failed",
        };
        callback && callback(message);
      }
    });
  },
};
