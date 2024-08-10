const multer = require("multer");
const request = require("request");
const fs = require("fs");
const path = require("path");
const { application } = require("express");
const FormModel = require("../models/FormModel");
const MasterModel = require("../models/MasterModel")
const { log } = require("console");

module.exports = {
    saveToMaster(req, res) {
    let form = req.body.data;
    console.log("here ", form );
    MasterModel.saveToMaster(form, (result) => {
      res.status(200).send(result);
    });
  },

  getMaster(req, res) {
    // console.log("here==>> ", req.body.data);
    let data = req.body.data;
    // return;
    MasterModel.getMaster(data, (result) => {
      res.status(200).send(result);
    });
  },
  postMonthlyReport(req, res) {
    console.log("here==>> ", req.body.data);
    let data = req.body.data;
    let month = req.body.month;
    let amountPerLitter = req.body.amountPerLitter;
    MasterModel.postMonthlyReport(data, month, amountPerLitter, (result) => {
      res.status(200).send(result);
    });
  },


  getMasterWithReport(req, res) {
    let month = req.body.month;
    MasterModel.getMasterWithReport(month, (result) => {
      res.status(200).send(result);
    });
  },
  getMonthlyReport(req, res) {
    let month = req.body.month;
    MasterModel.getMonthlyReport(month, (result) => {
      res.status(200).send(result);
    });
  },


  
};
