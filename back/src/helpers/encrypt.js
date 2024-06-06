const bcryptjs = require("bcryptjs");

const encryptPassword = (password) => {
    const salt = bcryptjs.genSaltSync();
    return bcryptjs.hashSync(password, salt);
};

const validatePassword = (value, password) => {
    return bcryptjs.compareSync(value, password);
}

module.exports = {
    encryptPassword,
    validatePassword
};
