var express =    require("express"),
    app =        express(),
	bodyParser = require("body-parser"),
	mongoose =   require("mongoose"),
	Campground = require("./models/campground"),
	seedDB = require("./seeds");
	Comment = require("./models/comment");


mongoose.connect("mongodb://localhost/yelp_camp");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
seedDB();


/*Campground.create(	{ name: "Granite Hill", image: "https://farm5.staticflickr.com/4016/4369518024_0f64300987.jpg", description: "This is a huge granite hill, no bathrooms."}, function(err, campground){
	if(err){
		console.log(err);
	} else {
		console.log("newly created campground");
		console.log(campground);
	}
});
*/


app.get("/", function(req, res){
	res.render("landing");
});

// INDEX show all campgrounds
app.get("/campgrounds", function(req, res){
// Get all campgrounds from DB
Campground.find({}, function(err, allcampgrounds){
	if(err){
		console.log(err);
	} else {
		res.render("campgrounds/index", {campgrounds:allcampgrounds});
	}
});

});
// CREATE - add new campground
app.post("/campgrounds", function(req, res){
	var name = req.body.name;
	var image = req.body.image;
	var desc = req.body.description;
	var newCampground = {name: name, image: image, description:desc};
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
// NEW - show form to create a new campground
app.get('/campgrounds/new', function(req, res){
	res.render("campgrounds/new");
});

//SHOW route
app.get("/campgrounds/:id", function(req, res){
	// find campground with provided id
	Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
		if(err){
			console.log(err);
		}else {
		// render show template page
		res.render("campgrounds/show", {campground: foundCampground});
		}
	});
	
});


// ===============================
// COMMENTS ROUTES
//=================================
// NEW ROUTE
app.get("/campgrounds/:id/comments/new", function(req, res) {
	// find campground by id
	Campground.findById(req.params.id, function(err, campground){
		if(err){
			console.log(err);
		} else {
		res.render("comments/new", {campground: campground});
	}}
	);
});

//CREATE ROUTE
app.post("/campgrounds/:id/comments", function(req, res){
	// look up campground using id
	Campground.findById(req.params.id, function(err, campground){
		if(err){
			console.log(err);
			res.redirect("/campground");
		}else{
			Comment.create(req.body.comment, function(err, comment){
				if(err){
					console.log(err);
				}else {
					campground.comments.push(comment);
					campground.save();
					res.redirect("/campgrounds/" + campground._id);
				}
			});
		}
	});
	//create new comment
	//connect new comment to campground
	//redirect back to the show page of the campground
});


app.listen(3000, function(){
	console.log("The YelpServer has started!");
});

