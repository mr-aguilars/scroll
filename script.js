const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

// Helper Function to Set Attributes on DOM Elements
function setAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}

// Check if all images we loaded
function imageLoaded() {
    imagesLoaded++
    console.log(imagesLoaded);
    if (imagesLoaded === totalImages) {
        ready = true;
        loader.hidden = true;
    }
}

// Create Elements for Links and Photos
function displayPhotos () {
    imagesLoaded = 0;
    totalImages = photosArray.length;
    // Run Function for each object in PhotosArray
    photosArray.forEach((photo) => {
        // Create <a> to link to Unsplash
        const item = document.createElement('a');
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank',
        });
        // Create <img> for photo
        const img = document.createElement('img');
        // Put <img> inside <a>, then put both inside imageContainer element
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description,
        });
        // Event Listener, check when each is finshed loading
        img.addEventListener('load', imageLoaded)
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}

// Unsplash API
const count = 30;
const apiKey = `z7tWkudyVWmYbTLSn1K6UXHOjF3PJ1GP30wSrRC1RDk`;
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// Get photos from API
async function getPhotos() {
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos()
    } catch (error) {
        // Catch Error
    }
}

// Check to see if scrolling near the bottom of the page, Load More Photos
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        ready = false;
        getPhotos();
    }
});

getPhotos();