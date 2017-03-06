var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

var campgrounds = [
	{ name: "Salmon Creek", image: "https://farm8.staticflickr.com/7252/7626464792_3e68c2a6a5.jpg"},
	{ name: "Granite Hill", image: "https://farm5.staticflickr.com/4016/4369518024_0f64300987.jpg"},
	{ name: "Mountain Granite", image: "https://farm3.staticflickr.com/2464/3694344957_14180103ed.jpg"}
];


app.get("/", function(req, res){
	res.render("landing");
});

app.get("/campgrounds", function(req, res){

res.render("campgrounds", {campgrounds:campgrounds});
});

app.post("/campgrounds", function(req, res){
	var name = req.body.name;
	var image = req.body.image;
	var newCampground = {name: name, image: image};
	campgrounds.push(newCampground);
	// get data from form and add to campground array
	// redirect back to campgrounds page
	res.redirect("/campgrounds");
});

app.get('/campgrounds/new', function(req, res){
	res.render("new.ejs");
});

app.listen(3000, function(){
	console.log("The YelpServer has started!")
});