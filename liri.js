require("dotenv").config();
// variables
var keys = require("./keys.js");
var fs = require("fs");
var request = require("request");
var Spotify = require('node-spotify-api');
// create the log.txt file
var filename = './log.txt';
// module to write output to console and log.txt at the same time
var log = require('simple-node-logger').createSimpleFileLogger(filename);
log.setLevel('all');


// argv[2] choose user actions; argv[3] input paramter
var userCommand = process.argv[2];
var secondCommand = process.argv[3];
for (var i = 4; i < process.argv.length; i++) {
    secondCommand += '+' + process.argv[1];
}

// get spotify keys
var spotify = new Spotify(keys.spotify);
var getArtistNames = function(artist) {
    return artist.name;
};

// function to run spotify search
var getSpotify = function(songName) {
    if (songName === undefined) {
        songName = "What's my age again?";
    }
    spotify.search({
            type: "track",
            query: userCommand
        },
        function(err, data) {
            if (err) {
                console.log("Error occurred: " + err);
                return;
            }
            var songs = data.tracks.items;
            for (var i = 0; i < songs.length; i++) {
                console.log(i);
                console.log("artist(s): " + songs[i].artists.map(getArtistNames));
                console.log("song name: " + songs[i].name);
                console.log("preview song: " + songs[i].preview_url);
                console.log("album: " + songs[i].album.name);
                console.log("-------------------------");
            }
        }
    );
};

// switch command
function mySwitch(userCommand) {
    switch (userCommand) {

        case "spotify-this-song":
            getSpotify();
            break;

        case "movie-this":
            getMovie();
            break;
        case "do-what-it-says":
            doWhat();
            break;
    }

    // OMDB Movie
    function getMovie() {
        var movieName = secondCommand;
        var queryUrl = "http://";
        request(queryUrl, function(error, response, body) {
            if (!error && response.statusCode === 200) {
                var body = JSON.parse(body);
                logOutput("=============== Movie Info ===============");
                logOutput("Title: " + body.Title);
                logOutput("Release Year: " + body.Year);
                logOutput("IMdb Rating: " + body.imbdRating);
                logOutput("Rotten Tomatoes Rating: " + body.rottenTomatoes);
                logOutput("Country: " + body.Country);
                logOutput("Language: " + body.Language);
                logOutput("Plot: " + body.Plot);
                logOutput("Actors: " + body.Actors);
            } else {
                console.log("Error occurred.")
            }
            if (movieName === "Mr. Nobody") {
                console.log("------------------");
                console.log("If you haven't watched 'Mr. Nobody,' then you should: http://www.imdb.com/title/tt0485947/");
                console.log("It's on Netflix!");
            }
        });
    }

    function doWhat() {
        fs.readFile("random.txt", "utf8", function(error, data) {
            if (!error);
            console.log(data.toString());
            var cmds = data.toString().split(',');
        });
    }

}
// call switch function
mySwitch(userCommand);