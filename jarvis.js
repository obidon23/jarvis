var keys = require("./keys.js");
var fs = require("fs");
var command = process.argv[2];
var searchTerm = "";

var Twitter = require('twitter');
 
var client = new Twitter({
  consumer_key: keys.twitterKeys.consumer_key,
  consumer_secret: keys.twitterKeys.consumer_secret,
  access_token_key: keys.twitterKeys.access_token_key,
  access_token_secret: keys.twitterKeys.access_token_secret
});

// var Spotify = require('node-spotify-api');
// console.log(Spotify);


// var spotify = new Spotify ({
//   id: keys.spotifyKeys.consumer_id,
//   secret: keys.spotifyKeys.consumer_secret,

// });

// // // functions
// // // spotify function
// function spotifySearch() {
// 	spotify
//   .search({ type: 'track', query: '"'+searchTerm+'"' })
//   .then(function(response) {
//     console.log(response);
//   })
//   .catch(function(err) {
//     return console.log('Error occurred: ' + err);
//   });
//   }

// function for twitter
function tweetFinder() {
	searchTerm = process.argv[3];
	var params = {screen_name: searchTerm};
client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {
for (var i=0; i<tweets.length; i++) {
	console.log(tweets[i].created_at.slice(0,10) +": " +tweets[i].text+"\n");
}
 
  }
});
}
// function for omdb
function movieThis() {
	var request = require("request");
	searchTerm = process.argv[3];
	if (searchTerm === '') {
		searchTerm = 'Mr. Nobody';
		console.log("If you haven't seen Mr. Nobody, you should. It's great when you want to Netflix and Chill!");
		console.log("http://www.imdb.com/title/tt0485947/");

	}
	console.log(process.argv);
// Then run a request to the OMDB API with the movie specified
request("http://www.omdbapi.com/?t=" + searchTerm + "&y=&plot=short&apikey=" + keys.omdbKey.apiKey +"", function(error, response, body) {
  // If the request is successful (i.e. if the response status code is 200)
  if (!error && response.statusCode === 200) {
    // Parse the body of the site and recover just the imdbRating
    // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
    	if (process.argv[2] === undefined) {
    		console.log("enter a command and search term");
    	} else {
    console.log(`

Title of the movie.
	${searchTerm} came out in ${JSON.parse(body).Year}
	${searchTerm} was produced in ${JSON.parse(body).Country}
	${searchTerm} uses the following language(s): ${JSON.parse(body).Language}
	${searchTerm} has an IMDB Rating of ${JSON.parse(body).Ratings[0].Value} out of 10.
==================
	Here is the plot for ${searchTerm}: ${JSON.parse(body).Plot}
==================
	${searchTerm} stars ${JSON.parse(body).Actors}
	You can learn more about ${searchTerm} at this Rotten Tomatoes URL: ${JSON.parse(body).Website}
    	`);
  }
}
});
}

// function for instructions
function instructions(){
	// console.log("running instructions");
	fs.readFile("random.txt", "utf8", function(error, data) {
	if (error) {
		return console.log(error);
	}
		var dataList = data.split(",");
		console.log(dataList[0]);
		console.log(dataList[1]);

		command = dataList[0];
		searchTerm = dataList[1];
		spotifySearch();
	});
}
//calls
 
switch(command) {
  case "movie-this":
    movieThis();
    break;
  case "spotify-this-song":
    spotifySearch();
    break;
  case "twitter":
    tweetFinder();
    break;
  case "do-what-it-says":
    instructions();
    break;
  
}