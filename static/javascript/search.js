console.log("hello")
console.log("hello")
console.log("hello")
console.log("hello")
console.log("hello")

const $searchQuery = $("#search-query");
const $searchForm = $("#search-form");

// Grab data from the search field and make a call to the external API 
async function handleSearch(evt) {
    console.log("***********test***********")
    evt.preventDefault();

    let query = $searchQuery.val();
    // if (!query) return;
    console.log("***********START ***********")

    let response = await axios.get(`https://brown-thumb-api.herokuapp.com/search?query=${query}`)
    let result = response.data
    console.log('result', result)
    return result;
}

$searchForm.on("submit", handleSearch);