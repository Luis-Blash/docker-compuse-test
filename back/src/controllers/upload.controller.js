const aws = require('aws-sdk');
const { response } = require("express");
const { getSuccessfulResponse, errorHandler } = require("../helpers/responses");


//* Set S3 endpoint to DigitalOcean Spaces
const spacesEndpoint = new aws.Endpoint(process.env.S3_ENDPOINT);
const s3 = new aws.S3({
    endpoint: spacesEndpoint,
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

//* Upload one file
const fileUpload = async (file, path) => {
    const keyName = `${path}/${Date.now().toString()}-${file.name}`

    await s3.putObject({
        ACL: "public-read",
        Bucket: process.env.BUCKET_NAME,
        Key: keyName,
        Body: file.data,
    }).promise();

    const urlFile = `${process.env.BUCKED_ENDPOINT}/${keyName}`;

    return urlFile;
}

//* Deleted one file
const fileDeleted = async (file, path) => {
    const keyName = `${path}/${file}`;

    await s3.deleteObject({
        Bucket: process.env.BUCKET_NAME,
        Key: keyName,
    }).promise();

    const urlFile = `${process.env.BUCKED_ENDPOINT}/${keyName}`;

    return urlFile;
}

//* Delete array files
const arrayFilesDeleted = async (files = [], path) => {
    const objects = files.map(key => ({ Key: `${path}/${key.file}` }));

    const data = await s3.deleteObjects({
        Bucket: process.env.BUCKET_NAME,
        Delete: { Objects: objects },
    }).promise()

    return data;
}

//* Get all files in one folder
const getAllFiles = async () => {
    const { Contents } = await s3.listObjectsV2({
        Bucket: process.env.BUCKET_NAME,
        Prefix: 'projectName/' //* It is important to put the name of the folder files
    }).promise()

    return Contents
}




const uploadFile = async (req, res = response) => {
    if (!req.files) return res.json({ msg: "No files uploaded" });

    const file = req.files.file;
    const path = 'projectName/folder';

    try {
        const url = await fileUpload(file, path);

        return getSuccessfulResponse(res, "File was uploaded successfully", url);

    } catch (error) {
        return errorHandler({ res, req, message: error.message, path: req.originalUrl })
    }
}

const deleteFile = async (req, res = response) => {
    const { file } = req.params;
    const path = 'projectName/folder';

    try {
        const url = await fileDeleted(file, path);

        return getSuccessfulResponse(res, "File was delete successfully", url);

    } catch (error) {
        return errorHandler({ res, req, message: error.message, path: req.originalUrl })
    }
}

const deleteArrayFile = async (req, res = response) => {
    const file = req.body;
    const path = 'projectName/folder';

    try {
        const arrayFile = await arrayFilesDeleted(file, path);

        return getSuccessfulResponse(res, "File was delete successfully", arrayFile);

    } catch (error) {
        return errorHandler({ res,req, message: error.message, path: req.originalUrl })
    }
}

const getTodoFiles = async (req, res = response) => {
    const data = await getAllFiles()

    const arrayData = data.map(({ Key, LastModified, Size }) => {
        return {
            Key,
            LastModified,
            Size
        }
    });

    return getSuccessfulResponse(res, "File was get successfully", arrayData);
}

module.exports = {
    uploadFile,
    deleteFile,
    getTodoFiles,
    deleteArrayFile
}
