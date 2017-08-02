var keys = require("./keys.js");
var fs = require("fs");
var command = process.argv[2];
var searchTerm = "";

var Twitter = require('twitter');

var omdbKey = keys.omdbKeys.apikey;
var client = new Twitter({
  consumer_key: keys.twitterKeys.consumer_key,
  consumer_secret: keys.twitterKeys.consumer_secret,
  access_token_key: keys.twitterKeys.access_token_key,
  access_token_secret: keys.twitterKeys.access_token_secret
});

var Spotify = require('node-spotify-api');

var spotify = new Spotify ({
  id: keys.spotifyKeys.consumer_key,
  secret: keys.spotifyKeys.consumer_secret,

});

// // functions
// // spotify function
function spotifySearch() {
	searchTerm = '"' + process.argv.slice(3).join(" ") + '"';
	console.log("Searching for " + searchTerm + "...\n");
	spotify
  .search({ type: 'track', query: searchTerm, limit: 1 })
  .then(function(response) {
    console.log(`
----------------------------------------------------------------------------------------
			You searched for the song: ${response.tracks.items[0].name} 
			The Artist is: ${response.tracks.items[0].album.artists[0].name}
			The Album is: ${response.tracks.items[0].album.name}
			Click here to hear a clip: ${response.tracks.items[0].external_urls.spotify}
    	`);

  })
  .catch(function(err) {
    return console.log('Error occurred: ' + err);
  });
  }

// function for twitter
function tweetFinder() {
	searchTerm = process.argv[3];
	console.log("Searching for tweets from " + searchTerm + "...\n");
	var params = {screen_name: searchTerm, count: 10};
client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {
for (var i=0; i<tweets.length; i++) {
  console.log("----------------------------------------------------------------------------------");
	console.log(tweets[i].created_at.slice(0,10) +": " +tweets[i].text+"\n");
}
 
  }
});
}
// function for omdb
function movieThis() {
	var request = require("request");
	searchTerm = '"' + process.argv.slice(3).join(" ") + '"';
	console.log("Searching for " + searchTerm + "...\n");

	if (searchTerm === '') {
		searchTerm = 'Mr. Nobody';
    console.log("-------------------------------------------------------------------------------------------")
		console.log("If you haven't seen Mr. Nobody, you should. It's great when you want to Netflix and Chill!");
		console.log("http://www.imdb.com/title/tt0485947/");

	}

// Then run a request to the OMDB API with the movie specified
request(("http://www.omdbapi.com/?t=" + searchTerm + "&y=&plot=short&apikey=" + omdbKey), function(error, response, body) {
  // If the request is successful (i.e. if the response status code is 200)
  if (!error && response.statusCode === 200) {
    // Parse the body of the site and recover just the imdbRating
    // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
    	if (process.argv[2] === undefined) {
    		console.log("enter a command and search term");
    	} else {
    console.log(`

	${JSON.parse(body).Title} came out in ${JSON.parse(body).Year}
	${JSON.parse(body).Title} was produced in ${JSON.parse(body).Country}
	${JSON.parse(body).Title} uses the following language(s): ${JSON.parse(body).Language}
	${JSON.parse(body).Title} has an IMDB Rating of ${JSON.parse(body).Ratings[0].Value} out of 10.
=======================================================================================================
Here is the plot for ${searchTerm}: 
	${JSON.parse(body).Plot}
=======================================================================================================
	${JSON.parse(body).Title} stars: ${JSON.parse(body).Actors}
	You can learn more about ${JSON.parse(body).Title} at this Rotten Tomatoes URL: ${JSON.parse(body).Website}
    	`);
  }
}
});
}

// function for instructions
function lazyUser() {
	// console.log("running instructions");
	fs.readFile("random.txt", "utf8", function(error, data) {
	if (error) {
		return console.log(error);
	}
		var dataList = data.split(",");
		command = 'spotify-this-song';
		searchTerm = dataList[1];
	console.log("Searching for " + searchTerm + "...\n");
	spotify
  .search({ type: 'track', query: searchTerm, limit: 1 })
  .then(function(response) {
    console.log(`
----------------------------------------------------------------------------------------
			You searched for the song: ${response.tracks.items[0].name} 
			The Artist is: ${response.tracks.items[0].album.artists[0].name}
			The Album is: ${response.tracks.items[0].album.name}
			Click here to hear a clip: ${response.tracks.items[0].external_urls.spotify}
    	`);

  })
  .catch(function(err) {
    return console.log('Error occurred: ' + err);
  });

	});
}

function instructions() {
	console.log("-------------------------------------------------------------------------");
  console.log("To activate a search, use the proper command. Review the readme.txt file.");
  console.log("-------------------------------------------------------------------------");
  	
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
    lazyUser();
    break;
  default:
  	instructions();
  	break;
}