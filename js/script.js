document.addEventListener('DOMContentLoaded', function() {

    // --- Mobile Hamburger Menu ---
    const hamburger = document.querySelector('.hamburger');
    const nav = document.querySelector('header nav');

    if (hamburger && nav) {
        hamburger.addEventListener('click', () => {
            nav.classList.toggle('active');
        });
    }

    // --- Event Slider ---
    const slides = document.querySelector('.event-slides');
    if (slides) {
        const slide = document.querySelectorAll('.event-slide');
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        let currentIndex = 0;
        const totalSlides = slide.length;

        function goToSlide(index) {
            if (index < 0) {
                index = totalSlides - 1;
            } else if (index >= totalSlides) {
                index = 0;
            }
            slides.style.transform = 'translateX(' + (-index * 100) + '%)';
            currentIndex = index;
        }

        if(nextBtn) {
            nextBtn.addEventListener('click', () => {
                goToSlide(currentIndex + 1);
            });
        }

        if(prevBtn){
            prevBtn.addEventListener('click', () => {
                goToSlide(currentIndex - 1);
            });
        }
    }

    // --- FAQ Accordion ---
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');

        if (question && answer) {
            question.addEventListener('click', () => {
                const isVisible = answer.style.display === 'block';
                // Close all answers
                document.querySelectorAll('.faq-answer').forEach(ans => {
                    ans.style.display = 'none';
                });
                // Toggle current answer
                if (!isVisible) {
                    answer.style.display = 'block';
                }
            });
        }
    });

    // --- Contact Form Submission ---
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            const message = formData.get('message');

            // Placeholder for submission logic
            console.log('Form Submitted:');
            console.log('Name:', name);
            console.log('Email:', email);
            console.log('Message:', message);

            alert('Thank you for your message, ' + name + '! We will get back to you shortly.');

            this.reset();
        });
    }

});
