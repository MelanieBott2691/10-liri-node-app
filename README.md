# 10-nodejs-LIRI-Bot

# LIRI Bot

 https://melaniebott2691.github.io/10-liri-node-app/
 
### Built With
- node.js
- JavaScript

### Prerequisites
- Bands in Town
- spotify
- OMDB
- Moment.js
- axios

### About
- In this assignment I made LIRI, which is similar to iPhone's SIRI (Speech Interpretation and Recognition Interface). LIRI is a Language Interpretation and Recognition Interface. LIRI will be a command line node app that takes in parameters and gives you back data.

### Resources
###### Getting Started
The following dependecines have been installed (-npm install...):
- axios 
 - makes HTTP requests
- dotenv
  - hides API keys
- moment
  - formats times
- node-spotify-api
  - retrieves song information
- OMDB API
  - retriees movie information
- Bands in Town API
  - retrieves show information
- package json file
  - returns upcoming shows, album information, production details and reads the random.txt file and inputs the informaiton to the console

#### Expected Outcomes
LITI Bot is designed to take in one of the following commands and produce different search results:

- node liri.js concert-this
    - "artists/band name"
        - Name of venue
        - Venue lcation
        - Date of the event in MM/DD/YYYY format

<video src="concertthis.mov" poster="concertscreenshot.png" width="320" height="200" controls preload></video>

- node liri.js spotify-this-song
  - "song/track name"
    - Artist(s)
    - Song
    - Spotify song preview url
    - Album

<video src="spotifysong.mov" poster="concertscreenshot.png" width="320" height="200" controls preload></video>

- node liri.js movie-this
  - "movie title"
    - Title of the movie
    - Year the movie came out
    - IMDB Rating of the movie
    - Rotten Tomatoes Rating of the movie
    - Country where the movie was produced
    - Language of the movie
    - Plot of the movie
    - Actors in the movie

<video src="moviethis.mov" poster="moviescreenshot.png" width="320" height="200" controls preload></video>

- node liri.js do-what-it-says
  - Reads commands from random.txt file. The default contains the "spotify-this-song" command with "I Want it That Way", but this command can be changed to any commands above.

<video src="dowhatitsays.mov" poster="concertscreenshot.png" width="320" height="200" controls preload></video>

<video src="logtxt.mov" poster="logscreenshot.png" width="320" height="200" controls preload></video>

##### Files Used
- liri.js
- random.txt
- log.txt
- keys.js
- package.json
- .gitignore 
- node_modules
- .DS_Store
- .env
- README.md

## Screenshot Images of LIRI BOT

##### Concert This
![Command Line](/examples/concertscreenshot.png)

 <video width="600" controls>
 <source src="concertthis.mov" type="video/mov></video>

##### Movie This
![Command Line](/examples/moviesscreenshot.png)

 <video width="600" controls>
 <source src="moviethis.mov" type="video/mov></video>

##### Do What It Says
![Command Line](/examples/do1.png)
![Command Line](/examples/do2.png)

 <video width="400" controls>
 <source src="/examples/dowhatitsays.mov" type="video/mov></video>

##### Log
![Command Line](/examples/logscreenshot.png)

 <video width="600" controls>
 <source src="logtxt.mov" type="video/mov></video>
                                
##### Spotify This
![Command Line](/examples/spotify2.png)
![Command Line](/examples/spotify1.png)

 <video width="600" controls>
 <source src="/examples/spotifysong.mov" type="video/mov></video>

