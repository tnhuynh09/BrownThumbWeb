let myPlantJournals = [];
const queryString = window.location.search;
console.log("queryString", queryString);
const urlParams = new URLSearchParams(queryString);
const userPlantId = urlParams.get("user-plant-id");
console.log("urlParams - user-plant-id ", userPlantId);

function handleDisplayPlant() {
    apiShowPlant(userPlantId, function (result) {

        plant = result.data.result;

        let scientificNameLi = document.createElement("li");
        let familyLi = document.createElement("li");
        let familyCommonNameLi = document.createElement("li");
        let genusLi = document.createElement("li");

        scientificNameLi.classList.add("card-text");
        scientificNameLi.innerText = "Scientific Name: " + plant.scientificName;

        familyLi.classList.add("card-text");
        familyLi.innerText = "Family: " + plant.family;

        familyCommonNameLi.classList.add("card-text");
        familyCommonNameLi.innerText = "Family Common Name: " + plant.familyCommonName;

        genusLi.classList.add("card-text");
        genusLi.innerText = "Genus: " + plant.genus;

        let plantUl = document.createElement("ul");
        plantUl.classList.add("pl-0");

        plantUl.append(scientificNameLi);
        plantUl.append(familyLi);
        plantUl.append(familyCommonNameLi);
        plantUl.append(genusLi);

        let addJournalBtn = document.createElement("button");
        addJournalBtn.classList.add("btn");
        addJournalBtn.classList.add("btn-secondary");
        addJournalBtn.classList.add("btn-sm");

        addJournalBtn.setAttribute("id", "add-journal-btn");
        addJournalBtn.innerText = "Add Journal";

        addJournalBtn.addEventListener("click", addJournalOnClick);

        let cardBody = document.createElement("div");
        cardBody.classList.add("card-body");

        let cardTitle = document.createElement("h5");
        cardTitle.classList.add("card-title");

        if (plant.commonName != null) {
            cardTitle.innerText = plant.commonName
        } else {
            cardTitle.innerText = "-"
        };

        cardBody.append(cardTitle);
        cardBody.append(plantUl);
        cardBody.append(addJournalBtn);

        let card = document.createElement("div");
        card.classList.add("card");
        card.classList.add("mb-2");

        let cardImage = document.createElement("img");
        cardImage.classList.add("card-img-top");

        if (plant.imageUrl != null) {
            cardImage.setAttribute("src", plant.imageUrl);
        } else {
            cardImage.setAttribute("src", "http://brown-thumb-api.herokuapp.com/static/images/plant-default.png");
        };

        card.append(cardImage);
        card.append(cardBody);

        let cardDeck = document.getElementById("card-deck-plant");
        cardDeck.append(card);
    });
}

function handleDisplayJournals() {
    apiShowPlantJournal(userPlantId, function (result) {

        myPlantJournals = result.data.results;
        console.log('myPlantJournals', myPlantJournals);

        document.getElementById("card-deck-journal").innerHTML = "";

        for (let i = 0; i < myPlantJournals.length; i++) {
            let journal = myPlantJournals[i];

            var date_format_ms = Date.parse(journal.date);
            var date_format = new Date(date_format_ms)

            parsed_date = date_format.toLocaleDateString()
            console.log("DATE", parsed_date);

            let dateLi = document.createElement("li");
            let notesLi = document.createElement("li");

            dateLi.classList.add("card-text");
            dateLi.innerText = "Date: " + parsed_date;

            notesLi.classList.add("card-text");
            notesLi.innerText = "Notes: " + journal.notes;

            let journalUl = document.createElement("ul");
            journalUl.classList.add("pl-0");

            journalUl.append(dateLi);
            journalUl.append(notesLi);

            //     let editJournalsBtn = document.createElement("button");
            //     editJournalsBtn.classList.add("btn");
            //     editJournalsBtn.classList.add("btn-secondary");
            //     editJournalsBtn.classList.add("btn-sm");
            //     editJournalsBtn.classList.add("mr-2");
            //     editJournalsBtn.classList.add("mb-2");

            //     editJournalsBtn.setAttribute("id", i);
            //     editJournalsBtn.innerText = "View Journals";

            let removeJournalBtn = document.createElement("button");
            removeJournalBtn.classList.add("btn");
            removeJournalBtn.classList.add("btn-danger");
            removeJournalBtn.classList.add("btn-sm");
            removeJournalBtn.classList.add("mb-2");
            removeJournalBtn.setAttribute("id", i);
            removeJournalBtn.innerText = "Remove Journal";

            //     editJournalsBtn.addEventListener("click", addJournalsOnClick);
            removeJournalBtn.addEventListener("click", removePlantJournalOnClick);

            let cardBody = document.createElement("div");
            cardBody.classList.add("card-body");

            let cardTitle = document.createElement("h5");
            cardTitle.classList.add("card-title");

            cardTitle.innerText = journal.title;

            cardBody.append(cardTitle);
            cardBody.append(journalUl);
            //     cardBody.append(addJournalsBtn);
            cardBody.append(removeJournalBtn);

            let card = document.createElement("div");
            card.classList.add("card");
            card.classList.add("mb-2");

            let cardImage = document.createElement("img");
            cardImage.classList.add("card-img-top");

            if (journal.imageUrl != null) {
                cardImage.setAttribute("src", journal.imageUrl);
            } else {
                cardImage.setAttribute("src", "http://brown-thumb-api.herokuapp.com/static/images/journal-default.jpeg");
            };

            card.append(cardImage);
            card.append(cardBody);

            let cardDeck = document.getElementById("card-deck-journal");
            cardDeck.append(card);
        }
    });
}

function addJournalOnClick(evt) {
    window.location.href = '/journals/add?user-plant-id=' + userPlantId;
}

async function removePlantJournalOnClick(evt) {
    let journal = myPlantJournals[parseInt(event.target.id)];

    await apiDeletePlantJournal(journal.id);
    handleDisplayJournals();
}

handleDisplayPlant();
handleDisplayJournals();