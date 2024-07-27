const UserController = require("../controllers").UserController;
const PaymentController = require("../controllers").PaymentController;
const FormController = require("../controllers").FormController;
const NoticeController = require("../controllers").NoticeController;
const AdminController = require("../controllers").AdminController


module.exports = (app) => {
  app.get("/api", (req, res) => {
    res.status(200).send({ status: true, message: "Welcome to DDD" });
  });
  app.post("/saveForm", FormController.saveForm);
  app.get("/getFrom", FormController.getFrom);
  app.post("/getFormByMobileNumber",FormController.getFormByMobileNumber);
  app.post("/addOrUpdateAdmin", AdminController.addOrUpdateAdmin);
  app.get("/getAdmins",AdminController.getAdmins);
};
