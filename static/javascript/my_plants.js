let searchResult = [];

function handleDisplayMyPlants() {

    let userId = localStorage.getItem("userId")

    apiShowUserPlants(userId, function (result) {

        searchResult = result.data.results;
        console.log('searchResult', searchResult);
        console.log('commonName', searchResult[0].commonName);

        for (let i = 0; i < searchResult.length; i++) {
            let plant = searchResult[i];
            let scientificNameLi = document.createElement("li");
            let familyLi = document.createElement("li");
            let familyCommonNameLi = document.createElement("li");
            let genus = document.createElement("li");

            scientificNameLi.classList.add("card-text");
            scientificNameLi.innerText = "Scientific Name: " + plant.scientificName;

            familyLi.classList.add("card-text");
            familyLi.innerText = "Family: " + plant.family;

            familyCommonNameLi.classList.add("card-text");
            familyCommonNameLi.innerText = "Family Common Name: " + plant.familyCommonName;

            genus.classList.add("card-text");
            genus.innerText = "Genus: " + plant.genus;

            let plantUl = document.createElement("ul");
            plantUl.classList.add("pl-0");

            plantUl.append(scientificNameLi);
            plantUl.append(familyLi);
            plantUl.append(familyCommonNameLi);
            plantUl.append(genus);

            let addJournalBtn = document.createElement("button");
            addJournalBtn.classList.add("btn");
            addJournalBtn.classList.add("btn-secondary");
            addJournalBtn.classList.add("btn-sm");
            addJournalBtn.classList.add("mr-2");
            addJournalBtn.classList.add("mb-2");

            addJournalBtn.setAttribute("id", i);
            addJournalBtn.innerText = "Add Journal";

            let removePlantBtn = document.createElement("button");
            removePlantBtn.classList.add("btn");
            removePlantBtn.classList.add("btn-danger");
            removePlantBtn.classList.add("btn-sm");
            removePlantBtn.classList.add("mb-2");
            removePlantBtn.setAttribute("id", i);
            removePlantBtn.innerText = "Remove Plant";

            addJournalBtn.addEventListener("click", addButtonOnClick);
            removePlantBtn.addEventListener("click", addButtonOnClick);

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
            cardBody.append(removePlantBtn);

            let card = document.createElement("div");
            card.classList.add("card");
            card.classList.add("mb-2");

            let cardImage = document.createElement("img");
            cardImage.classList.add("card-img-top");

            if (plant.imageUrl != null) {
                cardImage.setAttribute("src", plant.imageUrl);
            } else {
                cardImage.setAttribute("src", "https://www.clipartkey.com/mpngs/m/158-1589123_plant-plants-overlay-doddle-black-white-simple-plant.png");
            };

            card.append(cardImage);
            card.append(cardBody);

            let cardDeck = document.getElementById("card-deck");
            cardDeck.append(card);
        }
    });
}

async function addButtonOnClick(evt) {
    console.log("HELOOOO WORRRRRLLLDDDD");

    evt.preventDefault();

    if (localStorage.length == 0) {
        window.location.href = '/login';
    } else {
        let userId = window.localStorage.getItem('userId');
        console.log("userID", userId);
        console.log("event.target.id", event.target.id);

        let plant = searchResult[parseInt(event.target.id)];
        console.log("plant", plant);

        let plantApiId = plant.plantApiId;
        let commonName = plant.commonName;
        let scientificName = plant.scientificName;
        let family = plant.family;
        let familyCommonName = plant.familyCommonName;
        let genus = plant.genus;
        let imageUrl = plant.imageUrl;

        let result = await apiShowUserPlants(userId);

        window.location.href = '/';
    }
}

handleDisplayMyPlants();
