const mongoose = require('mongoose');

// Defining schema to store notes in database
const projectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Project should have a name."],
        unique: true
    },
    description: String,
    user: {
        type: mongoose.Schema.Types.Mixed,
        required: [true, "Uploaded by which user?"]
    },
    techstack: {
        type: Array,
        required: [true, "You should have used some technology to build your project, enter it"]
    },
    github: String,
    uploadedAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Project", projectSchema);