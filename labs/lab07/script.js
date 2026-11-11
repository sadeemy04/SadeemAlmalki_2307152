
// unsplash api key

const accessKey = "9B8cqLVpnkqgM-s0_oscSGW4-_tPhQSpG5kYYqEmJzI";

// html elements

const searchInput = document.getElementById("searchInput");
const gallery = document.getElementById("gallery");
const statusText = document.getElementById("status");

// create the api url

function getUrl() {
    const query = searchInput.value.trim();

    if (query === "") {
        statusText.textContent = "Please enter a search word.";
        return null;
    }

    return "https://api.unsplash.com/search/photos?query="
        + encodeURIComponent(query) + "&per_page=12";
}

// display photos using dom

function displayPhotos(data) {
    gallery.innerHTML = "";

    if (data.results.length === 0) {
        statusText.textContent = "No photos found.";
        return;
    }

    statusText.textContent = "";

    data.results.forEach(function(photo) {

        const card = document.createElement("div");
        card.className = "photo-card";

        const image = document.createElement("img");
        image.src = photo.urls.small;
        image.alt = photo.alt_description || "Unsplash photo";

        // photographer credit

        const credit = document.createElement("p");

        const photographer = document.createElement("a");
        photographer.href = photo.user.links.html
            + "?utm_source=sadeem_lab7&utm_medium=referral";
        photographer.textContent = photo.user.name;
        photographer.target = "_blank";

        const unsplash = document.createElement("a");
        unsplash.href = "https://unsplash.com/"
            + "?utm_source=sadeem_lab7&utm_medium=referral";
        unsplash.textContent = "Unsplash";
        unsplash.target = "_blank";

        credit.append("Photo by ", photographer, " on ", unsplash);

        card.appendChild(image);
        card.appendChild(credit);
        gallery.appendChild(card);
    });
}

// method 1: xmlhttprequest

function searchXHR() {
    const url = getUrl();
    if (url === null) return;

    statusText.textContent = "Loading photos...";

    const xhr = new XMLHttpRequest();

    xhr.open("GET", url, true);

    xhr.setRequestHeader(
        "Authorization",
        "Client-ID " + accessKey
    );

    xhr.onload = function() {
        if (xhr.status === 200) {
            const data = JSON.parse(xhr.responseText);
            displayPhotos(data);
        } else {
            statusText.textContent = "Error loading photos.";
        }
    };

    xhr.onerror = function() {
        statusText.textContent = "Network error.";
    };

    xhr.send();
}

// method 2: fetch with promises

function searchPromises() {
    const url = getUrl();
    if (url === null) return;

    statusText.textContent = "Loading photos...";

    fetch(url, {
        headers: {
            "Authorization": "Client-ID " + accessKey
        }
    })
    .then(function(response) {
        if (!response.ok) {
            throw new Error("Request failed");
        }
        return response.json();
    })
    .then(function(data) {
        displayPhotos(data);
    })
    .catch(function(error) {
        statusText.textContent = error.message;
    });
}

// method 3: fetch with async/await

async function searchAsync() {
    const url = getUrl();
    if (url === null) return;

    statusText.textContent = "Loading photos...";

    try {
        const response = await fetch(url, {
            headers: {
                "Authorization": "Client-ID " + accessKey
            }
        });

        if (!response.ok) {
            throw new Error("Request failed");
        }

        const data = await response.json();
        displayPhotos(data);

    } catch (error) {
        statusText.textContent = error.message;
    }
}

// mouse events

document.getElementById("xhrButton")
    .addEventListener("click", searchXHR);

document.getElementById("promiseButton")
    .addEventListener("click", searchPromises);

document.getElementById("asyncButton")
    .addEventListener("click", searchAsync);

// keyboard event

searchInput.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        searchAsync();
    }
});
