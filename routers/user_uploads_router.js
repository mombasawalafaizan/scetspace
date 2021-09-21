const express = require('express');
const router = express.Router();

const uploads = require('../controllers/user_uploads');
const ensureAuthentication = require('../middleware/ensureAuthentication');


router.get("/", ensureAuthentication, uploads.showUploads);

router.delete("/:type/:id", ensureAuthentication, uploads.deleteUpload);

module.exports = router;