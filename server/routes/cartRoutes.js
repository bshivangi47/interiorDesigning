const express = require("express");
const router = express.Router();

const controllers = require("../controllers/cartControllers");
const auth = require("../middlewares/auth");

router.post("/addToCart", auth, controllers.addToCart);
router.get("/getCartItems", auth, controllers.getCartItems);
router.post("/getCartItem", auth, controllers.getCartItem);
router.post("/updateQuantity", auth, controllers.updateQuantity);
router.post("/changePaidStatus", controllers.changePaidStatus);
router.post("/addToOrder", controllers.addToOrder);
router.get("/getPastOrders", auth, controllers.getPastOrders);
module.exports = router;
