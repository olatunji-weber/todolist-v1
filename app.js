//jshint esversion:6
const express = require("express");
const bodyParser = require("body-parser");
var items = ["Buy Food", "Eat Food", "Cook Food"];
var workItems = [];

const app = express();
app.set("view engine", "ejs");  //get our nodejs app to use ejs templating
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", function(req, res){
    var today = new Date();
    var options = {
        weekday: "long",
        day: "numeric",
        month: "long"
    }
    var day = today.toLocaleDateString("en-US", options);
    res.render('list', {listTitle: day, newListItems: items});
})

app.post("/", function(req, res){
    let item = req.body.newTask;
    if(req.body.listTitle === "Work"){
        workItems.push(item);
        res.redirect("/work");
    }else{
        items.push(item);
        res.redirect("/");
    }
});

app.get("/work", function(req, res){
    res.render('list', {listTitle: "Work List", newListItems: workItems});
});

app.post("/work", function(req, res){
    let item = req.body.newTask;
    workItems.push(item);
    res.redirect("/work");
});

app.listen(3000, function(req, res){
    console.log("Server Running on port 3000.....")
})