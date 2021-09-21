const Projects = require("../models/projectSchema");

showProjectsFunc = (req, res) => {
    let tags = req.query.tags;
    if (!tags) {
        Projects.find({}, (err, projects) => {
            if (err) {
                res.status(500).send("Error while retrieving projects");
                return;
            }
            res.status(200).send({ projects: projects });
        });
    } else {
        if (typeof tags === "string")
            tags = [tags];
        Projects.find({
            techstack: { "$all": tags }
        }, (err, projects) => {
            if (err) {
                res.status(500).send("Error while retrieving projects");
                return;
            }
            res.status(200).send({ projects: projects });
        });
    }
}

findProjectByIDFunc = (req, res) => {
    let id = req.params.id;
    Projects.findById(id, (err, project) => {
        if (err) {
            res.status(500).send("Error while retrieving projects");
            return;
        }
        res.status(200).send({ project: project });
    });
}

uploaded = (req, res) => {
    try {
        const newProject = new Projects({
            name: req.body.project_name,
            user: req.user,
            description: req.body.description,
            techstack: req.body.tokenfield.split(", "),
            github: req.body.github_link
        });
        newProject.save((err, result) => {
            if (err) {
                console.log("Error while saving project", error.message);
                res.status(409).send(err.message);
            } else {
                res.sendStatus(200);
            }
        })
    } catch (error) {
        console.log("Error while saving project", error.message);
        res.status(409).send(err.message);
    }
}

module.exports = {
    findProjectByID: findProjectByIDFunc,
    showProjects: showProjectsFunc,
    uploadProject: uploaded
}