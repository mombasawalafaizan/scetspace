const express = require('express');
const router = express.Router();

const project = require('../controllers/projects');
const ensureAuthentication = require('../middleware/ensureAuthentication');

router.route('/upload_project').post(ensureAuthentication, project.uploadProject);

router.route('').get(project.showProjects);

router.route('/:id').get(project.findProjectByID);

module.exports = router;