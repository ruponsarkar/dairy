const { application } = require("express");
const { uuid } = require("uuidv4");
const db = require("./index");
const async = require("async");
const _ = require("underscore");
const { resolve } = require("path");
const { reject } = require("underscore");
const moment = require("moment");

module.exports = {
  saveForm(form, callback) {
    console.log("==>>", form);
    let insertQuery = `INSERT INTO forms(applicationId, mobileNumber, name, fathersName, gender, dob, aadhaarNo, aadharMobile, pan_number, voterID, area, district, LAC, village, gaon_panchayat, block, pincode, police_station, name_of_co_operatice_society, addree_of_co_operatice_society, bank_name, bank_account_holder_name, bank_account_no, ifsc_code, status)  VALUES ?`;
    let id = uuid();
    let params = [];
    params.push(id);
    // params.push(form.applicationId);
    params.push(form.mobileNumber);
    params.push(form.name);
    params.push(form.fatherName);
    params.push(form.gender);
    params.push(form.dob);
    params.push(form.aadhaarNo);
    params.push(form.aadharMobile);
    params.push(form.pan_nameber);
    params.push(form.voterID);
    params.push(form.area);
    params.push(form.district);
    params.push(form.LAC);
    params.push(form.village);
    params.push(form.gaon_panchayat);
    params.push(form.block);
    params.push(form.pincode);
    params.push(form.police_station);
    params.push(form.name_of_co_operatice_society);
    params.push(form.addree_of_co_operatice_society);
    params.push(form.bank_name);
    params.push(form.bank_account_holder_name);
    params.push(form.bank_account_no);
    params.push(form.ifsc_code);
    params.push("A");

    let message = {};
    db.query(insertQuery, [[params]], (err, result) => {
      console.log(err);
      if (!err) {
        message = {
          status: 200,
          message: "success",
          applicationId: id,
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
  getFormByMobileNumber(mobileNumber, callback) {
    let selectQuery = `SELECT * FROM forms WHERE mobileNumber = ? AND status='A';`;

    db.query(selectQuery, [mobileNumber], (err, res) => {
      if (!err) {
        if (res.length != 0) {
          return (
            callback &&
            callback({ status: 200, message: "success", data: res[0] })
          );
        } else {
          return (
            callback &&
            callback({ status: 200, message: "success", data: null })
          );
        }
      } else {
        return (
          callback && callback({ status: 200, message: "success", data: null })
        );
      }
    });
  },


  
};
