const { logInColor } = require("../helpers/logs");
const { getSuccessfulResponse } = require("../helpers/responses");

// Métodos HTTP que validan para caché
const getMethods = ["GET"];

const cacheMiddleware = async (req, res, next) => {
  const urlReques = req.originalUrl
  const redisClient = req.app.locals.redisClient;
  logInColor(`${urlReques} - ${req.method}`,"orange")
  
  if (!isGetMethod(req.method)) {
    deleteCache(redisClient, urlReques);
    return next();
  }
  
  try {
    const cachedData = await getCache(redisClient, urlReques);
    if (cachedData) {
      return sendCachedResponse(res, cachedData);
    }

    next();
  } catch (error) {
    console.error("Error al obtener datos de la caché:");
    console.log(error);
    next();
  }
};

const isGetMethod = (method) => getMethods.includes(method);

const sendCachedResponse = (res, cachedData) => {
  console.log("Datos obtenidos de la caché");
  return getSuccessfulResponse(res, {
    status: 0,
    msg: "redis get",
    payload: cachedData,
  });
};

const getCache = async (redisClient, key) => {
  const cachedData = await redisClient.get(key);
  return JSON.parse(cachedData);
};

const deleteCache = async (redisClient, key) => {
  await redisClient.del(key);
  return true;
};

const getTokenAuthRedis = async (req, res, next) => {
  const redisClient = req.app.locals.redisClient;
  const token = req.headers.token;

  const cachedData = await getCache(redisClient, token);
  if (cachedData) {
    return sendCachedResponse(res, cachedData);
  }
  next();
};

const deleteTokenAuthRedis = async (req, res, next) => {
  const redisClient = req.app.locals.redisClient;
  const token = req.headers.token;
  deleteCache(redisClient, token);
  next();
};

module.exports = {
  cacheMiddleware,
  getTokenAuthRedis,
  deleteTokenAuthRedis,
};
