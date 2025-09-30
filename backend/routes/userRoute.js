const express = require("express");
const userController = require("./../controllers/userController");
const authController = require("./../controllers/authController");

const router = express.Router();

router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.post("/forgotPassword", authController.forgotPassword);
router.patch("/resetPassword/:token", authController.resetPassword);
router.patch("/updatePassword", authController.protect, authController.updatePassword);
router.patch("/updateMe", authController.protect, userController.updateMe);
router.patch("/updateUser", authController.protect, userController.updateUser);
router.patch("/deactivateMe", authController.protect, userController.deactivateMe);

router
  .route("/")
  .get(authController.protect, authController.restrictTo("admin"), userController.getAllUsers)
  .post(userController.createUser);

router
  .route("/:id")
  .get(authController.protect, userController.getUser)
  .patch(authController.protect, userController.updateUser);

router.get("/me", authController.protect, (req, res) => {
  res.status(200).json({ status: "Success", data: { user: req.user } });
});
module.exports = router;
