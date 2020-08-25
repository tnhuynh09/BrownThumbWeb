let myPlantJournals = [];
const queryString = window.location.search;
console.log("queryString", queryString);
const urlParams = new URLSearchParams(queryString);
const userPlantId = urlParams.get("user-plant-id");
console.log("urlParams - user-plant-id ", userPlantId);

function handleDisplayJournals() {
    apiShowPlantJournal(userPlantId, function (result) {

        myPlantJournals = result.data.results;
        console.log('myPlantJournals', myPlantJournals);

        document.getElementById("card-deck-journal").innerHTML = "";

        for (let i = 0; i < myPlantJournals.length; i++) {
            let journal = myPlantJournals[i];
            let notesLi = document.createElement("li");

            notesLi.classList.add("card-text");
            notesLi.innerText = "Notes: " + journal.notes;

            let journalUl = document.createElement("ul");
            journalUl.classList.add("pl-0");

            journalUl.append(notesLi);

            //     let viewJournalsBtn = document.createElement("button");
            //     viewJournalsBtn.classList.add("btn");
            //     viewJournalsBtn.classList.add("btn-secondary");
            //     viewJournalsBtn.classList.add("btn-sm");
            //     viewJournalsBtn.classList.add("mr-2");
            //     viewJournalsBtn.classList.add("mb-2");

            //     viewJournalsBtn.setAttribute("id", i);
            //     viewJournalsBtn.innerText = "View Journals";

            let removeJournalBtn = document.createElement("button");
            removeJournalBtn.classList.add("btn");
            removeJournalBtn.classList.add("btn-danger");
            removeJournalBtn.classList.add("btn-sm");
            removeJournalBtn.classList.add("mb-2");
            removeJournalBtn.setAttribute("id", i);
            removeJournalBtn.innerText = "Remove Journal";

            //     viewJournalsBtn.addEventListener("click", viewJournalsOnClick);
            removeJournalBtn.addEventListener("click", removePlantJournalOnClick);

            let cardBody = document.createElement("div");
            cardBody.classList.add("card-body");

            let cardTitle = document.createElement("h5");
            cardTitle.classList.add("card-title");

            cardTitle.innerText = journal.title;

            cardBody.append(cardTitle);
            cardBody.append(journalUl);
            //     cardBody.append(viewJournalsBtn);
            cardBody.append(removeJournalBtn);

            let card = document.createElement("div");
            card.classList.add("card");
            card.classList.add("mb-2");

            let cardImage = document.createElement("img");
            cardImage.classList.add("card-img-top");

            if (journal.imageUrl != null) {
                cardImage.setAttribute("src", journal.imageUrl);
            } else {
                cardImage.setAttribute("src", "https://www.clipartkey.com/mpngs/m/158-1589123_plant-plants-overlay-doddle-black-white-simple-plant.png");
            };

            card.append(cardImage);
            card.append(cardBody);

            let cardDeck = document.getElementById("card-deck-journal");
            cardDeck.append(card);
        }
    });

}

let addJournalBtn = document.getElementById("add-journal-btn");
addJournalBtn.addEventListener("click", addJournalOnClick);

function addJournalOnClick(evt) {
    console.log("HELOOOO WORRRRRLLLDDDD");

    window.location.href = '/journals/add?user-plant-id=' + userPlantId;
}


async function removePlantJournalOnClick(evt) {
    let journal = myPlantJournals[parseInt(event.target.id)];
    console.log("plant", journal.id);

    await apiDeletePlantJournal(journal.id);
    handleDisplayJournals();
}

// async function viewJournalsOnClick(evt) {
//     console.log("viewJournalsOnClick");
//     let plant = myPlantJournals[parseInt(event.target.id)];
//     console.log("plant id", plant);
//     window.location.href = '/journals?user-plant-id=' + plant.user_plant_id;
// }

handleDisplayJournals();