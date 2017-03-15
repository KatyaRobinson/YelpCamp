var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");
var data = [
			{
				name: "Shady Valley",
				image: "https://farm3.staticflickr.com/2259/2182093741_164dc44a24.jpg",
				description: "Enjoy your stay at the most beautiful place in Northern Pensylvania"
			},
			{
				name: "Sunset Dreams",
				image: "https://farm4.staticflickr.com/3872/14435096036_39db8f04bc.jpg",
				description: "Enjoy your stay at the most beautiful place in Northern Pensylvania"
			},
			{
				name: "Family Time",
				image: "https://farm3.staticflickr.com/2580/3942698066_9157ac5123.jpg",
				description: "Enjoy your stay at the most beautiful place in Northern Pensylvania"
			}

			];


function seedDB(){

	// remove all campgrounds

	Campground.remove({}, function(err){
	if(err){
		console.log(err);
	}else{
	console.log("removed campgrounds");
		// CREATE A FEW CAMPGROUNDS 	
	data.forEach(function(seed){
		Campground.create(seed, function(err, campground){
			if(err){
				console.log(err);
			}else {
				console.log("added a campground");
				// create a comment
				Comment.create({
					text: "This place is great",
					author: "Homer"
				}, function(err, comment){
					if(err) {
						console.log(err);
					}else {
					campground.comments.push(comment);
					campground.save();
					console.log("created new comment");
				}
				});
			}
		});
	});
}
	});




};

module.exports = seedDB;