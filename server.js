/*********************************************************************************
 *  WEB322 – Test 3
 *  I declare that this assignment is my own work in accordance with Seneca  Academic Policy.
 *  No part *  of this assignment has been copied manually or electronically from any other source
 *  (including 3rd party web sites) or distributed to other students.
 *
 *  Name: Aziz Nosirov
 *  Student ID: 115673188
 *  Date: 2022-11-23
 *
 
 *
 ********************************************************************************/

const express = require('express');
const app = express();
var test2Module = require('./test2_moduleB.js')
var path = require('path');
var HTTP_PORT = process.env.PORT || 8080;
const exphbs = require("express-handlebars")

function onHttpStart() {
    console.log("Express http server listening on " + HTTP_PORT);
}

app.engine(
    '.hbs',
    exphbs.engine ({
        extname: ".hbs",
        defaultLayout: "main"

    })
)

app.set('view engine', '.hbs');

app.get('/', (req, res) => {
 //   var resText = "<a href=''>BSD Students</a><br>"
//    resText = "<ul><li><a href=>BSD Students</a></li><li>All Students</li><li>Highest GPA</li><li>Home</li></ul>"
/*    resText += "<a href=''>All Students</a>"
    resText += "<a href='/highGPA'>Click to see who has the highest GPA</a><br>";
    resText += "<a href='/'>Home</a>"
    resText += "<hr>"
    resText += "<p>Results will be displayed here.</p>"
    resText += "<h2>Student Honour Pledge:</h2>";
    resText += "<p>I acknowledge Seneca College's academic integrity policy.</p>";
    resText += "<p>On my honor, I have neither given or received unauthorized aid on this test.</p>"*/
/*    resText += "<span>Name: <mark>Aziz Nosirov</mark></span><br><br>";
    resText += "<span>Student Number: <mark>115673188</mark></span><br><br>";
    resText += "<a href='/CPA'>Click to visit CPA Students</a><br><br>";
    resText += "<a href='/highGPA'>Click to see who has the highest GPA</a><br><br>";*/
    
 //   res.send(resText);
    res.render("home")
})

app.get("/allStudents", (req, res) => {
    test2Module.allStudents().then((data) => {
        res.render("students.hbs")
    })
    
})

app.get("displayStudent", (req, res) => {
    res.render("student")
})

app.get("/BSDStudents", (req, res) => {
    res.render("students.hbs")
})

app.get("/highGPA", (req, res) => {
    /*    var resText = '<h2>Highest GPA:</h2';
        res.send(resText);*/
        test2Module.highGPA().then((data) => {
            res.json(data);
        //    res.render("students.hbs")
        })
    })

app.get("/CPA", (req, res) => {
    test2Module.getCPA().then((data) => {
        res.json(data);
    })
})



test2Module
    .prepare()
    .then(() => {
        app.listen(HTTP_PORT, onHttpStart);
    })
    .catch((err) => {
        console.log(err);
    })
