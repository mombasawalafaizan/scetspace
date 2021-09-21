const path = require('path');

// A function used to upload a file to the Azure storage
const { downloadFromAzure } = require('../middleware/access_azure_blob');

async function getFileFunc(req, res) {
    try {
        const fileContent = await downloadFromAzure(req.params.name);
        res.send(fileContent);
    } catch (err) {
        console.log('Error sending file from server: \n', err);
        res.sendStatus(404);
    }
}

module.exports = {
    getFile: getFileFunc
}