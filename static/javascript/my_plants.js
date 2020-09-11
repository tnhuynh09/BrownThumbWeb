let myPlants = [];

function handleDisplayMyPlants() {
    let userId = localStorage.getItem("userId")

    apiShowUserPlants(userId, function (result) {

        myPlants = result.data.results;
        console.log('myPlants', myPlants);
        console.log('commonName', myPlants[0].commonName);

        document.getElementById("card-deck").innerHTML = "";

        for (let i = 0; i < myPlants.length; i++) {
            let plant = myPlants[i];
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

            let viewJournalsBtn = document.createElement("button");
            viewJournalsBtn.classList.add("btn");
            viewJournalsBtn.classList.add("btn-secondary");
            viewJournalsBtn.classList.add("btn-sm");
            viewJournalsBtn.classList.add("mr-2");
            viewJournalsBtn.classList.add("mb-2");

            viewJournalsBtn.setAttribute("id", i);
            viewJournalsBtn.innerText = "View Journals";

            let removePlantBtn = document.createElement("button");
            removePlantBtn.classList.add("btn");
            removePlantBtn.classList.add("btn-danger");
            removePlantBtn.classList.add("btn-sm");
            removePlantBtn.classList.add("mb-2");
            removePlantBtn.setAttribute("id", i);
            removePlantBtn.innerText = "Remove Plant";

            viewJournalsBtn.addEventListener("click", viewJournalsOnClick);
            removePlantBtn.addEventListener("click", removeUserPlantOnClick);

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
            cardBody.append(viewJournalsBtn);
            cardBody.append(removePlantBtn);

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

            let cardDeck = document.getElementById("card-deck");
            cardDeck.append(card);
        }
    });
}

async function removeUserPlantOnClick(evt) {
    let plant = myPlants[parseInt(event.target.id)];

    await apiDeleteUserPlants(plant.user_plant_id);
    handleDisplayMyPlants();
}

async function viewJournalsOnClick(evt) {
    let plant = myPlants[parseInt(event.target.id)];
    console.log("plant id", plant);
    window.location.href = '/journals/user-plant-id/' + plant.user_plant_id;
}

handleDisplayMyPlants();


