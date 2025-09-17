const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const header = document.querySelector('header');
const faqItems = document.querySelectorAll('.faq-item');
const eventSlides = document.querySelectorAll('.event-slide');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

// Toggle hamburger menu
hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('toggle');
});

// Header scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// FAQ Accordion
faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');

    question.addEventListener('click', () => {
        item.classList.toggle('active');
        if (item.classList.contains('active')) {
            answer.style.display = 'block';
        } else {
            answer.style.display = 'none';
        }
    });
});

// Events Slider
let slideIndex = 0;
let slideInterval;

const showSlides = (n) => {
    slideIndex = n;
    if (slideIndex >= eventSlides.length) {
        slideIndex = 0;
    }
    if (slideIndex < 0) {
        slideIndex = eventSlides.length - 1;
    }

    eventSlides.forEach(slide => slide.style.display = 'none');
    eventSlides[slideIndex].style.display = 'block';
}

const nextSlide = () => {
    showSlides(slideIndex + 1);
}

const prevSlide = () => {
    showSlides(slideIndex - 1);
}

const startSlider = () => {
    slideInterval = setInterval(nextSlide, 3000);
}

const stopSlider = () => {
    clearInterval(slideInterval);
}

nextBtn.addEventListener('click', () => {
    stopSlider();
    nextSlide();
    startSlider();
});

prevBtn.addEventListener('click', () => {
    stopSlider();
    prevSlide();
    startSlider();
});

showSlides(slideIndex);
startSlider();

// Donation Form Validation
const donationForm = document.querySelector('#donation-form form');

if (donationForm) {
    donationForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const firstName = donationForm.querySelector('input[placeholder="First Name"]');
        const lastName = donationForm.querySelector('input[placeholder="Last Name"]');
        const email = donationForm.querySelector('input[placeholder="Email Address"]');
        const amount = donationForm.querySelector('select');
        const customAmount = donationForm.querySelector('input[placeholder="Custom Amount"]');

        let isValid = true;

        if (firstName.value.trim() === '') {
            alert('Please enter your first name.');
            isValid = false;
        }

        if (lastName.value.trim() === '') {
            alert('Please enter your last name.');
            isValid = false;
        }

        if (email.value.trim() === '' || !/^\S+@\S+\.\S+$/.test(email.value)) {
            alert('Please enter a valid email address.');
            isValid = false;
        }

        if (amount.value === '') {
            alert('Please select a donation amount.');
            isValid = false;
        }

        if (amount.value === 'other' && customAmount.value.trim() === '') {
            alert('Please enter a custom donation amount.');
            isValid = false;
        }

        if (isValid) {
            alert('Thank you for your donation!');
            donationForm.reset();
        }
    });
}
