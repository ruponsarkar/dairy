
const multer = require("multer");
const request = require("request");
const fs = require("fs");
const path = require("path");
const { application } = require("express");
const FormModel = require("../models/FormModel");

module.exports = {
  saveForm(req, res) {
    // console.log("req :", req.body.formData);
    let form = req.body.formData;
    FormModel.saveForm(form, (result) => {
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




};
