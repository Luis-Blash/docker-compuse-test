const { Router } = require("express");
const { uploadFile, deleteArrayFile, deleteFile, getTodoFiles } = require("../controllers/upload.controller");

//*** Routes */
const routes = Router();

//*** Upload files */
routes.post(
    "/uploadFile",
    uploadFile
)

//*** Delete name file */
routes.delete(
    "/deleteFile/:file",
    deleteFile
)

//*** Get all files */
routes.get(
    "/getFiles",
    getTodoFiles
)

//*** Delete array files */
routes.delete(
    "/deleteArrayFiles",
    deleteArrayFile
)

module.exports = routes;
