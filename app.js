var express = require('express');
var app = express();

app.set("view engine","ejs");


// Routes
app.get("/", function(req, res){
    res.render("landing");
});

app.get("/campgrounds", function(req, res){
    var campgrounds = [
        {name:"Salamon Creek", image:"https://farm6.staticflickr.com/5181/5641024448_04fefbb64d.jpg"},
        {name:"Smoky Mountaines", image :"https://farm1.staticflickr.com/130/321487195_ff34bde2f5.jpg"},
        {name:"Mount Caramel", image:"https://farm4.staticflickr.com/3492/3823130660_0509aa841f.jpg"}
    ];

    res.render("campgrounds", {campgrounds:campgrounds});
});

app.listen(3000, function(){
    console.log("Yelp Camp Server Started...");
});