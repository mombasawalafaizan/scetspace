// Importing node and express modules
const express = require('express');
const path = require('path');
require('dotenv').config();

const app = express();

// MIDDLEWARES
// Connect with the database
require('./middleware/db');

// JSON object to check if given subject is available
subject_info = require('./public/subject-info.json');

// For handling POST requests
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// ROUTERS
const subjectRouter = require('./routers/subj_router');
const projectsRouter = require('./routers/projects_router');
const uploadsRouter = require('./routers/user_uploads_router');
const loginRouter = require('./routers/login_session');

// Important to note that loginRouter should be used first,
// so that session can be created, and path should always be '/' 
// for the session to instantiated on first call to the server
app.use('/', loginRouter);
app.use('/api/projects', projectsRouter);
app.use('/api/uploads', uploadsRouter);
app.use('/api/subj', subjectRouter);


//CONTROLLERS
const fileManager = require('./controllers/file_request');

// File request
app.get('/api/file/:name', fileManager.getFile);

// production mode
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'frontend/build')));
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'frontend/build/index.html'));
    })
}

//build mode
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend/public/index.html'));
})

const port = process.env.PORT
// Change client proxy to 168.31.80

app.listen(port, function () {
    console.log('Server started at port ', port);
})