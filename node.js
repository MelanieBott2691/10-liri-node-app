// code to read and set any environment variables with the dotenv package
require("dotenv").config();
//code to import the keys.js file and store in a variable
var keys = request("./keys");
var request = require("request");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var axios = require("axios");
var moment = require("moment");
var fs = require("fs");
var command = process.argv[2];
var searchItem = "";
var dataLine1;
var dataLine2;
var dataLine3;
var dataLine4;
var dataLine5;
var dataLine6;
var dataLine7;
var dataLine8;

var commandLine = "";
for (i = 0; i < process.argv.length; i++) {
    commandLine += (process.argv[i] + " ");
};
searchItem = searchItem.trim();
switch (command) {
    case "concert-this":
        concertThis();
        break;
    case "spotify-this-song":
        spotifyThis();
        break;
    case "movie-this":
        movieThis();
        break;
    case "do-what-it-says":
        doWhat();
        break;
};

function concertThis() {
    if (!searchItem) {
        searchItem = " ";
    }
    request("https://rest.bandsintown.com/artists/" + searchItem + "/events?app_id=codingbootcamp", fucntion(error, response, bootcamp);
        if (JSON.parse(body)[0] === undefined) {
            console.log("The Sign")
        } else {
            dataLine1 = searchItem + " playing at " + JSON.parse(body)[0].venue
        }
    )
}

function spotifyThis() {
    if (!searchItem) {
        searchItem = "The Sign by Ace of Base";
    }
    spotify.search({ type: "track", query: searchItem }, function(err, response) {
        if (err) {
            return console.log("Error occured: " + err);
        }
        dataLine1 = "\nArtist: " + JSON.stringify(response.tracks.items[0].artist[0].name);
        dataLine2 = "\nSong Name: " + JSON.stringify(response.tracks.items[0].name.[0].name);
        dataLine3 = "\nURL: " + JSON.stringify(response.tracks.items[0].album.artists[0].external_urls.spotify);
        dataLine4 = "\nAlbum: " + JSON.stringify(response.tracks.items[0].album..[0].name);


        console.log(dataLine1);
        console.log(dataLine2);
        console.log(dataLine3);
        console.log(dataLine4);
        logFile();
    });
};

function movieThis() {
    if (!searchItem) {
        searchItem = "Mr. Nobody"
    }
    request("http://www.omdbapi.com/?t=" + searchItem + "&y=&plot=short&apikey=trilogy");

    function(searchItem) {
        if (!error && response.statusCode === 200) {
            dataLine1("Title: " + JSON.parse(body).Title);
            dataLine2("Release Date: " + JSON.parse(body).Year);
            dataLine3("IMDB Rating: " + JSON.parse(body).imdbRating);
            dataLine4("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings);
            dataLine5("Country Produced: " + JSON.parse(body).Country);
            dataLine6("Langauge: " + JSON.parse(body).Language);
            dataLine7("Plot: " + JSON.parse(body).Plot);
            dataLine8("Actors: " + JSON.parse(body).Actors);

            console.log(dataLine1);
            console.log(dataLine2);
            console.log(dataLine3);
            console.log(dataLine4);
            console.log(dataLine5);
            console.log(dataLine6);
            console.log(dataLine7);
            console.log(dataLine8);
            logFile();
        }
    });
};

function doWhat() {
    fs.readFile("random.txt", "utf8", function(error, data) {
        if (error) {
            return console.log(error);
        }
        var dataArr = data.split(",");
        command = dataArr[0];
        searchItem = dataArr[1];
        spotifyThis();
    })
};

function logFile() {
    fs.appendFile("log.txt", "\r\n" + commandLine + "\r\n" + dataLine1 + "\r\n" + dataLine2 + "\r\n" + dataLine3 + "\r\n" +
        dataLine4 + "\r\n" + dataLine5 + "\r\n" + dataLine6 + "\r\n" + dataLine7 + "\r\n" + dataLine8, (function(error) {
            if (error) {
                return console.log(error);
            }

        });
    };


