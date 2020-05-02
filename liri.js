require("dotenv").config();
// variables
var keys = require("./keys.js");

// create objects
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var axios = require("axios");
var moment = require("moment");
var fs = require("fs");

// argv[2] choose user actions; argv[3] input paramter
var type = process.argv[2];
var term = process.argv.slice(3).join(" ");

function findConcerts(search) {
    console.log("Looking for your concerts... ");
    //default Ace of Base
    if (!search) {
        search = "Ace of Base"
    };
    var queryURL = "https://rest.bandsintown.com/artists/" + search + "/events?app_id=codingbootcamp";

    axios({
            method: 'get',
            url: queryURL
        })
        .then(function(res) {
            // Name of Venue, Location and Date
            // Use moment for date format MM/DD/YYYY
            console.log("--------------New Show Listing----------------\n");
            console.log(`Catch ${search} at: \n`);
            for (var i = 0, i < res.data.length; i++) {
                var venue = res.data[i].venue.name;
                var location = res.data[i].venue.city + ", " + res.data[i].venue.region;
                var date = moment(res.data[i].datetime).format("MM DD, YYYY");
                console.log(`${venue} in ${location} on ${date}`);
            }
            console.log("\n-------------------------");
        });
}

function searchSongs(search) {
    console.log("Looking for your song...");
    // default The Sign
    if (!search) {
        serach = "The Sign, Ace of Base";
    }
    spotify.search({
        type: 'track',
        query: search
    }, function(err, data) {
        if (err) {
            return console.log("Error Occurred: " + err);
        }
        var artists = data.tracks.items[0].album.artists[0].name;
        var track = data.tracks.items[0].name;
        var preview = data.tracks.items[0].preview_url;
        var album = data.tracks.items[0].album.name;
        console.log("-----------New Song----------\n");
        console.log(`Check out "${track}" off of the album '${album}' by '${artists}' here: ${preview}`);
        console.log("\n---------------------");
    });
}

// ------OMDB Movie------

// Title of the movie.
// Year the movie came out.
// IMDB Rating of the movie.
// Rotten Tomatoes Rating of the movie.
// Country where the movie was produced.
// Language of the movie.
// Plot of the movie.
// Actors in the movie.
function findMovies(search) {
    console.log("Looking for your movie....");
    if (!search) {
        search = "Mr. Nobody";
    };
    var queryURL = "http://www.omdbapi.com/?apikey=42518777&t=" + search;

    axios({
        method: 'get',
        url: queryURL
    }).then(function(res) {
        var title = res.data.Title;
        var year = res.data.Year;
        var imbdRating = res.data.Ratings[0].Value;
        var rating = res.data.Ratings[1].Value;
        var country = res.data.Country;
        var plot = res.data.Plot;
        var actors = res.data.Actors;
        console.log("------------------New Movie---------------\n");
        console.log(`${title} (${year}): ${plot} \nFilm produced in ${country} available in ${language}. Rated ${imdb} on IMDB and ${rotten} on Rotten Tomatoes. \nStarring: ${actors}.`);
        console.log("\n------------------------------");
    });
}

if (type === "concert-this") {
    findConcerts(term);
} else if (type === "spotify-this-song") {
    findSongs(term);
} else if (type === "movie-this") {
    findMovies(term);
} else if (type === "do-what-it-says") {
    fs.readFile("random.txt", function(err, data) {
        if (err) {
            return console.log(err);
        };
        var dataArr = data.split(",");
        var dataAction = dataArr[0];
        var dataTerm = dataArr[1];
        if (dataAction === "concert-this") {
            findConcerts(dataTerm);
        } else if (dataACtion === "movie-this") {
            findSongs(dataTerm);
        } else if (dataAction === "movie-this") {
            findMovies(dataTerm);
        } else {
            console.log("Error")
        }
    });
} else {
    console.log("Enter 'concert-this', 'spotify-this-song', 'movie-this', 'do-what-it-says'");
}