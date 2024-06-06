const { getValidUserByEmail, getUserById } = require("../controllers/user.controller");
const { verifyToken } = require("../helpers/token")



const validateToken = async (token, { req }) => {
    const response = verifyToken(token);
    if (!response) throw new Error("Invalid token");
    const { uid } = response;
    const user = await getUserById(uid);
    if (!user) throw new Error("Invalid user token");
    if (!user.isActive) throw new Error("Invalid user");

    req.body.userInstance = user;

    return true;
}


module.exports = {
    validateToken
}