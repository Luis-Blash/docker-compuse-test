const { getValidUserByEmail } = require("../controllers/user.controller")


const validateUserDoesNotExist = async (email) => {
    const user = await getValidUserByEmail(email);
    if (user) throw new Error(`User with ${email} email already exists`);

    return true;
}


module.exports = {
    validateUserDoesNotExist
}