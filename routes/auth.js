const express = require("express"),
  router = express.Router(),
  controller = require("../controllers/authController"),
  validate = require("../midellware/validate"),
  schema = require("../validatorSchema/authValidatorSchema"),
  checkToken = require("../midellware/checkToken"),
  multer = require("../midellware/multer");

router.post(
  "/register",
  multer.images.single("images"),
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

module.exports = router;
