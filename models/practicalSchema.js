const mongoose = require('mongoose');

// Defining Schema for Practicals to be stored in Database
const practicalSchema = new mongoose.Schema({
    subject: {
        type: String,
        required: [true, "Practical for which subject?"]
    },
    practical_number: {
        type: Number,
        require: [true, "Practical number must be provided."]
    },
    name: {
        type: String,
        required: [true, "Uploaded file must have a name"]
    },
    description: String,
    user: {
        type: mongoose.Schema.Types.Mixed,
        required: [true, "Uploaded by which user?"]
    },
    uploadedAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Practical", practicalSchema);