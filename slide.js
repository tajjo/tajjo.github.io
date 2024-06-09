let currentSlide = 0;

function showSlide(index) {
    const slides = document.querySelector('.slides');
    const totalSlides = document.querySelectorAll('.slide').length;
    if (index >= totalSlides) {
        currentSlide = 0;
    } else if (index < 0) {
        currentSlide = totalSlides - 1;
    } else {
        currentSlide = index;
    }
    const offset = -currentSlide * 100;
    slides.style.transform = 'translateX(' + offset + '%)';
    updatePagination();
}

function prevSlide() {
    showSlide(currentSlide - 1);
}

function nextSlide() {
    showSlide(currentSlide + 1);
}

function updatePagination() {
    const dots = document.querySelectorAll('.pagination div');
    dots.forEach((dot, index) => {
        if (index === currentSlide) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
}

function initPagination() {
    const totalSlides = document.querySelectorAll('.slide').length;
    const pagination = document.getElementById('pagination');
    for (let i = 0; i < totalSlides; i++) {
        const dot = document.createElement('div');
        dot.addEventListener('click', () => showSlide(i));
        pagination.appendChild(dot);
    }
    updatePagination();
}

function openPopup() {
    document.getElementById('overlay').style.display = 'block';
    document.getElementById('popup').style.display = 'flex';
    showSlide(0);
}    

function closePopup() {
    document.getElementById('popup').style.display = 'none';
    document.getElementById('overlay').style.display = 'none';
}

document.addEventListener('DOMContentLoaded', function() {
    initPagination();
});
