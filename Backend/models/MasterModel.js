const { application } = require("express");
const { uuid } = require("uuidv4");
const db = require("./index");
const async = require("async");
const _ = require("underscore");
const { resolve } = require("path");
const { reject } = require("underscore");
const moment = require("moment");

module.exports = {
  saveToMaster(form, callback) {
    console.log("==>>", form);

    // return "ha";
    let insertQuery = `INSERT INTO masters(applicationId, mobileNumber, name, fathersName, gender, dob, aadhaarNo, aadharMobile, pan_number, voterID, area, district, LAC, village, gaon_panchayat, block, pincode, police_station, name_of_co_operatice_society, addree_of_co_operatice_society, registration_no_of_co_operatice_society, bank_name, bank_account_holder_name, bank_account_no, ifsc_code, milk_production_per_month, status)  VALUES ?`;
    let id = uuid();
    let params = [];
    params.push(form.applicationId);
    // params.push(form.applicationId);
    params.push(form.mobileNumber);
    params.push(form.name);
    params.push(form.fathersName);
    params.push(form.gender);
    params.push(form.dob);
    params.push(form.aadhaarNo);
    params.push(form.aadharMobile);
    params.push(form.pan_number);
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
    params.push(form.registration_no_of_co_operatice_society);
    params.push(form.bank_name);
    params.push(form.bank_account_holder_name);
    params.push(form.bank_account_no);
    params.push(form.ifsc_code);
    params.push(form.milk_production_per_month);
    params.push("Approve");

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

  getMaster(data, callback) {
    console.log("FROM MODAL: ", data);
    let role = data.user.role;
    let district = data.user.district;
    let offset = data.offset;
    let limit = data.limit;
    let filterBy = data.filterBy;
    let filterData = data.filterData;
    console.log(
      "user=>: ",
      role,
      offset,
      limit,
      filterBy,
      filterData,
      district
    );

    let query = "";
    switch (role) {
      case "Super Admin":
        if (filterBy) {
          query = `SELECT * FROM masters WHERE ${filterBy} = '${filterData}'  ORDER BY id DESC LIMIT ${limit} OFFSET ${offset}  `;
          console.log("1=>", query);
        } else {
          query = `SELECT * FROM masters ORDER BY id DESC LIMIT ${limit} OFFSET ${offset}  `;
          console.log("2=>", query);
        }

        break;

      case "Admin":
        if (filterBy) {
          query = `SELECT * FROM masters WHERE ${filterBy} = '${filterData}' AND district= '${district}' ORDER BY id DESC LIMIT ${limit} OFFSET ${offset}  `;
          console.log("3=>", query);
        } else {
          query = `SELECT * FROM masters WHERE district = '${district}' ORDER BY id DESC LIMIT ${limit} OFFSET ${offset}  `;
          console.log("4=>", query);
        }
    }

    // return;
    // let query = `SELECT * FROM forms LIMIT ${limit} OFFSET ${offset}`;
    db.query(query, (err, res) => {
      if (err) {
        // Call the callback with an error response
        return (
          callback &&
          callback({
            status: 500,
            message: "Error executing query: " + err,
            data: null,
          })
        );
      }

      // Check if any rows were returned
      if (res.length !== 0) {
        // Call the callback with success and the result data
        return (
          callback && callback({ status: 200, message: "Success", data: res })
        );
      } else {
        // Call the callback with success but no data
        return (
          callback && callback({ status: 200, message: "Success", data: [] })
        );
      }
    });
  },

  async postMonthlyReport(data, month, amountPerLitter, callback) {
    const query = `INSERT INTO monthly_reports (applicationId, month, litter, amount, isApprove, paymentStatus) VALUES ?`;
    const batchSize = 100;
    let insertedLength = 0;

    for (let i = 0; i < data.length; i += batchSize) {
      const batch = data
        .slice(i, i + batchSize)
        .map((e) => [
          e.applicationId,
          month,
          e.litter,
          e.litter * amountPerLitter,
          "Approve",
          "Pending",
        ]);

      try {
        await db.query(query, [batch]);
        insertedLength += batch.length;
        console.log(`Batch ${Math.ceil((i + 1) / batchSize)} inserted.`);
      } catch (err) {
        console.log("Error: ", err);
        callback && callback({ message: "Error occurred", error: err });
        return;
      }
    }

    callback &&
      callback({ message: `Inserted ${insertedLength} items successfully` });
  },

  async getMasterWithReport(month, callback) {
    console.log("month", month);

    const query = `
    SELECT 
     masters.name, 
      masters.name_of_co_operatice_society, 
      masters.registration_no_of_co_operatice_society, 
      masters.bank_name, 
      masters.bank_account_holder_name, 
      masters.bank_account_no, 
      masters.ifsc_code, 
      masters.district,
      masters.id,
      masters.applicationId,
    monthly_reports.litter,
    monthly_reports.isApprove,
    monthly_reports.paymentStatus,
    monthly_reports.amount,
    monthly_reports.month
  FROM 
    masters
  LEFT JOIN 
    monthly_reports 
  ON 
    masters.applicationId = monthly_reports.applicationId
    AND monthly_reports.month = ?
  
    `;

    db.query(query, [month], (err, result) => {
      if (err) {
        console.log("Error: ", err);
        callback && callback({ message: "Error occurred", error: err });
      } else {
        console.log("result ==>>", result);
        callback && callback({ message: "success", data: result });
      }
    });
  },

  getMonthlyReport(month, callback) {
    console.log("month", month);
    let query = "";
    if (month) {
      query = `SELECT 
                masters.name, 
                masters.name_of_co_operatice_society, 
                masters.registration_no_of_co_operatice_society, 
                masters.bank_name, 
                masters.bank_account_holder_name, 
                masters.bank_account_no, 
                masters.ifsc_code, 
                masters.district,
                monthly_reports.month, 
                monthly_reports.litter, 
                monthly_reports.amount, 
                monthly_reports.isApprove, 
                monthly_reports.paymentStatus,
                monthly_reports.id

            FROM 
                masters
            JOIN 
                monthly_reports 
            ON 
                masters.applicationId = monthly_reports.applicationId
            WHERE 
                monthly_reports.month = ?;
            `;
    } else {
      query = `SELECT 
                masters.name, masters.name_of_co_operatice_society, masters.registration_no_of_co_operatice_society, masters.bank_name, masters.bank_account_holder_name, masters.bank_account_no, masters.ifsc_code, masters.district,
                monthly_reports.month, monthly_reports.litter, monthly_reports.amount, monthly_reports.isApprove, monthly_reports.paymentStatus, monthly_reports.id
              FROM 
                masters
                JOIN 
                monthly_reports 
              ON 
                masters.applicationId = monthly_reports.applicationId; `;
    }

    db.query(query, [month], (err, result) => {
      if (err) {
        console.log("Error: ", err);
        callback && callback({ message: "Error occurred", error: err });
      } else {
        // console.log("result ==>>", result);
        callback && callback({ message: "success", data: result });
      }
    });
  },




  getRangeSubsidy(from, to, callback){
            // let query =  `SELECT 
            //         applicationId,
            //             GROUP_CONCAT(CONCAT(month, ': ', amount) ORDER BY month ASC SEPARATOR ', ') AS subsidy_details
            //         FROM 
            //         monthly_reports
            //         WHERE 
            //           month BETWEEN ? AND ?
            //         GROUP BY 
            //         applicationId;
            //   `;

            let query = `SELECT 
            mr.applicationId,
            mr.paymentStatus,
            u.name,
            u.district,
            u.name_of_co_operatice_society,
            u.bank_name,
            u.bank_account_holder_name,
            u.bank_account_no,
            u.ifsc_code,
            GROUP_CONCAT(CONCAT(mr.month, ': ', mr.amount, ' (L: ', mr.litter, ')') ORDER BY mr.month ASC SEPARATOR ', ') AS subsidy_details,
            SUM(mr.amount) AS total_amount
          FROM 
            monthly_reports mr
          JOIN 
            masters u ON mr.applicationId = u.applicationId
          WHERE 
            mr.month BETWEEN ? AND ? 
            AND mr.paymentStatus = 'Pending'
            AND mr.isApprove = 'Approve'
          GROUP BY 
            mr.applicationId, u.name;`


              db.query(query, [from, to], (err, result) => {
                if (err) {
                  console.log("Error: ", err);
                  callback && callback({ message: "Error occurred", error: err });
                } else {
                  console.log("result ==>>", result);
                  callback && callback({ message: "success", data: result });
                }
              });




  }
};
