async function handleSearch() {
    const queryString = window.location.search;
    console.log("queryString", queryString);
    const urlParams = new URLSearchParams(queryString);
    const query = urlParams.get("query");
    console.log("urlParams - query ", query);

    let response = await apiSearch(query);
    let result = response.data
    console.log('result', result)
}