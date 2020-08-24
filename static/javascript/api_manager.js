const HOST_API = "https://brown-thumb-api.herokuapp.com/";
// const HOST_API = "http://127.0.0.1:5000/";

// Grab data from the search field and make a call to the external API 
function apiSearch(query, responseSuccess) {
    console.log("API - search")
    // let response = await axios.get(`${HOST_API}search?query=${query}`)
    // return response;

    axios.get(`${HOST_API}search?query=${query}`).then(response => {
        responseSuccess(response);
        // console.log("API - search ", response);
    });
}

// Grab data from the search field and make a call to the local API 
async function apiLogin(username, password) {
    console.log("BEFOREEE ********");
    let response = await axios.post(`${HOST_API}/users/login`, { "username": username, "password": password });
    // let result = response.data

    // save user id and user name and image url to session?
    console.log("apiLogin --- response", response);
    localStorage.setItem("userId", response.data.user.id);
    localStorage.setItem("username", response.data.user.username);

    return response;
}

async function apiSignup(username, password, imageUrl) {

    let response = await axios.post(`${HOST_API}/users/signup`, { "username": username, "password": password, "imageUrl": imageUrl });

    // save user id and user name and image url to session?
    // localStorage.setItem("user", ;
    console.log("apiSignup --- response", response);
    localStorage.setItem("userId", response.data.user.id);
    localStorage.setItem("username", response.data.user.username);

    return response;
}

async function apiAddPlants(userId, plantApiId, commonName, scientificName, family, familyCommonName, genus, imageUrl) {

    let response = await axios.post(`${HOST_API}/plants`, { "userId": userId, "plantApiId": plantApiId, "commonName": commonName, "scientificName": scientificName, "family": family, "familyCommonName": familyCommonName, "genus": genus, "imageUrl": imageUrl });

    return response;
}

function apiShowUserPlants(userId, responseSuccess) {
    console.log("API - apiShowUserPlants");

    axios.get(`${HOST_API}/plants/user/${userId}`).then(response => {
        responseSuccess(response);
    });
}

async function apiDeleteUserPlants(userPlantId) {

    let response = await axios.delete(`${HOST_API}/plants/${userPlantId}`);

    return response;
}
