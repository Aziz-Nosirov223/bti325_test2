const express = require('express');
const app = express();
var test2Module = require('./test2_moduleB.js')
var path = require('path');
var HTTP_PORT = process.env.PORT || 8080;

function onHttpStart() {
    console.log("Express http server listening on " + HTTP_PORT);
}

app.get('/', (req, res) => {
    var resText = "<h2>Declaration:</h2>";
    resText += "<p>I acknowledge the College's academic integrity policy - and my own integrity - remain in effect whether my work is <br> done remotely or onsite. Any test or assignment is an act of trust between me and my instructor, and especially with<br> my classmates... even when no one is watching. I declare I will not break that trust.</p>";
    resText += "<span>Name: <mark>Aziz Nosirov</mark></span><br><br>";
    resText += "<span>Student Number: <mark>115673188</mark></span><br><br>";
    resText += "<a href='/CPA'>Click to visit CPA Students</a><br><br>";
    resText += "<a href='/highGPA'>Click to see who has the highest GPA</a><br><br>";
    res.send(resText);
})

app.get("/highGPA", (req, res) => {
    /*    var resText = '<h2>Highest GPA:</h2';
        res.send(resText);*/
        test2Module.highGPA().then((data) => {
            res.json(data);
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
