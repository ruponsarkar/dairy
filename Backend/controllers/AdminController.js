
const multer = require("multer");
const request = require("request");
const fs = require("fs");
const path = require("path");
const { application } = require("express");
const AdminModel = require("../models/AdminModel");

module.exports = {

  addOrUpdateAdmin(req, res) {
    let data = req.body.formData;
    AdminModel.addOrUpdateAdmin(data, (result) => {
      res.status(200).send(result);
    });
  },


  getAdmins(req, res) {
    AdminModel.getAdmins((result) => {
      res.status(200).send(result);
    });
  },




};
