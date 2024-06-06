const { Router } = require("express");
const { body, header } = require("express-validator");
const { validateMiddlewareChecks } = require("../middleware/validation.middleware");
const { login, getNewToken, deleteToken } = require("../controllers/auth.controller");
const { validateToken } = require("../middleware/auth.middleware");
const { getTokenAuthRedis, deleteTokenAuthRedis } = require("../middleware/redis.middleware");



const router = Router();

router.post('/validate',
    [
        header("token").notEmpty().withMessage("It is required").isString().custom(validateToken),
        validateMiddlewareChecks,
        getTokenAuthRedis
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

router.delete('/logout',
    [
        header("token").notEmpty().withMessage("It is required").isString().custom(validateToken),
        validateMiddlewareChecks,
        deleteTokenAuthRedis
    ],
    deleteToken
);

module.exports = router;