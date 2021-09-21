const mongoose = require('mongoose');

// Defining Schema for Midterm Papers stored in Database
const midtermSchema = new mongoose.Schema({
    subject: {
        type: String,
        required: [true, "Midterm paper of which subject?"]
    },
    year: {
        type: Number,
        required: [true, "Midterm paper belongs to which year?"]
    },
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

// (Subject + Year) should be unique
midtermSchema.index({subject: 1, year: 1}, { unique: true });

module.exports = mongoose.model("Midterm", midtermSchema);