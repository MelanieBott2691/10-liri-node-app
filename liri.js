require("dotenv").config();
// variables
var keys = require("./keys.js");
var axios = require("axios");
var moment = require("moment");
var fs = require("fs");
// var request = require("request");
var Spotify = require('node-spotify-api');
var spotify = new Spotify({
    id: keys.spotify.id,
    secret: keys.spotify.secret,
});
// create the log.txt file
var defaultMovie = "Mr. Nobody";
// var filename = './log.txt';

// module to write output to console and log.txt at the same time
// var log = require('simple-node-logger').createSimpleFileLogger(filename);
// log.setLevel('all');

// Name of Venue, Location and Date
// Use moment for date format MM/DD/YYYY
// argv[2] choose user actions; argv[3] input paramter
var action = process.argv[2];
var value = process.argv[3];
// switch command
switch (action) {
    case "concert-this":
        getBands(value)
        break;
    case "spotify-this-song":
        getSongs(value)
        break;
    case "movie-this":
        if (value === "") {
            value = defaultMovie;
        }
        getMovies(value)
        break;
    case "do-what-it-says":
        doWhatItSays()
        break;
    default:
        break;
}

function getBands(artist) {
    axios.get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp")
        .then(function(response) {
            console.log("Name of the venue:", response.data[0].venue.name);
            console.log("Venue location:", response.data[0].venue.city);
            var eventDate = moment(response.data[0].datetime).format('MM/DD/YYYY');
            console.log("Date of the Event:", eventDate);
        })
        .catch(function(error) {
            console.log(error);
        });
}

// function to run spotify search
function getSongs(songName) {
    // var songName = value;

    // If no song is provided then your program will default to "The Sign" by Ace of Base
    if (songName === "") {
        songName = "The Sign";
    }
    spotify.search({
            type: "track",
            query: songName
        },
        function(err, data) {
            if (err) {
                console.log("Error occurred: " + err);
                return;
            }
            // Artist(s)
            console.log("Artist(s): ", data.tracks.items[0].album.artists[0].name);
            // The song's name
            console.log("Song Name: ", data.tracks.items[0].song.name[0].name);
            // Preview Link of Song from Spotify 
            console.log("Preview Link: ", data.tracks.items[0].preview_url);
            // The album that the song is from
            console.log("Album Name: ", data.tracks.items[0].album.name);
        });
}


// OMDB Movie
function getMovies(movieName) {
    axios.get("http://www.omdbapi.com/?apikey=42518777&t=" + movieName)
        .then(function(data) {
            var results =
                // Title of the movie.
                Title of the movie: $ { data.data.Title }
                // Year the movie came out.
            Year the movie came out: $ { data.data.Year }
                // IMDB Rating of the movie.
            IMDB Rating of the movie: $ { data.data.Rated }
                // Rotten Tomatoes Rating of the movie.
            Rotten Tomatoes Rating of the Movie: $ { data.data.Rating[1].Value }
                // Country where the movie was produced.
            Country where the movie was produced: $ { data.data.Country }
                // Language of the movie.
            Language of the movie: $ { data.data.Language }
                // Plot of the movie.
            Plot of the movie: $ { data.data.Plot }
                // Actors in the movie.
            Actors in the movie: $ { data.data.Actors };
            console.log(results);
        })
        .catch(function(error) {
            console.log(error);
        });
    if (movieName === "Mr. Nobody") {
        console.log("------------------");
        console.log("If you haven't watched 'Mr. Nobody,' then you should: http://www.imdb.com/title/tt0485947/");
        console.log("It's on Netflix!");
    };
}

function doWhatItSays() {
    fs.readFile("random.txt", "utf8", function(err, data) {
        data = data.split(",");
        var action = data[0]
        var value = data[1]
        switch (action) {
            case "concert-this":
                getBands(value)
                break;
            case "spotify-this-song":
                getSongs(value)
                break;
            case "movie-this":
                getMovies(value)
                break;
            default:
                break;
        }
    });
}


// queryUrl = "http://";
// request(queryUrl, function(error, response, body) {
//     if (!error && response.statusCode === 200) {
//         var body = JSON.parse(body);
//         logOutput("=============== Movie Info ===============");
//         logOutput("Title: " + body.Title);
//         logOutput("Release Year: " + body.Year);
//         logOutput("IMdb Rating: " + body.imbdRating);
//         logOutput("Rotten Tomatoes Rating: " + body.rottenTomatoes);
//         logOutput("Country: " + body.Country);
//         logOutput("Language: " + body.Language);
//         logOutput("Plot: " + body.Plot);
//         logOutput("Actors: " + body.Actors);
//     } else {
//         console.log("Error occurred.")
//     }

// });
// }



}
// call switch function
mySwitch(userCommand);

https: //github.com/bdavis127/Liri-Bot/blob/master/liri.js