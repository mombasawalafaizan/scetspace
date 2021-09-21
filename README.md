# [ScetSpace](https://scetspace.herokuapp.com/)

**ScetSpace** is a website that helps the students to view and possibly download:
* Syllabus
* Notes
* Practicals
* Previous year midterm papers
* Projects of your peers

which are uploaded by the students only. A student can upload the above listed items and view or download it according to his/her needs. 

## Functions

* View/download notes, syllabus or midterm papers in respective browser. (Authentication is not required)
* Projects section is there, which shows various projects, their description, tech stack of the project and email address of the author
* If a student wants to upload anything, authentication is required using SCET email address provided to students.
* A user can view and delete the items, he/she has uploaded to the server.


## Features
* User has to authenticate through SCET email-id in case if he/she wants anything to upload.
* Website is mobile-responsive.
* Session management is done. So, whenever a student revisits the site in a day, he/she is already logged in.
* The website is fully dynamic. As soon as a student uploads a file, the change is reflected.
* The transfer of data is through the database hence, the project is scalable.
* PDF files can be uploaded, viewed in the browser or downloaded. Mozilla PDF.js is used for this.
* Any change can be done to the website, just by modifying JSON objects of subject’s content or semester’s content.
