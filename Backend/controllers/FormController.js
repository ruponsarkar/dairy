
const multer = require("multer");
const request = require("request");
const fs = require("fs");
const path = require("path");
const { application } = require("express");
const FormModel = require("../models/FormModel");

module.exports = {
  saveForm(req, res) {
    let form = req.body;
    FormModel.saveForm(form, (result) => {
      res.status(200).send(result);
    });
  },
  upload_config: multer({
    storage: multer.diskStorage({
      destination: function (req, file, callback) {
        let dest = path.join(
          process.env.FILE_UPLOAD_PATH,
          req.body.userId
        );

        module.exports.checkDirectory(dest, () => {
          callback(null, dest);
        });
      },
      filename: function (req, file, callback) {
        callback(null, file.originalname);
      },
    }),
  }),
  checkDirectory(directory, callback) {
    console.log("DIRECTORY", directory);
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
    let userId = req.body.userId;
    let flag = req.body.flag;
    let fileName = req.body.fileName;
    let fileSize = req.body.fileSize;
    let filePath = path.join(process.env.FILE_UPLOAD_PATH, userId);
    filePath = path.join(filePath, fileName);
    console.log(filePath);
    filePath = path.join(userId, fileName);
    console.log("=======", filePath);
    DocumentModel.saveFilePath(userId, fileName, fileSize, filePath, flag, (response) => {
      res.status(200).send(response);
    });
  },
  
  getFormByMobileNumber(req, res) {
    let data = req.body.mobileNumber;
    // console.log("======>>>", req.body);
    FormModel.getFormByMobileNumber(req.body.mobileNumber, (result) => {
      res.status(200).send(result);
    });
  }
};
