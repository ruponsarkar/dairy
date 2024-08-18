const { application } = require("express");
const { uuid } = require("uuidv4");
const db = require("./index");
const async = require("async");
const _ = require("underscore");
const { resolve } = require("path");
const { reject } = require("underscore");
const moment = require("moment");
const jwt = require("jsonwebtoken");

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
  authenticate(email, password, callback) {
    let selectQuery = `SELECT id, uid, name, mobileNumber, email, role, district FROM admins WHERE email=? AND password=? AND status='Active'`;
    let response = {};
    db.query(selectQuery, [email, password], (err, result) => {
      if (!err) {
        if(result.length>=1){
          response = {
            status: 200,
            authenticated: true,
            token: generateAccessToken(result[0].email),
            data: result[0],
            message: "Found",
          };
        } else {
          response = {
            status: 200,
            authenticated: false,
            data: [],
            message: "Not found",
          };
        }
        callback && callback(response);
      } else {
        response = {
          status: 400,
          authenticated: false,
          data: [],
          message: "Failed",
        };
        callback && callback(response);
      }
    });
  },

  addOrUpdateAdmin(form, callback) {

    console.log("form ==>", form);


    let insertQuery = `
  INSERT INTO admins (uid, name, mobileNumber, email, role, district, password, status) 
  VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  ON DUPLICATE KEY UPDATE 
    name = VALUES(name),
    mobileNumber = VALUES(mobileNumber),
    role = VALUES(role),
    district = VALUES(district),
    password = VALUES(password),
    status = VALUES(status)
`;
    let uid = Date.now();

    let params = [
      uid,
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

  createDCS(form, callback) {
    let uid = Date.now();

    let dcsQuery = `
    INSERT INTO dcs (uid, name, registration_no, district, address, status) 
    VALUES (?, ?, ?, ?, ?, ?)
  `;

    let dcsparams = [
      uid,
      form.name,
      form.registration_no,
      form.district,
      form.address,
      form.status,
    ];

    db.query(dcsQuery, dcsparams, (err, result) => {
      if (err) {
        console.error("Database error:", err);
        callback && callback({
          status: 400,
          message: "failed"
        });
        return; // Exit early on error
      }

      let insertQuery = `
        INSERT INTO admins (uid, name, mobileNumber, email, role, district, password, status) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        ON DUPLICATE KEY UPDATE 
          name = VALUES(name),
          mobileNumber = VALUES(mobileNumber),
          role = VALUES(role),
          district = VALUES(district),
          password = VALUES(password),
          status = VALUES(status)
      `;
      let params = [
        uid,
        form.name,
        null,
        uid,
        "DCS",
        null,
        form.password,
        form.status,
      ];

      db.query(insertQuery, params, (err, result) => {
        let message = {};
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
    });
  },

  getAllDCS(callback) {
    let query = `
    SELECT * FROM dcs WHERE status = 1
  `;

    db.query(query, (err, results) => {
        if (err) {
            console.error("Database error:", err);
            callback && callback({
                status: 400,
                message: "failed",
                data: null
            });
        } else {
            callback && callback({
                status: 200,
                message: "success",
                data: results
            });
        }
    });
}





};

function generateAccessToken(username) {
  return jwt.sign({ name: username }, process.env.TOKEN_SECRET, {
    expiresIn: 60 * 60,
  });
}
