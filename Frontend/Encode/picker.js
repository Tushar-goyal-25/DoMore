document.addEventListener("DOMContentLoaded", function() {
    fetch('images.json')
        .then(response => response.json())
        .then(images => {
            document.getElementById('leftPhoto').src = images[0].src;
            document.getElementById('rightPhoto').src = images[1].src;
        })
        .catch(error => console.error('Error fetching images:', error));
});

let selectedCard = ''; // Variable to store the selected card

// Function to select the left or right card
function selectCard(card) {
    selectedCard = card;
}

// Function to submit and swap the photos
function submitSwap() {
    if (selectedCard === 'left') {
        fetchPhotosAndSwap('rightPhoto');
    } else if (selectedCard === 'right') {
        fetchPhotosAndSwap('leftPhoto');
    } else {
        alert('Please select a card before submitting.');
    }
}

// Function to fetch photos from JSON and swap with the specified photo element
function fetchPhotosAndSwap(photoElementId) {
    fetch('photos.json')
    .then(response => response.json())
    .then(images => {
        const imageSrc = images[0].src; // Assuming the JSON contains only one image
        document.getElementById(photoElementId).src = imageSrc;
    })
    .catch(error => console.error('Error fetching images:', error));
}
