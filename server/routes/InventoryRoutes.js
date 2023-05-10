const express = require("express");
const router = express.Router();

const controllers = require("../controllers/InventoryControllers");
const auth = require("../middlewares/auth");

router.post("/getProducts", auth, controllers.getProducts);
router.post("/getProduct", auth, controllers.getProduct);
router.post("/searchProducts", auth, controllers.searchProducts);

module.exports = router;
