const { Server } = require("./config/Server");
const { PORT } = process.env;

const server = new Server(PORT);

server.listen();
