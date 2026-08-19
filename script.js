const slidesContainer = document.querySelector('.slides');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const zoomInBtn = document.getElementById('zoomInBtn');
const zoomOutBtn = document.getElementById('zoomOutBtn');

const imageUrlInput = document.getElementById('imageUrlInput');
const addImageBtn = document.getElementById('addImageBtn');
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

    // If there are no slides, show empty state message and hide the slider
    if (slides.length === 0) {
        noImagesMessage.style.display = 'block';
        sliderContainer.style.display = 'none';
        return;
    } else {
        noImagesMessage.style.display = 'none';
        sliderContainer.style.display = 'block';
    }

    // Keep the index bounds clean
    if (index >= slides.length) currentIndex = 0;
    if (index < 0) currentIndex = slides.length - 1;

    // Reset zoom scale back to normal on transition
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

// Navigation Triggers
prevBtn.addEventListener('click', () => {
    currentIndex--;
    showSlide(currentIndex);
});

nextBtn.addEventListener('click', () => {
    currentIndex++;
    showSlide(currentIndex);
});

// Zoom Triggers
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

// Add Image Trigger
addImageBtn.addEventListener('click', () => {
    const url = imageUrlInput.value.trim();
    if (!url) {
        alert("Please enter a valid image URL first.");
        return;
    }

    // Create new image element
    const newImg = document.createElement('img');
    newImg.src = url;
    newImg.alt = "User added slide";
    newImg.classList.add('slide');

    // Append to the list
    slidesContainer.appendChild(newImg);
    imageUrlInput.value = ''; // clear input

    const slides = getSlides();
    if (slides.length === 1) {
        // If the slider was empty, show this new slide immediately
        currentIndex = 0;
        showSlide(currentIndex);
    } else {
        alert("Image added to the end of your slider!");
    }
});

// Delete Image Trigger
deleteImageBtn.addEventListener('click', () => {
    const slides = getSlides();
    if (slides.length === 0) return;

    // Remove the current active slide element from DOM
    const activeSlide = slides[currentIndex];
    activeSlide.remove();

    const remainingSlides = getSlides();
    if (remainingSlides.length === 0) {
        showSlide(0); // Triggers empty state setup
    } else {
        // Adjust index if we deleted the very last slide
        if (currentIndex >= remainingSlides.length) {
            currentIndex = remainingSlides.length - 1;
        }
        showSlide(currentIndex);
    }
});
