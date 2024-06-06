const redis = require("redis");
const { logInColor } = require("../helpers/logs");

const connectRedis = async () => {
  try {
    const redisClient = redis.createClient({
      url: "redis://redis:6379", // URL para conectar con el servicio Redis en Docker
    });

    redisClient.on("error", (err) => {
      logInColor("Redis error:", err);
    });

    await redisClient.connect();
    logInColor("Connected to Redis");
    return redisClient;
  } catch (error) {
    logInColor("Error connecting to Redis:", error.message);
    throw new Error("Redis is not connected");
  }
};

module.exports = {
  connectRedis,
};
