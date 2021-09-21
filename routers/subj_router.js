const express = require('express');
const router = express.Router();

// Controllers
const subjectInfo = require("../controllers/subj");
const notes = require("../controllers/notes");
const midterm = require("../controllers/midpaper");
const practical = require("../controllers/practicals");
const ensureAuthentication = require("../middleware/ensureAuthentication");

// Subject page which shows syllabus, midterm papers, notes, etc. 
router.get("/:subject", subjectInfo);

// Manage notes for the current subject
router.route("/:subject/upload_notes")
    .post(ensureAuthentication, notes.uploadNotes);

// Manage midterm papers for the current subject
router.route("/:subject/upload_midpaper")
    .post(ensureAuthentication, midterm.uploadMidpaper);

router.route("/:subject/upload_practical")
    .post(ensureAuthentication, practical.uploadPractical);

module.exports = router;