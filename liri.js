require("dotenv").config();
var keys = require('./keys.js');
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);
var fs = require("fs");
var moment = require("moment");
var axios = require("axios");
var term = process.argv[3];
var action = process.argv[2];


// ============================== CONCERT SEARCH ==================================== //
// ------------------------------- concert-this ------------------------------------ //
/* 1. node liri.js concert-this '<artist/>band name here>'
    This will search the Bands in Town Artist Events API ("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp") for an artist and render the following information about each event to the terminal:
        * Name of venue
        * Venue location
        * Date of the Event (moment format as "MM/DD/YYYY") */

function concertThis() {
    console.log("Looking for your concert search...");
    /* if the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody' */
    if (!term) {
        term = "Ellie Goulding";
    } else {
        term = process.argv.slice(3).join(" ");
    }
    // Run a request with axios to the OMDB API with the movie specified
    var queryUrl = "https://rest.bandsintown.com/artists/" + term + "/events?app_id=codingbootcamp";

    // This line is just to help us debug against the actual URL.

    axios.get(queryUrl).then(
            function(response) {
                // console.log(response.data);
                var concertInfo = [
                    '\n---------------------------------------------',
                    'Venue: ' + response.data[0].venue.name,
                    'Location ' + response.data[0].venue.city + ", " + response.data[0].venue.region,
                    'Date: ' + moment(response.data[0].datetime).format("L"),
                ].join('\n');
                console.log(concertInfo);
                fs.appendFile('./log.txt', concertInfo + '\n\n', function(err) {
                    if (err) {
                        return console.log(err);
                    }
                    console.log("\n-------------------------------");
                });
            })
        .catch(function(error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log("---------------Data---------------");
                console.log(error.response.data);
                console.log("---------------Status---------------");
                console.log(error.response.status);
                console.log("---------------Status---------------");
                console.log(error.response.headers);
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an object that comes back with details pertaining to the error that occurred.
                console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log("Error", error.message);
            }
            console.log(error.config);
        });
}
// ============================== SPOTIFY SEARCH ==================================== //
// ----------------------------- spotify-this-song ---------------------------------- //
/* 2. node liri.js spotify-this-song '<song name here>'
This will output the following:
        * Artist(s)
        * The song's name
        * A preview of the song from Spotify
        * The album that the song is from */
function findSong() {
    // this.findSong = function(songName) {
    console.log("Looking for your song...");
    var songName = process.argv.slice(3).join(" ");
    /* if no song is provided use default "The Sign" by Ace of Base.*/
    if (!songName) {
        songName = "The Sign";
        console.log("The Sign by Ace of Base");
    }
    spotify.search({ type: 'track', query: songName }, function(err, data) {
        if (err) {
            return console.log("Error occurred: " + err);
        }

        console.log(data.tracks);
        var songInfo = [
            '\n---------------------------------------------',
            'Artists: ' + data.tracks.items[0].album.artists[0].name,
            'Track: ' + data.tracks.items[0].name,
            'Preview: ' + data.tracks.items[0].preview_url,
            'Album: ' + data.tracks.items[0].album.name,
            console.log("-----------New Song----------\n"),
            // console.log(`Check out "${track}" off of the album '${album}' by '${artists}' here: ${preview}`);
            console.log("\n---------------------"),
        ].join('\n');
        console.log(songInfo);
        fs.appendFile('log.txt', songInfo + '\n\n', function(err) {
            if (err) {
                return console.log(err);
            }
            console.log("\n-------------------------------");
        });
    });
}

// ============================== IMDB MOVIE SEARCH ==================================== //
// ---------------------------------- movie-this -------------------------------------- //
/* 3. node liri.js movie-this '<movie name here>'
    This will output the following:
        * Title of the movie
        * Year the movie came out
        * IMDB Rating of the movie
        * Rotten Tomatoes Rating of the movie
        * Country where the movie was produced
        * Languaged of the movie
        * Plot of the movie
        * Actors in the movie */
function findMovie() {
    console.log("Looking for your movie...");
    if (process.argv[3]) {
        term = process.argv.slice(3).join(" ");

    } else {
        term = "Mr. Nobody";
        console.log("If you haven't watched 'Mr. Nobody,' then you should: http://www.imdb.com/title/tt0485947/" + "It's on Netflix!");
    }
    // Run a request with axios to the OMDB API with the movie specified
    var queryUrl = "http://www.omdbapi.com/?t=" + term + "&y=&plot=short&tomatoes&apikey=trilogy";

    // This line is just to help us debug against the actual URL.
    // console.log(queryUrl);
    /* if the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody' */

    axios.get(queryUrl).then(
            function(response) {
                var movieInfo = [
                    '\n---------------------------------------------',
                    'Movie Title: ' + response.data.Title,
                    'Year Released: ' + response.data.Year,
                    'IMBDRating: ' + response.data.imdbRatings,
                    'Rotten Tomatoes Rating: ' + response.data.Ratings[1].Value,
                    'Country Produced: ' + response.data.Country,
                    'Plot: ' + response.data.Plot,
                    'Actors: ' + response.data.Actors,
                ].join('\n');
                console.log(movieInfo);
                fs.appendFile('./log.txt', movieInfo + '\n\n', function(err) {
                    if (err) {
                        return console.log(err);
                    }
                });
            })
        .catch(function(error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log("---------------Data---------------");
                console.log(error.response.data);
                console.log("---------------Status---------------");
                console.log(error.response.status);
                console.log("---------------Status---------------");
                console.log(error.response.headers);
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an object that comes back with details pertaining to the error that occurred.
                console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log("Error", error.message);
            }
            console.log(error.config);
        });
}

// ============================== DO WHAT IT SAYS ==================================== //
// ------------------------------ do-what-it-says ----------------------------------- //
/* 4. node liri.js do-what-it-says
 * using the fs node package, LIRI will take the text inside or random.txt and use it to call one of LIRI's commands.
 ** it should run spotify-this-song for "I Want it That Way"
 ** Edit the text in random.text to test out the feature for movie-this and concert-this */

function doWhat() {
    fs.readFile('./random.txt', "utf8", function(err, data) {
        if (err) {
            return console.log(err);
        }
        action = data.split(",")[0];
        process.argv[3] = JSON.parse(data.split(",")[1]);
        // console.log(process.argv[3]);
        switch (action) {
            case "movie-this":
                findMovie();
                break;
            case "concert-this":
                concertThis();
                break;
            case "spotify-this-song":
                findSong();
                break;
        }
    });
}

switch (action) {
    case "movie-this":
        findMovie();
        break;
    case "concert-this":
        concertThis();
        break;
    case "spotify-this-song":
        findSong();
        break;
    case "do-what-it-says":
        doWhat();
        break;
}


// ============================== BONUS ==================================== //
// ----------------------------- log.txt ---------------------------------- //
/* 
 *in addition to logging the data to the terminal/bash window, output the data to a .txt file called log.txt
 * make sure you append each commands you run
 * do not overwrite your file each time you run a command */