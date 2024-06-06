const os = require("os");
const cors = require("cors");
const express = require("express");
const { UserRouter, AuthRouter } = require("../routers");
const { logInColor } = require("../helpers/logs");
const { connectDataBase } = require("./database");
const { connectRedis } = require("./redis");
const fileUpload = require("express-fileupload");

const hostname = os.hostname();

class Server {
    constructor(port = 5000) {
        this.port = port;
        this.app = express();
        this.paths = {
            auth: "/api/auth",
            user: "/api/user",
        };
        this.setMiddlewares()
        this.setDatabase();
        this.setRoutes()
    }

    setRoutes() {
        this.app.use(this.paths.auth, AuthRouter);
        this.app.use(this.paths.user, UserRouter);
    }

    async setDatabase() {
        await connectDataBase();
        this.app.locals.redisClient = await connectRedis()
    }

    setMiddlewares() {
        // CORS
        this.app.use(cors());
        this.app.use(fileUpload({ tempFileDir: "/temp" }));

        // parseo json
        this.app.use(express.json());
        // ruta de archivos
        this.app.use(express.static("public"));
    }

    listen() {
        this.app.listen(this.port, () => {
            logInColor(`\n\n The server is running on ${hostname}:${this.port}`);
        });
    }
}

module.exports = { Server };
