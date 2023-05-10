const express = require("express");
const router = express.Router();

const controllers = require("../controllers/ProjectControllers");
const auth = require("../middlewares/auth");

router.post("/addProject", auth, controllers.addProject);
router.post("/updateProjectStatus", auth, controllers.updateProjectStatus);
router.get("/getProjects", auth, controllers.getProjects);
router.get("/getAllProjects", auth, controllers.getAllProjects);
router.post("/getProject", auth, controllers.getProject);
router.get("/getCompletedProjects", auth, controllers.getCompletedProjects);
router.get(
  "/getTotalCompletedProjects",
  auth,
  controllers.getTotalCompletedProjects
);
router.post("/saveToProject", auth, controllers.saveToProject);
router.post("/removeFromProject", auth, controllers.removeFromProject);
router.post("/getSavedItems", auth, controllers.getSavedItems);
router.post("/getLikedItems", auth, controllers.getLikedItems);
router.post("/getPassedItems", auth, controllers.getPassedItems);

router.get("/getclientProjects", auth, controllers.getclientProjects);
router.get(
  "/getCompletedclientProjects",
  auth,
  controllers.getCompletedclientProjects
);
router.post("/likeItem", auth, controllers.likeItem);
router.post("/passItem", auth, controllers.passItem);
router.post(
  "/getProjectswithSavedItem",
  auth,
  controllers.getProjectswithSavedItem
);
module.exports = router;
