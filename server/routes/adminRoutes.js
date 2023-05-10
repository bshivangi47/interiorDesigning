const express = require("express");
const router = express.Router();

const controllers = require("../controllers/AdminControllers");
const uploadFiles = require("../middlewares/uploadFiles");
const auth = require("../middlewares/auth");

router.post(
  "/uploadProductCSV",
  auth,
  uploadFiles.single("CSVFile"),
  controllers.uploadProductCSV
);

router.post(
  "/uploadInventoryCSV",
  auth,
  uploadFiles.single("CSVFile"),
  controllers.uploadInventoryCSV
);

router.get("/getDesigners", auth, controllers.getDesigners);
router.get("/getClients", auth, controllers.getClients);
router.post("/addCommissions", auth, controllers.addCommissions);

router.get("/getTotalDesigner", controllers.getTotalDesigner);
router.get("/newProjectsperDesigner", controllers.newProjectsperDesigner);
router.get("/savedItemsperProject", controllers.savedItemsperProject);
router.get("/perdesignerPurchase", controllers.perdesignerPurchase);
router.get("/perclientPurchase", controllers.perclientPurchase);
router.get("/perProjectPurchase", controllers.perProjectPurchase);
router.get("/deleteOrders", controllers.deleteOrders);
router.get("/spendperDesigner", controllers.spendperDesigner);
router.post(
  "/getTotalDesignerByTimeRange",
  controllers.getTotalDesignerByTimeRange
);
router.post(
  "/getTotalProjectsTimeRange",
  controllers.getTotalProjectsTimeRange
);

module.exports = router;
