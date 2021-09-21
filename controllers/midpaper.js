const Midterm = require("../models/midtermSchema");

// Middleware for saving file to server using 'multer'
const upload = require('../middleware/upload_file');

// A function used to upload a file to the Azure storage
const { uploadToAzure } = require('../middleware/access_azure_blob');

const uploaded = async (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            console.log("Error while uploading midterm paper", err);
            if (req.fileValidationError) {
                res.status(406).send("Invalid file sent to server.");
                return;
            }
        }
        try {
            let subject = req.params.subject;
            if (!req.file) throw new TypeError('No file was uploaded.');

            await uploadToAzure(req.file.filename);

            const newPaper = new Midterm({
                subject: subject,
                user: req.user,
                year: req.body.year,
                name: req.file.filename
            });
            newPaper.save(function (err, result) {
                if (err) {
                    console.log("error saving file", err);
                    res.status(500).send('Error saving file to database');
                }
                else {
                    res.sendStatus(200);
                }
            });
        } catch (error) {
            console.log("from catch in midpaper", error);
            if (error instanceof TypeError) res.status(406).send(error.message);
            else res.sendStatus(404);
        }
    });
};

module.exports = {
    uploadMidpaper: uploaded
};