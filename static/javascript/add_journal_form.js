let titleInput = document.getElementById("inputTitle");
let imageUrlInput = document.getElementById("inputImageUrl");
let notesInput = document.getElementById("inputNotes");
let addJournalBtn = document.getElementById("add-journal-btn");


addJournalBtn.addEventListener("click", addJournalOnClick);

async function addJournalOnClick(evt) {
    evt.preventDefault();

    let title = titleInput.value;
    let imageUrl = imageUrlInput.value;
    let notes = notesInput.value;

    // Grab the query string from the URL
    const queryString = window.location.search;
    console.log("queryString", queryString);
    const urlParams = new URLSearchParams(queryString);
    const userPlantId = urlParams.get("user-plant-id");
    console.log("urlParams - user-plant-id ", userPlantId);

    await apiAddJournals(userPlantId, title, imageUrl, notes);

    window.location.href = '/journals?user-plant-id=' + userPlantId;
}
