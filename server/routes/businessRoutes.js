const express = require("express");
const router = express.Router();

const controllers = require("../controllers/businessControllers");
const auth = require("../middlewares/auth");

router.post("/sendBusinessEmail", auth, controllers.sendBusinessEmail);

module.exports = router;
