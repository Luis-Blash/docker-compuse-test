const { Router } = require("express");
const { body, header } = require("express-validator");
const { validateMiddlewareChecks } = require("../middleware/validation.middleware");
const { login, getNewToken } = require("../controllers/auth.controller");
const { validateToken } = require("../middleware/auth.middleware");



const router = Router();

router.post('/validate/:token',
    [
        header("token").notEmpty().withMessage("It is required").isString().custom(validateToken),
        validateMiddlewareChecks
    ],
    getNewToken
)


router.post('/login',
    [
        body("email").notEmpty().withMessage("It is required").isEmail().withMessage("It must be a valid email").isString().trim(),
        body("password").notEmpty().withMessage("It is required").isString().trim().isLength({ min: 8 }).withMessage("It's size must be at least 8"),
        validateMiddlewareChecks
    ],
    login
);

module.exports = router;