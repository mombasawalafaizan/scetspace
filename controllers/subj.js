const waterfall = require('async-waterfall');
const Note = require('../models/noteSchema');
const Midterm = require('../models/midtermSchema');
const Practical = require("../models/practicalSchema");

function runMultipleQueriesAsync(subject, cb) {

    // Object to store all models
    let allRefDatasSchemas = {
        'Note': Note,
        'Midterm': Midterm,
        'Practical': Practical
    };

    // need an array to run all queries one by one in a definite order
    arr = ['Note', 'Midterm', 'Practical'];

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
    // The query parameters to find are same except for modelname 
    // which is dynamically fetched by array
    let query = function (prevModelData, currentIndex, callback) {
        allRefDatasSchemas[arr[currentIndex]].find({ subject: subject }, { subject: 0 }, function (err, result) {
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

    // Run all dynamic queries one by one using async-waterfall method    
    waterfall(queue, function (err, result) {
        if (err) cb(err, {});
        else cb(false, finalResult);
    });
}

const subjectInfo = (req, res) => {
    let subject = req.params.subject;
    if (subject in subject_info) {
        runMultipleQueriesAsync(subject, (err, query_results) => {
            if (!err) {
                res.status(200)
                    .json({
                        subject: subject_info[subject], notes: query_results['Note'],
                        midterm: query_results['Midterm'],
                        practical: query_results['Practical']
                    });
            } else {
                res.status(500).send('Error while fetching files from database.');
            }
        });
    } else {
        res.sendStatus(404);
    }
}

module.exports = subjectInfo;