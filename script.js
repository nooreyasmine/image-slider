const slides = document.querySelectorAll('.slide');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
let currentIndex = 0;

function showSlide(index) {
    // Remove active class from all slides
    slides.forEach(slide => slide.classList.remove('active'));
    // Add active class to the selected slide
    slides[index].classList.add('active');
}

prevBtn.addEventListener('click', () => {
    // If at the beginning, wrap around to the end
    currentIndex = (currentIndex > 0) ? currentIndex - 1 : slides.length - 1;
    showSlide(currentIndex);
});

nextBtn.addEventListener('click', () => {
    // If at the end, wrap around to the beginning
    currentIndex = (currentIndex < slides.length - 1) ? currentIndex + 1 : 0;
    showSlide(currentIndex);
});
