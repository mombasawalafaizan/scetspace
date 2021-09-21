// FOR CLOUD STORAGE IN AZURE
const { BlobServiceClient } = require('@azure/storage-blob');

const AZURE_STORAGE_CONNECTION_STRING = process.env.AZURE_STORAGE_CONNECTION_STRING;
const containerName = process.env.AZURE_STORAGE_CONTAINER_NAME;

const blobServiceClient = BlobServiceClient.fromConnectionString(AZURE_STORAGE_CONNECTION_STRING);

// Get a reference to a container
const containerClient = blobServiceClient.getContainerClient(containerName);

const uploadToAzure = async (filename) => {
    const blockBlobClient = containerClient.getBlockBlobClient(filename);
    const uploadBlobResponse = await blockBlobClient.uploadFile("./public/uploads/" + filename);
    return uploadBlobResponse;
}

const deleteFromAzure = async (filename) => {
    const blockBlobClient = containerClient.getBlockBlobClient(filename);
    const deleteBlobResponse = blockBlobClient.delete();
    return deleteBlobResponse;
}

const downloadFromAzure = async (filename) => {
    const blockBlobClient = containerClient.getBlockBlobClient(filename);
    const downloaded = await blockBlobClient.downloadToBuffer();
    return downloaded;
}

module.exports = { uploadToAzure, deleteFromAzure, downloadFromAzure };