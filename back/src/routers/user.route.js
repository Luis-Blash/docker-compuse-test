const { Router } = require("express");
const { body } = require("express-validator");
const {
  validateMiddlewareChecks,
} = require("../middleware/validation.middleware");
const { validateUserDoesNotExist } = require("../middleware/user.middleware");
const {
  createResponse,
  getResponse,
} = require("../controllers/user.controller");

const router = Router();

router
  .post(
    "/",
    [
      body("email")
        .notEmpty()
        .withMessage("It is required")
        .isEmail()
        .withMessage("It must be a valid email")
        .isString()
        .trim()
        .custom(validateUserDoesNotExist),
      body("password")
        .notEmpty()
        .withMessage("It is required")
        .isString()
        .trim()
        .isLength({ min: 8 })
        .withMessage("It's size must be at least 8"),
      validateMiddlewareChecks,
    ],
    createResponse
  )
  .get("/",[],getResponse);

module.exports = router;
