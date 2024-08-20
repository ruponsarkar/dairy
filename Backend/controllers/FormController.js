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
    // console.log("here==>> ", req.body.data);
    let data = req.body.data;
    // return;
    FormModel.getFrom(data, (result) => {
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
  },
  
  countStatus(req, res){
    let user = req.body.user;
    // console.log("user ",user);
    FormModel.countStatus(user, (result)=>{
      res.status(200).send(result);
      // res.status()
    })
  },


  





  createFarmer(req, res) {
    let form = req.body.formData;
    console.log("form ", form);
    FormModel.createFarmer(form, (result) => {
      res.status(200).send(result);
    });
  },
  
  getAllFarmers(req, res) {
    let dsc = req.body.dsc;
    let user = req.body.user;
    FormModel.getAllFarmers(dsc, user, (result) => {
      res.status(200).send(result);
    });
  },


  searchFarmer(req, res) {
    let search = req.body.search;
    FormModel.searchFarmer(search, (result) => {
      res.status(200).send(result);
    });
  },
  dcsData(req, res) {
    FormModel.dcsData((result) => {
      res.status(200).send(result);
    });
  },














};
