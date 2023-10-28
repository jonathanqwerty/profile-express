const express = require("express"),
  router = express.Router(),
  controller = require("../controllers/authController"),
  validate = require("../midellware/validate"),
  schema = require("../validatorSchema/authValidatorSchema"),
  checkToken = require("../midellware/checkToken"),
  multer = require("../midellware/multer"),
  multerLib = require("multer")();

router.post(
  "/register",
  multerLib.single("image"),
  validate(schema.registerValidator),
  controller.register
);
router.post("/login", validate(schema.loginValidator), controller.login);
router.get("/profile", checkToken, controller.profile);
router.post(
  "/change-password",
  checkToken,
  validate(schema.changePasswordValidator),
  controller.changePassword
);
// router.post("/upload", multerLib.single("image"), controller.upload);

module.exports = router;
