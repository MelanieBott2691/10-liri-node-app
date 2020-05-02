// code to read and set any environment variables with the dotenv package
require("dotenv").config();
//code to import the keys.js file and store in a variable
var keys = request("./keys");
var request = require("request");
var Spotify = require('node-spotify-api');
var dataFormat = require("dataFormat");
var fs = require("fs");

//search the Bands in Town Artists Events
var concertThis = function(artist) {
    var region = "";
    var queryURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";

    request(queryURL, function(err, response, body) {
        if (!err && response.statusCode === 200) {
            var concertThis = JSON.parse(body)
            outputData(artist + " concert information:");
            for (i = 0; i < concertInfo.length; i++) {
                region = concertInfo[i].venur.region;
                if (region === "") {
                    region = concertInfo[i].venue.country;
                }
                // render information about each event to the terminal
                // Name of the venue
                // Venue location
                // Date of the Event (use moment to format this as "MM/DD/YYYY")

                outputData("Venue: " + concertInfo[i].venue.name);
                outputData("Location: " + concertInfo[i].venue.city + ", " + region);
                outputData("Date: " + dateFormat(concertInfo[i].datetime, "mm/dd/yyyy"));
            }
        }
    });
};

// This will show the following information about the song in the terminal/bash window
// Artist(s)
// The song's name
// preview link of the song from Spotify
// the album that the song is from
// If no song is provided then your program will default to "The Sign" by Ace of Base
var spotifyThisSong = function(song) {
    if (!song) {
        song = "The Sign Ace of Base"
    }
    var spotify = new Spotify(keys.spotify);
    spotify.search({ type: "track", query: song, limit: 1 }, function(err, data) {
        if (err) {
            return console.log(err);
        }
        var songInfo = data.tracks.items[0];
        outputData(song.Info.artist[0].name);
        outputData(songInfo.name);
        outputData(songInfo.album.name);
        outputData(songInfo.preview_url);

    });
};

// node liri.js movie-this '<movie name here>'
// *Title of movie
// *Year the movie came out
// *IMDB Rating of the movie
// *Rotten Tomatoes Rating of the movie
// *Country where the movie was produced
// *Langague of the movie
// *Plot of the movie
// *Actors in the movie

// If user doesn't type in a movie, the program will output data for the movie "Mr. Nodbody"
var movieThis = function(movie) {
    if (!movie) {
        movie = "Mr. Nobody";
    }
    var queryURL = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy";
    http: //www.omdbapi.com/?apikey=[yourkey]&
        http: //img.omdbapi.com/?apikey=[yourkey]&

        request(queryURL, function(err, response, body) {
                if (!err && response.statusCode === 200) {
                    var movieInfo = JSON.parse(body);

                    // render information about each event to the terminal
                    // *Title of movie
                    // *Year the movie came out
                    // *IMDB Rating of the movie
                    // *Rotten Tomatoes Rating of the movie
                    // *Country where the movie was produced
                    // *Langague of the movie
                    // *Plot of the movie
                    // *Actors in the movie
                    outputData("Venue: " + concertInfo[i].venue.name);
                    outputData("Location: " + concertInfo[i].venue.city + ", " + region);
                    outputData("Date: " + dateFormat(concertInfo[i].datetime, "mm/dd/yyyy"));
                }
            }
        })
}
// You will utilize the node-spotify-api package in order to retrieve song information from the Spotify API.


// The Spotify API requires you sign up as a developer to generate the necessary credentials. You can follow these steps in order to generate a client id and client secret:

var spotify = new Spotify(keys.spotify); {
    id: < 2634 fe2bd92b4a679078292c8734b18d > ,
    secret: < fee2db7f37ac4ba18c0e6bcd1c8f3436 >
});

spotify.search({ type: 'track', query: 'All the Small Things' }, function(err, data) {
    if (err) {
        return console.log('Error occurred: ' + err);
    }

    console.log(data);
});

// axious Performing GET request
const axios = require('axios');

// Make a request for a user with a given ID
axios.get('/user?ID=12345')
    .then(function(response) {
        // handle success
        console.log(response);
    })
    .catch(function(error) {
        // handle error
        console.log(error);
    })
    .finally(function() {
        // always executed
    });

// Optionally the request above could also be done as
axios.get('/user', {
        params: {
            ID: 12345
        }
    })
    .then(function(response) {
        console.log(response);
    })
    .catch(function(error) {
        console.log(error);
    })
    .finally(function() {
        // always executed
    });

// Want to use async/await? Add the `async` keyword to your outer function/method.
async function getUser() {
    try {
        const response = await axios.get('/user?ID=12345');
        console.log(response);
    } catch (error) {
        console.error(error);
    }
}
// axios Performing a POST request
axios.post('/user', {
        firstName: 'Fred',
        lastName: 'Flintstone'
    })
    .then(function(response) {
        console.log(response);
    })
    .catch(function(error) {
        console.log(error);
    });

//   axios Performing multiple concurrent requests
function getUserAccount() {
    return axios.get('/user/12345');
}

function getUserPermissions() {
    return axios.get('/user/12345/permissions');
}

axios.all([getUserAccount(), getUserPermissions()])
    .then(axios.spread(function(acct, perms) {
        // Both requests are now complete
    }));