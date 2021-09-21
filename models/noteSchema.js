const mongoose = require('mongoose');

// Defining schema to store notes in database
const noteSchema = new mongoose.Schema({
    subject: {
        type: String,
        required: [true, "Notes of which subject?"]
    },
    description: String,
    user: {
        type: mongoose.Schema.Types.Mixed,
        required: [true, "Uploaded by which user?"]
    },
    uploadedAt: {
        type: Date,
        default: Date.now
    },
    name: {
        type: String,
        required: [true, "Uploaded file must have a name"]
    }
    
});

module.exports = mongoose.model("Note", noteSchema);