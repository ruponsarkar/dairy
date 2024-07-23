const UserController = require("../controllers").UserController;
const AdminController = require("../controllers").AdminController;
const PaymentController = require("../controllers").PaymentController;
const FormController = require("../controllers").FormController;
const NoticeController = require("../controllers").NoticeController;

module.exports = (app) => {
  app.get("/api", (req, res) => {
    res.status(200).send({ status: true, message: "Welcome to DDD" });
  });
  app.post("/saveForm", FormController.saveForm);
  app.post("/getFormByMobileNumber",FormController.getFormByMobileNumber);
};
