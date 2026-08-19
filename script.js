const slidesContainer = document.querySelector('.slides');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const zoomInBtn = document.getElementById('zoomInBtn');
const zoomOutBtn = document.getElementById('zoomOutBtn');

const imageUrlInput = document.getElementById('imageUrlInput');
const addImageBtn = document.getElementById('addImageBtn');
const imageFileInput = document.getElementById('imageFileInput');
const deleteImageBtn = document.getElementById('deleteImageBtn');
const noImagesMessage = document.getElementById('noImagesMessage');
const sliderContainer = document.querySelector('.slider-container');

let currentIndex = 0;
let currentScale = 1;

// Dynamically fetch slide elements on demand
function getSlides() {
    return document.querySelectorAll('.slide');
}

function showSlide(index) {
    const slides = getSlides();

    // Show empty state if there are no images
    if (slides.length === 0) {
        noImagesMessage.style.display = 'block';
        sliderContainer.style.display = 'none';
        return;
    } else {
        noImagesMessage.style.display = 'none';
        sliderContainer.style.display = 'block';
    }

    // Keep indices within range
    if (index >= slides.length) currentIndex = 0;
    if (index < 0) currentIndex = slides.length - 1;

    // Reset zoom when switching images
    currentScale = 1;
    slides.forEach((slide) => {
        slide.classList.remove('active');
        slide.style.transform = `scale(${currentScale})`;
    });
    slides[currentIndex].classList.add('active');
}

function applyZoom() {
    const slides = getSlides();
    if (slides.length > 0) {
        slides[currentIndex].style.transform = `scale(${currentScale})`;
    }
}

// Navigation Events
prevBtn.addEventListener('click', () => {
    currentIndex--;
    showSlide(currentIndex);
});

nextBtn.addEventListener('click', () => {
    currentIndex++;
    showSlide(currentIndex);
});

// Zoom Events
zoomInBtn.addEventListener('click', () => {
    if (currentScale < 3) {
        currentScale += 0.2;
        applyZoom();
    }
});

zoomOutBtn.addEventListener('click', () => {
    if (currentScale > 0.6) {
        currentScale -= 0.2;
        applyZoom();
    }
});

// Helper function to insert a new slide
function insertSlide(source, altText) {
    const newImg = document.createElement('img');
    newImg.src = source;
    newImg.alt = altText;
    newImg.classList.add('slide');

    slidesContainer.appendChild(newImg);

    const slides = getSlides();
    if (slides.length === 1) {
        currentIndex = 0;
        showSlide(currentIndex);
    } else {
        alert("Image added to the end of your slider!");
    }
}

// Add via Web URL
addImageBtn.addEventListener('click', () => {
    const url = imageUrlInput.value.trim();
    if (!url) {
        alert("Please enter a valid image URL first.");
        return;
    }
    insertSlide(url, "Web added slide");
    imageUrlInput.value = ''; // clear input
});

// Add via Local File Input
imageFileInput.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file) {
        // Create a temporary local URL for the selected system file
        const objectURL = URL.createObjectURL(file);
        insertSlide(objectURL, file.name);
        
        // Reset file input value so you can choose the same file again if desired
        imageFileInput.value = ''; 
    }
});

// Delete Current Image
deleteImageBtn.addEventListener('click', () => {
    const slides = getSlides();
    if (slides.length === 0) return;

    const activeSlide = slides[currentIndex];
    
    // If the image was uploaded locally, release the allocated memory URL
    if (activeSlide.src.startsWith('blob:')) {
        URL.revokeObjectURL(activeSlide.src);
    }

    activeSlide.remove();

    const remainingSlides = getSlides();
    if (remainingSlides.length === 0) {
        showSlide(0);
    } else {
        if (currentIndex >= remainingSlides.length) {
            currentIndex = remainingSlides.length - 1;
        }
        showSlide(currentIndex);
    }
});
