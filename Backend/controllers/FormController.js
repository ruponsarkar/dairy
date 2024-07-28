const multer = require("multer");
const request = require("request");
const fs = require("fs");
const path = require("path");
const { application } = require("express");
const FormModel = require("../models/FormModel");
const { log } = require("console");

module.exports = {
  saveForm(req, res) {
    let form = req.body.formData;
    FormModel.saveForm(form, (result) => {
      res.status(200).send(result);
    });
  },
  upload_config: multer({
    storage: multer.diskStorage({
      destination: function (req, file, callback) {
        let dest = path.join(
          process.env.FILE_UPLOAD_PATH,
          req.body.mobileNumber
        );
        
        module.exports.checkDirectory(dest, () => {
          callback(null, dest);
        });
      },
      filename: function (req, file, callback) {
        callback(null, req.body.fileName);
      },
    }),
  }),
  checkDirectory(directory, callback) {
    fs.stat(directory, (err, stats) => {
      if (
        err &&
        (err.errno === 34 || err.errno === -4058 || err.errno === -2)
      ) {
        fs.mkdir(directory, callback);
      } else {
        if (!err) {
          return callback && callback();
        }
        console.log(err);
      }
    });
  },
  saveToDb(req, res) {
    let mobileNumber = req.body.mobileNumber;
    let fileName = req.body.fileName;
    let fileType = req.body.fileType;
    let fileSize = req.body.fileSize;
    let filePath = path.join(process.env.FILE_UPLOAD_PATH, mobileNumber);
    filePath = path.join(filePath, fileName);
    FormModel.updateFilePath(mobileNumber, fileType, filePath, (result) => {
      res.status(200).send(result);
    });
  },
  
  getFormByMobileNumber(req, res) {
    let data = req.body.mobileNumber;
    // console.log("======>>>", req.body.data.mobileNumber);
    FormModel.getFormByMobileNumber(req.body.data.mobileNumber, (result) => {
      res.status(200).send(result);
    });
  },

  addOrUpdateAdmin(req, res) {
    let data = req.body.formData;
    FormModel.addOrUpdateAdmin(data, (result) => {
      res.status(200).send(result);
    });
  },

  getAdmins(req, res) {
    FormModel.getAdmins((result) => {
      res.status(200).send(result);
    });
  },

  getFrom(req, res) {
    let limit = req.query.limit;
    let offset = req.query.offset;
    // console.log("==>>", req.query);
    FormModel.getFrom(limit, offset, (result) => {
      res.status(200).send(result);
    });
  },

  updateFormStatus(req, res){
    console.log(req.body.data);
    let data = req.body.data;
    FormModel.updateFormStatus(data, (result)=>{
      res.status(200).send(result);
    })
    return;
  }
};
