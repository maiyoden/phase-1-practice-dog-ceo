console.log('%c HI', 'color: firebrick')
const imgUrl = "https://dog.ceo/api/breeds/image/random/4";
const breedUrl = "https://dog.ceo/api/breeds/list/all";

// Fetch dog images on page load
window.onload = function() {
    fetchDogImages();
    fetchDogBreeds();
};

// Function to fetch and display dog images
function fetchDogImages() {
    fetch(imgUrl)
        .then(response => response.json())
        .then(data => {
            const imagesContainer = document.getElementById('dog-image-container');
            data.message.forEach(imageUrl => {
                const img = document.createElement('img');
                img.src = imageUrl;
                img.alt = "A cute dog";
                img.style.width = '200px'; // Optional: Set a width for the images
                img.style.margin = '10px'; // Optional: Add some margin
                imagesContainer.appendChild(img);
            });
        })
        .catch(error => console.error('Error fetching dog images:', error));
}

// Function to fetch and display dog breeds
function fetchDogBreeds() {
    fetch(breedUrl)
        .then(response => response.json())
        .then(data => {
            const breedList = document.getElementById('dog-breeds');
            const breeds = Object.keys(data.message);
            breeds.forEach(breed => {
                const li = document.createElement('li');
                li.textContent = breed;
                li.addEventListener('click', () => {
                    li.style.color = 'blue'; // Change color on click
                });
                breedList.appendChild(li);
            });
        })
        .catch(error => console.error('Error fetching dog breeds:', error));
}

// Filter breeds based on selected letter
const breedDropdown = document.getElementById('breed-dropdown');

breedDropdown.addEventListener('change', function() {
    const selectedLetter = this.value;
    const breedList = document.getElementById('dog-breeds');
    const breeds = Array.from(breedList.children);

    breeds.forEach(breed => {
        if (selectedLetter === '' || breed.textContent.startsWith(selectedLetter)) {
            breed.style.display = 'list-item'; // Show breed
        } else {
            breed.style.display = 'none'; // Hide breed
        }
    });
});