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
router.patch("/deactivateMe", authController.protect, userController.deactivateMe);

router.route("/").get(authController.protect, userController.getAllUsers).post(userController.createUser);

router.route("/:id").get(userController.getUser).patch(userController.updateUser);

module.exports = router;
