const $searchQuery = $("#search-query");
const $searchForm = $("#search-form");

// Grab data from the search field and make a call to the external API 
async function handleSearch(evt) {
    evt.preventDefault();

    let query = $searchQuery.val();

    if (!query) return;
    window.location.href = '/search-result?query=' + query
}

$searchForm.on("submit", handleSearch);