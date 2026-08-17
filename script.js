const slides = document.querySelectorAll('.slide');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const zoomInBtn = document.getElementById('zoomInBtn');
const zoomOutBtn = document.getElementById('zoomOutBtn');

let currentIndex = 0;
let currentScale = 1; // 1 represents 100% normal scale

function showSlide(index) {
    // Reset zoom scale back to normal (1) when slide changes
    currentScale = 1;
    slides.forEach(slide => {
        slide.classList.remove('active');
        slide.style.transform = `scale(${currentScale})`; // Reset scale CSS on all slides
    });
    slides[index].classList.add('active');
}

// Function to apply the active scale to the active slide
function applyZoom() {
    const activeSlide = slides[currentIndex];
    activeSlide.style.transform = `scale(${currentScale})`;
}

// Next/Previous triggers
prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex > 0) ? currentIndex - 1 : slides.length - 1;
    showSlide(currentIndex);
});

nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex < slides.length - 1) ? currentIndex + 1 : 0;
    showSlide(currentIndex);
});

// Zoom triggers
zoomInBtn.addEventListener('click', () => {
    if (currentScale < 3) { // Setting a maximum zoom limit of 3x
        currentScale += 0.2;
        applyZoom();
    }
});

zoomOutBtn.addEventListener('click', () => {
    if (currentScale > 0.6) { // Setting a minimum zoom limit of 0.6x
        currentScale -= 0.2;
        applyZoom();
    }
});
