require("dotenv").config();

var keys = require('./keys.js');
var fs = require("fs");
var Spotify = require("node-spotify-api");
var request = require("request");
var imdb = require("imbd-api");


// ============================== CONCERT SEARCH ==================================== //
// ------------------------------- concert-this ------------------------------------ //
/* 1. node liri.js concert-this '<artist/>band name here>'
    This will search the Bands in Town Artist Events API ("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp") for an artist and render the following information about each event to the terminal:
        * Name of venue
        * Venue location
        * Date of the Event (moment format as "MM/DD/YYYY") */

function concertInfo(search) {
    console.log("Looking for your concert search...");
    /* if the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody' */
    if (!search) {
        search = "Celine Dion";
        console.log("If you haven't watched 'Mr. Nobody,' then you should: http://www.imdb.com/title/tt0485947/");
    }
    // Then run a request with axios to the OMDB API with the movie specified
    var queryUrl = "https://rest.bandsintown.com/artists/" + search + "/events?app_id=codingbootcamp";

    // This line is just to help us debug against the actual URL.
    console.log(queryUrl);

    axios.get(queryUrl).then(
        function(response) {
            console.log(response);
            var concertInfo = [
                '\n---------------------------------------------',
                'Venue: ' + response.data[0].venue.name,
                'Location ' + response.data[0].venue.city + ", " + response.data[i].venue.region,
                'Date: ' + moment(response.data[0].datetime).format("MM DD, YYYY"),
            ].join('\n');
            fs.appendFile('log.txt', concertInfo + '\n\n', function(err) {
                if (err) {
                    throw err;
                }
                console.log("\n-------------------------------");
            });
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

function songInfo(search) {
    console.log("Looking for your song...");
    /* if no song is provided use default "The Sign" by Ace of Base.*/
    if (!songName) {
        songName = "The Sign";
        console.log("The Sign by Ace of Base");
    }
    spotify.search({
            type: 'track',
            query: songName
        }, function(err, data) {
            if (err) {
                return console.log("Error occurred: " + err);
            }
        }
        .then(
            function(response) {
                console.log(response);
                var songInfo = [
                    '\n---------------------------------------------',
                    'Artists: ' + data.tracks.items[0].album.artists[0].name,
                    'Track ' + data.tracks.items[0].name,
                    'Preview: ' + data.tracks.items[0].preview_url,
                    'Album ' + data.tracks.items[0].album.name,
                    console.log("-----------New Song----------\n"),
                    // console.log(`Check out "${track}" off of the album '${album}' by '${artists}' here: ${preview}`);
                    console.log("\n---------------------"),
                ].join('\n');
                fs.appendFile('log.txt', songInfo + '\n\n', function(err) {
                    if (err) {
                        throw err;
                    }
                    console.log("\n-------------------------------");

                });
            })
    );
}


// ============================== OMDB MOVIE SEARCH ==================================== //
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
function movieInfo(movieName) {
    console.log("Looking for your movie...")
        /* if the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody' */
    if (!movieName) {
        movieName = "Mr. Nobody";
        console.log("If you haven't watched 'Mr. Nobody,' then you should: http://www.imdb.com/title/tt0485947/");
    }
    // Then run a request with axios to the OMDB API with the movie specified
    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

    // This line is just to help us debug against the actual URL.
    console.log(queryUrl);

    axios.get(queryUrl).then(
        function(response) {
            console.log(response);
            var movieInfo = [
                '\n---------------------------------------------',
                'Movie Title: ' + response.data[0].Title,
                'Year Released: ' + response.data[0].Year,
                'IMBDRating: ' + response.data.Ratings[0].Value,
                'Rotten Tomatoes Rating: ' + response.data.Ratings[1].Value,
                'Country Produced: ' + response.data[0].Country,
                'Plot: ' + response.data[0].Plot,
                'Actors: ' + response.data[0].Actors,
            ].join('\n');
            fs.appendFile('log.txt', movieInfo + '\n\n', function(err) {
                if (err) {
                    throw err;
                }
            });
        });
}

// ============================== DO WHAT IT SAYS ==================================== //
// ------------------------------ do-what-it-says ----------------------------------- //
/* 4. node liri.js do-what-it-says
 * using the fs node package, LIRI will take the text inside or random.txt and use it to call one of LIRI's commands.
 ** it should run spotify-this-song for "I Want it That Way"
 ** Edit the text in random.text to test out the feature for movie-this and concert-this */



// ============================== BONUS ==================================== //
// ----------------------------- log.txt ---------------------------------- //
/* 
 *in addition to logging the data to the terminal/bash window, output the data to a .txt file called log.txt
 * make sure you append each commands you run
 * do not overwrite your file each time you run a command */