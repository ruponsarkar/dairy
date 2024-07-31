const FormController = require("../controllers").FormController;
const AdminController = require("../controllers").AdminController;
const jwt = require('jsonwebtoken');

module.exports = (app) => {
  app.get("/api", (req, res) => {
    res.status(200).send({ status: true, message: "Welcome to Milk Subsidy Dairy Assam" });
  });
  app.post("/saveForm", FormController.saveForm);
  app.post("/getFrom", FormController.getFrom);
  app.post("/upload", FormController.upload_config.single("file"), FormController.saveToDb);
  app.post("/getFormByMobileNumber",FormController.getFormByMobileNumber);
  app.post("/updateFormStatus",FormController.updateFormStatus);
  app.get("/countStatus",FormController.countStatus);


  // Admin Panel API's
  app.post("/login", AdminController.login);
  app.post("/addOrUpdateAdmin", authenticateToken, AdminController.addOrUpdateAdmin);
  app.get("/getAdmins",authenticateToken, AdminController.getAdmins);
};

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (token == null) return res.sendStatus(401)

  jwt.verify(token, process.env.TOKEN_SECRET , (err, user) => {
    console.log(err)
    if (err) return res.sendStatus(403)
    req.user = user;
    console.log("Authenticated user");
    next();
  })
}