const fs = require('fs');
const waterfall = require('async-waterfall');

const Notes = require("../models/noteSchema");
const Midterm = require("../models/midtermSchema");
const Practical = require("../models/practicalSchema");
const Project = require("../models/projectSchema");

const { deleteFromAzure } = require('../middleware/access_azure_blob');

function runMultipleQueriesAsync(userid, cb) {

    // Object to store all models
    let allRefDatasSchemas = {
        'notes': Notes,
        'midterm': Midterm,
        'project': Project,
        'practical': Practical
    };

    // need an array to run all queries one by one in a definite order
    arr = ['notes', 'midterm', 'project', 'practical'];

    // Callback function for initiation of waterfall
    let queue = [
        function (callback) {
            // pass the ref array and run first query by passing starting index - 0
            callback(null, arr, 0)
        }
    ];

    // Object to store result of all queries
    let finalResult = {};

    // Generic Callback function for every dynamic query
    let query = function (prevModelData, currentIndex, callback) {
        allRefDatasSchemas[arr[currentIndex]].find({ 'user.userid': userid }, function (err, result) {
            if (err) {
                console.log(err)
            } else {
                finalResult[arr[currentIndex]] = result
                callback(null, result, currentIndex + 1)
            }
        })
    }

    // Add callback function for every dynamic query
    queue.push(query);
    queue.push(query);
    queue.push(query);
    queue.push(query);

    // Run all dynamic queries one by one using async-waterfall method    
    waterfall(queue, function (err, result) {
        if (err) cb(err, {});
        else cb(false, finalResult);
    });
}

const showUploadsFunc = (req, res) => {
    runMultipleQueriesAsync(req.user.userid, (err, query_results) => {
        if (!err) {
            res.status(200).json({
                notes: query_results['notes'], midterm: query_results['midterm'],
                projects: query_results['project'], practical: query_results['practical']
            });
        } else {
            res.status(500).send("Error while fetching files from database.");
        }
    })
}

const deleteUploadFunc = (req, res) => {
    let type = req.params.type;
    // Object to store all models
    let allRefDatasSchemas = {
        'notes': Notes,
        'midterm': Midterm,
        'project': Project,
        'practical': Practical
    };
    if (!(type in allRefDatasSchemas)) {
        res.sendStatus(404);
        return;
    }



    allRefDatasSchemas[type].findByIdAndRemove(req.params.id, { useFindAndModify: false }, async (err, result) => {
        if (err) {
            res.status(500).send("Error finding and deleting file, try again later.");
        } else {
            // The below is the relative path w.r.t server
            if (type === 'notes' || type === 'midterm' || type === 'practical') {
                try {
                    const response = await deleteFromAzure(result.name);
                    res.sendStatus(200);
                } catch (err) {
                    console.log("Error deleting file from Azure cloud.")
                    res.status(500).send("Error deleting file from server.");
                }
            } else {
                res.sendStatus(200);
            }
        }
    })
}

module.exports = {
    showUploads: showUploadsFunc,
    deleteUpload: deleteUploadFunc
}