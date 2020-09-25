const HOST_API = "https://brown-thumb-api.herokuapp.com";
// const HOST_API = "http://127.0.0.1:5001/";
axios.defaults.headers.common['Authorization'] = localStorage.getItem("jwt")
console.log("JWT", localStorage.getItem("jwt"));

// Grab data from the search field and make a call to the external API 
function apiSearch(query, responseSuccess) {
    console.log("API - search")

    axios.get(`${HOST_API}/search?query=${query}`).then(response => {
        responseSuccess(response);
    });
}

// Grab data from the search field and make a call to the local API 
async function apiLogin(username, password) {
    let response = await axios.post(`${HOST_API}/users/login`, { "username": username, "password": password });

    if (response.data.errors) {
        window.localStorage.clear();
    } else {
        localStorage.setItem("userId", response.data.user.id);
        localStorage.setItem("username", response.data.user.username);
        localStorage.setItem("imageUrl", response.data.user.imageUrl);
        localStorage.setItem("jwt", response.data.jwt);
        axios.defaults.headers.common['Authorization'] = localStorage.getItem("jwt")
    }

    return response;
}

async function apiSignup(username, password, imageUrl) {

    let response = await axios.post(`${HOST_API}/users/signup`, { "username": username, "password": password, "imageUrl": imageUrl });
    console.log("apiSignup --- response", response);

    if (response.data.errors) {
        window.localStorage.clear();
    } else {
        localStorage.setItem("userId", response.data.user.id);
        localStorage.setItem("username", response.data.user.username);
        localStorage.setItem("imageUrl", response.data.user.imageUrl);
        localStorage.setItem("jwt", response.data.jwt);
        axios.defaults.headers.common['Authorization'] = localStorage.getItem("jwt")
    }

    return response;
}

async function apiEditUserProfile(userId, imageUrl) {

    let response = await axios.patch(`${HOST_API}/users/edit`, { "userId": userId, "imageUrl": imageUrl });

    localStorage.setItem("imageUrl", response.data.user.imageUrl);

    return response;
}

async function apiAddPlants(userId, plantApiId, commonName, scientificName, family, familyCommonName, genus, imageUrl) {
    console.log("apiAddPlants", userId);
    let config = {
        headers: {
            "Authorization": localStorage.getItem("jwt"),
        }
    }
    let response = await axios.post(`${HOST_API}/plants`, {
        "userId": userId, "plantApiId": plantApiId, "commonName": commonName, "scientificName": scientificName, "family": family, "familyCommonName": familyCommonName, "genus": genus, "imageUrl": imageUrl
    });

    return response;
}

function apiShowUserPlants(userId, responseSuccess) {
    console.log("API - apiShowUserPlants");

    axios.get(`${HOST_API}/plants/user/${userId}`).then(response => {
        responseSuccess(response);
    }).catch(error => {
        console.log("API - apiShowUserPlants - error", error);
    });
}

async function apiDeleteUserPlants(userPlantId) {

    let response = await axios.delete(`${HOST_API}/plants/${userPlantId}`);

    return response;
}

async function apiAddJournals(userPlantId, title, imageUrl, notes) {
    let response = await axios.post(`${HOST_API}/plants/${userPlantId}/journal`, { "title": title, "imageUrl": imageUrl, "notes": notes });

    return response;
}

function apiShowPlantJournal(userPlantId, responseSuccess) {
    console.log("API - apiShowPlantJournal");

    axios.get(`${HOST_API}/plants/${userPlantId}/journal`).then(response => {
        responseSuccess(response);
    });
}

async function apiDeletePlantJournal(plantJournalId) {

    let response = await axios.delete(`${HOST_API}/plants/${plantJournalId}/journal`);

    return response;
}

function apiShowPlant(userPlantId, responseSuccess) {
    console.log("API - apiShowPlant");

    axios.get(`${HOST_API}/plants/${userPlantId}`).then(response => {
        responseSuccess(response);
    });
}