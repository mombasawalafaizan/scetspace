const Practical = require("../models/practicalSchema");

// Middleware for saving file to server using 'multer'
const upload = require('../middleware/upload_file');

// A function used to upload a file to the Azure storage
const { uploadToAzure } = require('../middleware/access_azure_blob');

const uploaded = async (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            console.log("Error while uploading practical file", err);
            if (req.fileValidationError) {
                res.status(406).send("Invalid file sent to server.");
                return;
            }
        }
        try {
            let subject = req.params.subject;
            if (!req.file) throw new TypeError('No file was uploaded.');

            await uploadToAzure(req.file.filename);

            const newPractical = new Practical({
                subject: subject,
                practical_number: req.body.practical_number,
                user: req.user,
                description: req.body.description,
                name: req.file.filename
            });

            newPractical.save(function (err, result) {
                if (err) {
                    console.log("error saving file", err);
                    res.status(500).send('Error saving file to database');
                }
                else {
                    res.sendStatus(200);
                }
            });
        } catch (error) {
            console.log("from catch in practical post", error);
            if (error instanceof TypeError) res.status(406).send(error.message);
            else res.sendStatus(404);
        }
    });
};

module.exports = {
    uploadPractical: uploaded
};