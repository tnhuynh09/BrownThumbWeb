const HOST_API = "https://brown-thumb-api.herokuapp.com/";
// const HOST_API = "http://127.0.0.1:5000/";

// Grab data from the search field and make a call to the external API 
async function apiSearch(query) {
    console.log("API - search")
    let response = await axios.get(`${HOST_API}search?query=${query}`)
    // let result = response.data
    // console.log('result', result)
    return response;
}

async function apiLogin(username, password) {
    let response = await axios.post(`${HOST_API}search?query=${query}`)
    // let result = response.data
    // console.log('result', result)
    return response;
}