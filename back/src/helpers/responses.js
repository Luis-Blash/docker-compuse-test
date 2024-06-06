const { sendError } = require("../api/error");

const getSuccessfulResponse = (res, { status = 0, msg, payload, resStatus = 200 }) => {
    return res.status(resStatus).json({
        status,
        msg,
        payload,
    });
};


const getBadRequestResponse = (res, { message, payload = '', status = 1 }) => {
    res.status(400).json({
        ok: false,
        message,
        payload
    })
}

const getErrorMessage = (res, { msg, status = 1 }) => {
    return res.status(500).json({ msg, status });
};


const errorHandler = async ({ res,req, path, message }) => {
    const redisClient = req.app.locals.redisClient;
    redisClient.set(`error/${new Date().getTime()}:${path}`, JSON.stringify({ message }));
    // await sendError({ subject: "(NOMBRE PROYECTO COMO CLICKUP) | ERROR", messageError: message, project: "(NOMBRE PROYECTO COMO CLICKUP)", routeError: path })
    return getErrorMessage(res, { msg: "Ha ocurrido un error interno", status: 1 })
}




module.exports = {
    getSuccessfulResponse,
    getBadRequestResponse,
    errorHandler
}