var Spotify = require('node-spotify-api');

var spotify = new Spotify({
    id: < your spotify client id > ,
    secret: < your spotify client secret >
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