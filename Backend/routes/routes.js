const FormController = require("../controllers").FormController;

module.exports = (app) => {
  app.get("/api", (req, res) => {
    res.status(200).send({ status: true, message: "Welcome to Milk Subsidy Dairy Assam" });
  });
  app.post("/saveForm", FormController.saveForm);
  app.post("/getFormByMobileNumber",FormController.getFormByMobileNumber);
};
