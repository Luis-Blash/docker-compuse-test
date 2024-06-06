const { getBadRequestResponse, getSuccessfulResponse } = require("../helpers/responses");
const { getValidUserByEmail } = require("./user.controller");
const { validatePassword } = require("../helpers/encrypt");
const { generateJWT } = require("../helpers/token");


const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await getValidUserByEmail(email);
        if (!user) return getBadRequestResponse(res, { message: `User with email ${email} does not exist`, payload: { email }, status: 1 });
        const isPasswordValid = validatePassword(password, user.password);
        if (!isPasswordValid) return getBadRequestResponse(res, { message: `Email/Password are incorrect`, payload: { email }, status: 1 });
        const token = generateJWT(user._id);

        return getSuccessfulResponse(res, { status: 0, msg: "Ok", payload: { token } });
    } catch (error) {
        return errorHandler({ res, message: error.message, path: req.originalUrl })
    }
}

const getNewToken = async (req, res) => {
    const { userInstance } = req.body;
    try {
        const token = generateJWT(userInstance._id);
        return getSuccessfulResponse(res, { status: 0, msg: "Ok", payload: { token } });
    } catch (error) {
        return errorHandler({ res, message: error.message, path: req.originalUrl })
    }
}




module.exports = {
    login,
    getNewToken
}