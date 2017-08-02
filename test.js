var songName = "yesterday";
var Spotify = require('node-spotify-api');

function callSpotify() {
  console.log("inside callSpotify");
  console.log(songName);
  var spotify = new Spotify({
    id: "6e4f3f6178c740e9a4934a0728a661c2",
    secret: "03fd06a3b5ff4f088366639db834651e"
  });
  console.log(spotify);
  // var getArtistNames = function(artist) {
  //    return artist.name;


 spotify.search({ type: 'track', query: songName }, function(err, data) {
    console.log("inside spotify.search");
    if (err) {
      return console.log('Error occurred: ' + err);
    }
  
    console.log(data);
  });
} //end call Spotify function

callSpotify();