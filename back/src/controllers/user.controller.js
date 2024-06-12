const User = require("../models/User")
const { getSuccessfulResponse, errorHandler } = require("../helpers/responses");
const { encryptPassword } = require("../helpers/encrypt");
const { generateJWT } = require("../helpers/token");



const getValidUserByEmail = async (email) => {
    return await User.findOne({ email, isActive: true });
}

const createResponse = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await createUser({ email, password });
        const token = generateJWT(user._id);

        return getSuccessfulResponse(res, { token, status: 0, msg: "User was created", payload: { token }, });
    } catch (error) {
        return errorHandler({ res,req, message: error.message, path: req.originalUrl })
    }
}


const createUser = async ({ email, password }) => {
    const encryptedPassword = encryptPassword(password);
    const user = new User({ email, password: encryptedPassword });

    return await user.save();
}

const getUserById = async (userId) => {
    return await User.findById(userId);
}

const getResponse = async (req, res) => {
    try {
        const users = await getUsers();

        const redisClient = req.app.locals.redisClient;
        redisClient.set(req.originalUrl, JSON.stringify({ users }));

        console.log('base datos');

        return getSuccessfulResponse(res, {  status: 0, msg: "User get", payload: { users }, });
    } catch (error) {
        return errorHandler({ res,req, message: error.message, path: req.originalUrl })
    }
}

const getUsers = async () => {
    return await User.find();
}




module.exports = {
    getValidUserByEmail,
    createResponse,
    getUserById,
    getResponse

}