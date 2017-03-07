var express =    require("express"),
    app =        express(),
	bodyParser = require("body-parser"),
	mongoose =   require("mongoose");

mongoose.connect("mongodb://localhost/yelp_camp");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

// SCHEMA SETUP
var campgroundSchema = new mongoose.Schema({
	name: String,
	image: String
});

var Campground = mongoose.model("Campground", campgroundSchema);
/*Campground.create(	{ name: "Granite Hill", image: "https://farm5.staticflickr.com/4016/4369518024_0f64300987.jpg"}, function(err, campground){
	if(err){
		console.log(err);
	} else {
		console.log("newly created campground");
		console.log(campground);
	}
});*/



app.get("/", function(req, res){
	res.render("landing");
});

app.get("/campgrounds", function(req, res){
// Get all campgrounds from DB
Campground.find({}, function(err, allcampgrounds){
	if(err){
		console.log(err);
	} else {
		res.render("campgrounds", {campgrounds:allcampgrounds});
	}
});

});

app.post("/campgrounds", function(req, res){
	var name = req.body.name;
	var image = req.body.image;
	var newCampground = {name: name, image: image};
	// Create a new campground and sve to DB
	Campground.create(newCampground, function(err, newlyCreated){
		if(err){
			console.log(err);
		} else {
		// redirect back to campgrounds page
			res.redirect("/campgrounds");
		}
	});
	
});

app.get('/campgrounds/new', function(req, res){
	res.render("new.ejs");
});

app.listen(3000, function(){
	console.log("The YelpServer has started!")
});