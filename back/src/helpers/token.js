const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET;

// Identifcador de id
const generateJWT = (uid = "") => {
    const payload = { uid };
    return jwt.sign(payload, secret);
};

const verifyToken = (token) => {
    return jwt.verify(token, secret);
};

module.exports = {
    generateJWT,
    verifyToken,
};
