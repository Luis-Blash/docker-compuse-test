const { validationResult } = require("express-validator");
const { getBadRequestResponse } = require("../helpers/responses");

const validateMiddlewareChecks = (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) return next();

    return getBadRequestResponse(res, { message: "Validation Errors", payload: { errors }, status: 1 });
};


module.exports = {
    validateMiddlewareChecks
}

