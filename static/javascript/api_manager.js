const HOST_API = "https://brown-thumb-api.herokuapp.com/";
// const HOST_API = "http://127.0.0.1:5000/";

// Grab data from the search field and make a call to the external API 
async function apiSearch(query) {
    console.log("API - search")
    let response = await axios.get(`${HOST_API}search?query=${query}`)
    return response;
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
