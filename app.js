var express = require('express');
var app = express();

var bodyParser = require('body-parser');

app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended:true}));


// Routes
app.get("/", function(req, res){
    res.render("landing");
});

var campgrounds = [
    {name:"Salamon Creek", image:"https://farm6.staticflickr.com/5181/5641024448_04fefbb64d.jpg"},
    {name:"Smoky Mountaines", image :"https://farm1.staticflickr.com/130/321487195_ff34bde2f5.jpg"},
    {name:"Mount Caramel", image:"https://farm4.staticflickr.com/3492/3823130660_0509aa841f.jpg"}
];


app.get("/campgrounds", function(req, res){
    res.render("campgrounds", {campgrounds:campgrounds});
});

app.post("/campgrounds", function(req, res){
    var names = req.body.campName;
    var images = req.body.image;
    var newCampground = { name:names, image:images };
    campgrounds.push(newCampground);    
    res.redirect("/campgrounds");
});

app.get("/campgrounds/new",function(req, res){
    res.render("new")
});

app.listen(3000, function(){
    console.log("Yelp Camp Server Started...");
});