var express = require('express');
var app = express();

var bodyParser = require('body-parser');
var mongoose = require('mongoose');

mongoose.connect("mongodb://localhost/yelp_camp",{useNewUrlParser:true});

app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended:true}));

// Schema Setup
var campgroundSchema = new mongoose.Schema({
    name:String,
    image:String,
    description:String
});

var Campground = mongoose.model("Campground",campgroundSchema);

// Campground.create(
//     {
//         name:"Mount Shark", 
//         image:"https://www.michigan.gov/images/dnr/forestCampground_611555_7.jpg",
//         description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas cursus sollicitudin nibh, sed facilisis nisl cursus non."
//     }, function(err, campground){
//        if(err){
//            console.log(err);
//        } else{
//            console.log("New created campground");
//            console.log(campground);
//        }
// });



// Routes
app.get("/", function(req, res){
    res.render("landing");
});


// INDEX - show all campgrounds
app.get("/campgrounds", function(req, res){
    // Get all campgrounds from DB 
    Campground.find({},function(err, allCampgrounds){
        if(err){
            console.log(err);
        }else{
            res.render("index", {campgrounds:allCampgrounds});
        }
    });
    
});

// CREATE -  add new campgounds to DB
app.post("/campgrounds", function(req, res){
    var names = req.body.campName;
    var images = req.body.image;
    var description = req.body.description;
    var newCampground = { name:names, image:images, description:description };
      
    // Create a new campground and save to DB
    Campground.create(newCampground, function(err, newlyCreated){
        if(err){
            console.log("Error chhe ahiya");
        }else{
            // Redirect back to campgrounds page
            res.redirect("/campgrounds");
        }
    });    
});

// NEW - Show form to create a campground
app.get("/campgrounds/new",function(req, res){
    res.render("new")
});

// SHOW DETAILS ROUTE
app.get("/campgrounds/:id",function(req,res){
    // Find the campground with provided ID and render show template
    Campground.findById(req.params.id, function(err, foundCampground){
       if(err){
           console.log(err);
       } else{
           res.render("show",{campground:foundCampground});
       }
    });  
});



app.listen(3000, function(){
    console.log("Yelp Camp Server Started...");
});