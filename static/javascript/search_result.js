let searchResult = [];

function handleSearch() {
    const queryString = window.location.search;
    console.log("queryString", queryString);
    const urlParams = new URLSearchParams(queryString);
    const query = urlParams.get("query");
    console.log("urlParams - query ", query);

    // let response = await apiSearch(query);
    // let result = response.data;
    // console.log('result', result);

    apiSearch(query, function (result) {
        // console.log('result', result);

        searchResult = result.data.results;
        console.log('searchResult', searchResult);
        console.log('commonName', searchResult[0].commonName);

        // for (let plant of searchResult) {
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

            let addPlantBtn = document.createElement("button");
            addPlantBtn.classList.add("btn");
            addPlantBtn.classList.add("btn-secondary");
            addPlantBtn.classList.add("btn-sm");
            // NEED TO SET ID TO THE INDEX OF THE ARRAY! 
            // addPlantBtn.setAttribute("id", searchResult.indexOf(plant));
            addPlantBtn.setAttribute("id", i);
            addPlantBtn.innerText = "Add Plant";

            addPlantBtn.addEventListener("click", addButtonOnClick);
            // document.getElementById("myBtn").addEventListener("click", displayDate);

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
            cardBody.append(addPlantBtn);

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

        let result = await apiAddPlants(userId, plantApiId, commonName, scientificName, family, familyCommonName, genus, imageUrl);

        window.location.href = '/';
    }
}

handleSearch();
