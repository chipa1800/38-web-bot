let favoritePlaces = [];


const places = [
    {
        name: "Brazil",
        image: "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSVIOHhsHjqAVZT3jkKhaDO_HNsZMYE4Z-TOv7F9QPjC3O-Abu1",
        description: "Brazil is known for its tropical beaches, rainforests, and vibrant culture.",
    },
    {
        name: "Portugal",
        image: "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQgrIfgOj12pBYefpSc0kvxqsAULtHFbowl9EFf84vck4mCblpL",
        description: "Portugal is known for its historical landmarks, beautiful beaches, and delicious cuisine.",
    },
    {
        name: "Mexico",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Chichen_Itza_3.jpg/640px-Chichen_Itza_3.jpg",
        description: "Mexico offers a blend of modern cities, ancient ruins, and vibrant culture.",
    },
];


function generatePlaces() {
    const container = document.querySelector('.cards-container');
    container.innerHTML = '';  

    places.forEach(place => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
            <img src="${place.image}" alt="${place.name}">
            <div class="card-content">
                <h2>${place.name}</h2>
                <p>${place.description}</p>
                <div class="buttons">
                    <button class="visit-place" data-country="${place.name}" 
                        data-image="${place.image}" 
                        data-description="${place.description}">
                        Visit place
                    </button>
                    <button class="add-to-favorites" data-country="${place.name}" 
                        data-image="${place.image}" 
                        data-description="${place.description}">
                        Add To Favorites
                    </button>
                </div>
            </div>
        `;
        container.appendChild(card);
    });


    addEventListenersToButtons();
}


function addEventListenersToButtons() {
    const buttons = document.querySelectorAll('.visit-place');
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            const country = button.dataset.country;
            const image = button.dataset.image;
            const description = button.dataset.description;
            openModal(country, image, description);
        });
    });

    
    const favoriteButtons = document.querySelectorAll('.add-to-favorites');
    favoriteButtons.forEach(button => {
        button.addEventListener('click', function() {
            const country = button.dataset.country;
            const image = button.dataset.image;
            const description = button.dataset.description;
            addToFavorites(country, image, description);
        });
    });
}

function addToFavorites(name, image, description) {
    const favoritePlace = { name, image, description };

    
    if (!favoritePlaces.some(place => place.name === name)) {
        favoritePlaces.push(favoritePlace);
        alert(`${name} has been added to your favorites!`);
        generateFavorites();  
    } else {
        alert(`${name} is already in your favorites!`);
    }
}


function generateFavorites() {
    const container = document.querySelector('.favorites-container');
    container.innerHTML = '';  

    
    if (favoritePlaces.length === 0) {
        container.innerHTML = "<p>No favorites yet!</p>";  
    } else {
        favoritePlaces.forEach(place => {
            const card = document.createElement('div');
            card.classList.add('card');
            card.innerHTML = `
                <img src="${place.image}" alt="${place.name}">
                <div class="card-content">
                    <h2>${place.name}</h2>
                    <p>${place.description}</p>
                    <div class="buttons">
                        <button class="remove-from-favorites" data-country="${place.name}" data-image="${place.image}" data-description="${place.description}">
                            Remove
                        </button>
                    </div>
                </div>
            `;
            container.appendChild(card);
        });
    }


    addRemoveEventListeners();
}


function addRemoveEventListeners() {
    const removeButtons = document.querySelectorAll('.remove-from-favorites');
    removeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const country = button.dataset.country;
            favoritePlaces = favoritePlaces.filter(place => place.name !== country);  
            generateFavorites();  
        });
    });
}


function openModal(countryName, imageUrl, description) {
    document.getElementById('modal-title').textContent = countryName;
    document.getElementById('modal-image').src = imageUrl;
    document.getElementById('modal-description').textContent = description;
    modal.style.display = 'flex';
}


document.getElementById('search-favorite').addEventListener('input', function(event) {
    const searchTerm = event.target.value.toLowerCase();
    const filteredFavorites = favoritePlaces.filter(place => place.name.toLowerCase().includes(searchTerm));
    generateFilteredFavorites(filteredFavorites);
});


function generateFilteredFavorites(filteredFavorites) {
    const container = document.querySelector('.favorites-container');
    container.innerHTML = '';  

    filteredFavorites.forEach(place => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
            <img src="${place.image}" alt="${place.name}">
            <div class="card-content">
                <h2>${place.name}</h2>
                <p>${place.description}</p>
                <div class="buttons">
                    <button class="remove-from-favorites" data-country="${place.name}" data-image="${place.image}" data-description="${place.description}">
                        Remove
                    </button>
                </div>
            </div>
        `;
        container.appendChild(card);
    });


    addRemoveEventListeners();
}


document.getElementById('places-link').addEventListener('click', function(event) {
    event.preventDefault();
    document.querySelector('.places-section').style.display = 'block';
    document.querySelector('.favorites-section').style.display = 'none';
    document.getElementById('places-link').classList.add('active');
    document.getElementById('favorites-link').classList.remove('active');
});

document.getElementById('favorites-link').addEventListener('click', function(event) {
    event.preventDefault();
    document.querySelector('.places-section').style.display = 'none';
    document.querySelector('.favorites-section').style.display = 'block';
    document.getElementById('favorites-link').classList.add('active');
    document.getElementById('places-link').classList.remove('active');
});


generatePlaces();
generateFavorites();
