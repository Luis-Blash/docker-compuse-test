const axios = require("axios");

const mailErrorInstance = axios.create({ baseURL: "https://inmersys-mailing-microservices.glitch.me/api" });

const sendError = async ({
    subject,
    messageError,
    project,
    routeError,
}) => {
    await mailErrorInstance.post("/email/notify", { subject, messageError, project, routeError });
};




module.exports = { sendError }