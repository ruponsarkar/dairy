
const multer = require("multer");
const request = require("request");
const fs = require("fs");
const path = require("path");
const { application } = require("express");
const AdminModel = require("../models/AdminModel");

module.exports = {
  login(req, res) {
    let email = req.body.email;
    let password = req.body.password;
    AdminModel.authenticate(email, password, (result) => {
      res.status(200).send(result);
    });
  },
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

  createDCS(req, res) {
    let data = req.body.formData;
    AdminModel.createDCS(data, (result) => {
      res.status(200).send(result);
    });
  },
  getAllDCS(req, res) {
    AdminModel.getAllDCS((result) => {
      res.status(200).send(result);
    });
  },
  getAllDCS_DistrictWise(req, res) {
    let disctrict = req.body.param.disctrict;
    AdminModel.getAllDCS_DistrictWise(disctrict, (result) => {
      res.status(200).send(result);
    });
  }
};
