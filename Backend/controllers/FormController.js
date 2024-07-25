
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

  getFormByMobileNumber(req, res) {
    let data = req.body.mobileNumber;
    // console.log("======>>>", req.body);
    FormModel.getFormByMobileNumber(req.body.mobileNumber, (result) => {
      res.status(200).send(result);
    });
  }
};
