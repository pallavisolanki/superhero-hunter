let favourites = [];
const publicKey = '3f755c4c6d18052ed620bd6ddd45a062';
const privateKey = '475834a74e33a2f3424dbae38ebb31c764b04161';
const ts = new Date().getTime().toString();
const hash = generateHash(ts, privateKey, publicKey);
const apiUrl = `https://gateway.marvel.com/v1/public/characters?ts=${ts}&apikey=${publicKey}&hash=${hash}`;


// Function to generate the hash
function generateHash(ts, privateKey, publicKey) {
    const stringToHash = ts + privateKey + publicKey;
    return CryptoJS.MD5(stringToHash).toString();
}

// Function to fetch data from the Marvel API
function fetchData(url) {
    return fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {

            return data.data.results;
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
};
//func to add fav heroes to the favourites.html page
function addToFavourites(superhero) {
    favourites.push(superhero);
    localStorage.setItem('favouriteHeros', JSON.stringify(favourites));
    alert("Added to favourites!");
    console.log(favourites);
}
// Function to render superheroes
export function renderSuperheroes(superheroes) {
    const resultContainer = document.querySelector('.result-container');
    resultContainer.innerHTML = ''; // Clear the previous content
    // Get the pathname of the current URL
    const currentPage = document.location.pathname;


    superheroes.forEach(superhero => {
        const box = document.createElement('div');
        box.classList.add('box');

        const name = document.createElement('p');
        name.classList.add('box-name');
        name.textContent = superhero.name;

        const img = document.createElement('img');
        img.classList.add('box-img');
        img.src = `${superhero.thumbnail.path}.${superhero.thumbnail.extension}`;

        const moreDetailsButton = document.createElement('button');
        moreDetailsButton.textContent = 'More details';
        moreDetailsButton.classList.add('more-details-button');

        const favouriteButton = document.createElement('button');
        favouriteButton.textContent = 'Favourite';
        favouriteButton.classList.add('favourite-button');



        const buttonsContainer = document.createElement('div');
        buttonsContainer.classList.add('buttons');
        buttonsContainer.appendChild(moreDetailsButton);
        buttonsContainer.appendChild(favouriteButton);


        box.appendChild(img);
        box.appendChild(name);
        box.appendChild(buttonsContainer);

        resultContainer.appendChild(box);
        //adding event listener to moredetails btn
        moreDetailsButton.addEventListener('click', () => {
            displaySuperheroDetails(superhero);
        });
        //adding e-listener to fav-btn:

        favouriteButton.addEventListener('click', (e) => {
            console.log(e);
            addToFavourites(superhero);
        });
        if (currentPage.includes('favourites.html')) {
            const removeButton = document.createElement('button');
            removeButton.textContent = 'Remove';
            removeButton.classList.add('remove-button');
            buttonsContainer.appendChild(removeButton);
            favouriteButton.style.display = "none"

            // Add event listener to remove button
            removeButton.addEventListener('click', () => {
                removeSuperhero(superhero);
            });
        }


        function removeSuperhero(superhero) {
            const index = superheroes.indexOf(superhero);
            if (index !== -1) {
                superheroes.splice(index, 1);
                renderSuperheroes(superheroes); // Re-render the list after removal

                // Update local storage
                localStorage.setItem('favouriteHeros', JSON.stringify(superheroes));
            }
        }
    });
};



// Function to handle search
function handleSearch(event) {
    const searchValue = event.target.value.toLowerCase();
    const filteredSuperheroes = superheroes.filter(superhero => superhero.name.toLowerCase().includes(searchValue));
    renderSuperheroes(filteredSuperheroes);
    console.log((filteredSuperheroes));
}

// Function to handle favourites button click
function handleFavouritesButtonClick() {
    document.location.href = 'favourites.html';
    renderSuperheroes(abcd) // Redirect to the favourites page
}
function handleHomeClick() {
    document.location.href = 'index.html'; // Redirect to the home page
}

// Add event listener to the search input field
const searchInput = document.querySelector('.search');
searchInput.addEventListener('input', handleSearch);

// Add event listener to the favourites button
const favouritesButton = document.querySelector('.nav-btn');
favouritesButton.addEventListener('click', handleFavouritesButtonClick);
const homeButton = document.querySelector('.nav-a');
homeButton.addEventListener('click', handleHomeClick);

// Initial fetch and render
let superheroes = [];
fetchData(apiUrl)
    .then(data => {
        // console.log(data);
        superheroes = data;
        // console.log(superheroes);
        renderSuperheroes(superheroes);
    });

export let abcd = JSON.parse(localStorage.getItem('favouriteHeros'));
//function to displaty superhero detials:
function displaySuperheroDetails(superhero) {
    const detailsContainer = document.querySelector('.result-container');
    detailsContainer.innerHTML = ''; // Clear previous content

    const img = document.createElement('img');
    img.src = `${superhero.thumbnail.path}.${superhero.thumbnail.extension}`;

    const description = document.createElement('p');
    description.textContent = superhero.description || 'No description available';


    detailsContainer.appendChild(img);
    detailsContainer.appendChild(description);


};




