
const multer = require("multer");
const request = require("request");
const fs = require("fs");
const path = require("path");
const { application } = require("express");
const FormModel = require("../models/FormModel");

module.exports = {
  saveForm(req, res) {
    console.log("req :", req.body);
    let form = req.body;
    FormModel.saveForm(form, (result) => {
      res.status(200).send(result);
    });
  },

  getFormByMobileNumber(req, res) {
    let data = req.body.data;
    FormModel.getFormByMobileNumber(data.mobileNumber, (result) => {
      res.status(200).send(result);
    });
  }
};
