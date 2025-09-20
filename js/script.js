// DOM Elements
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");
const header = document.querySelector("header");
const faqItems = document.querySelectorAll(".faq-item");
const statNumbers = document.querySelectorAll(".stat-number");
const sections = document.querySelectorAll("section");
const particlesContainer = document.getElementById("particles");

// Initialize everything when DOM loads
document.addEventListener("DOMContentLoaded", function () {
  initializeParticles();
  initializeAnimations();
  initializeCounters();
  initializeScrollEffects();
});

// Hamburger Menu Toggle
hamburger?.addEventListener("click", () => {
  navLinks.classList.toggle("active");
  hamburger.classList.toggle("toggle");
});

// Close mobile menu when clicking on a link
document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("active");
    hamburger.classList.remove("toggle");
  });
});

// Header Scroll Effect
let lastScrollY = window.scrollY;
window.addEventListener("scroll", () => {
  const currentScrollY = window.scrollY;

  if (currentScrollY > 50) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }

  // Hide/show header on scroll
  if (currentScrollY > lastScrollY && currentScrollY > 100) {
    header.style.transform = "translateY(-100%)";
  } else {
    header.style.transform = "translateY(0)";
  }

  lastScrollY = currentScrollY;
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      const headerHeight = header.offsetHeight;
      const targetPosition = target.offsetTop - headerHeight - 20;

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    }
  });
});

// FAQ Accordion Functionality
faqItems.forEach((item) => {
  const question = item.querySelector(".faq-question");
  const answer = item.querySelector(".faq-answer");
  const icon = question.querySelector("i");

  question.addEventListener("click", () => {
    const isActive = item.classList.contains("active");

    // Close all other FAQ items
    faqItems.forEach((otherItem) => {
      if (otherItem !== item) {
        otherItem.classList.remove("active");
        const otherAnswer = otherItem.querySelector(".faq-answer");
        const otherIcon = otherItem.querySelector(".faq-question i");
        otherAnswer.style.maxHeight = "0";
        otherIcon.classList.remove("fa-minus");
        otherIcon.classList.add("fa-plus");
      }
    });

    // Toggle current item
    if (isActive) {
      item.classList.remove("active");
      answer.style.maxHeight = "0";
      icon.classList.remove("fa-minus");
      icon.classList.add("fa-plus");
    } else {
      item.classList.add("active");
      answer.style.maxHeight = answer.scrollHeight + "px";
      icon.classList.remove("fa-plus");
      icon.classList.add("fa-minus");
    }
  });
});

// Initialize Particles Background
function initializeParticles() {
  if (!particlesContainer) return;

  const particleCount = window.innerWidth < 768 ? 50 : 100;

  for (let i = 0; i < particleCount; i++) {
    createParticle();
  }
}

function createParticle() {
  const particle = document.createElement("div");
  particle.className = "particle";

  // Random position
  particle.style.left = Math.random() * 100 + "%";
  particle.style.top = Math.random() * 100 + "%";

  // Random animation delay and duration
  particle.style.animationDelay = Math.random() * 6 + "s";
  particle.style.animationDuration = Math.random() * 3 + 3 + "s";

  // Random size
  const size = Math.random() * 3 + 1;
  particle.style.width = size + "px";
  particle.style.height = size + "px";

  particlesContainer.appendChild(particle);

  // Remove and recreate particle after animation
  setTimeout(() => {
    if (particle.parentNode) {
      particle.remove();
      createParticle();
    }
  }, (Math.random() * 3 + 3) * 1000);
}

// Counter Animation for Statistics
function initializeCounters() {
  const observerOptions = {
    threshold: 0.5,
    rootMargin: "0px 0px -100px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !entry.target.classList.contains("counted")) {
        entry.target.classList.add("counted");
        animateCounter(entry.target);
      }
    });
  }, observerOptions);

  statNumbers.forEach((counter) => {
    observer.observe(counter);
  });
}

function animateCounter(element) {
  const target = parseInt(element.getAttribute("data-target"));
  const duration = 2000; // 2 seconds
  const increment = target / (duration / 16); // 60fps
  let current = 0;

  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }

    element.textContent = Math.floor(current).toLocaleString();
  }, 16);
}

// Scroll-triggered animations
function initializeScrollEffects() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  }, observerOptions);

  // Observe all animated elements
  const animatedElements = document.querySelectorAll(
    ".mission-card, .movement-item, .story-card, .gallery-item, .role-card, .stat-item"
  );
  animatedElements.forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
    el.style.transition = "all 0.6s ease-out";
    observer.observe(el);
  });
}

function initializeAnimations() {
  // Add entrance animations with delays
  const animatedElements = document.querySelectorAll(
    ".hero-content, .about-text, .about-image"
  );
  animatedElements.forEach((el, index) => {
    el.style.animationDelay = `${index * 0.2}s`;
  });
}

// Form Validations
const donationForm = document.querySelector("#donation-form");
const volunteerForm = document.querySelector("#volunteer-form");
const contactForm = document.querySelector("#contact-form");

// Donation Form Validation
if (donationForm) {
  donationForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const firstName = donationForm.querySelector(
      'input[placeholder*="first name" i]'
    );
    const lastName = donationForm.querySelector(
      'input[placeholder*="last name" i]'
    );
    const email = donationForm.querySelector('input[type="email"]');
    const amount = donationForm.querySelector("select");
    const customAmount = donationForm.querySelector('input[type="number"]');

    let isValid = true;
    const errors = [];

    // Validate required fields
    if (!firstName?.value.trim()) {
      errors.push("Please enter your first name.");
      highlightError(firstName);
      isValid = false;
    }

    if (!lastName?.value.trim()) {
      errors.push("Please enter your last name.");
      highlightError(lastName);
      isValid = false;
    }

    if (!email?.value.trim() || !isValidEmail(email.value)) {
      errors.push("Please enter a valid email address.");
      highlightError(email);
      isValid = false;
    }

    if (!amount?.value) {
      errors.push("Please select a donation amount.");
      highlightError(amount);
      isValid = false;
    }

    if (amount?.value === "other" && !customAmount?.value) {
      errors.push("Please enter a custom donation amount.");
      highlightError(customAmount);
      isValid = false;
    }

    if (isValid) {
      showSuccessMessage(
        "Thank you for your donation! You will be redirected to payment processing."
      );
      donationForm.reset();
      clearErrorHighlights(donationForm);

      // Simulate payment redirect
      setTimeout(() => {
        showNotification("Redirecting to secure payment gateway...", "info");
      }, 2000);
    } else {
      showErrorMessage(errors.join(" "));
    }
  });
}

// Volunteer Form Validation
if (volunteerForm) {
  volunteerForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = volunteerForm.querySelector('input[placeholder*="name" i]');
    const email = volunteerForm.querySelector('input[type="email"]');
    const state = volunteerForm.querySelector("select");
    const checkboxes = volunteerForm.querySelectorAll(
      'input[type="checkbox"]:checked'
    );

    let isValid = true;
    const errors = [];

    if (!name?.value.trim()) {
      errors.push("Please enter your full name.");
      highlightError(name);
      isValid = false;
    }

    if (!email?.value.trim() || !isValidEmail(email.value)) {
      errors.push("Please enter a valid email address.");
      highlightError(email);
      isValid = false;
    }

    if (!state?.value) {
      errors.push("Please select your state.");
      highlightError(state);
      isValid = false;
    }

    if (checkboxes.length === 0) {
      errors.push("Please select at least one area of interest.");
      isValid = false;
    }

    if (isValid) {
      showSuccessMessage(
        "Thank you for volunteering! We will contact you soon with opportunities."
      );
      volunteerForm.reset();
      clearErrorHighlights(volunteerForm);
    } else {
      showErrorMessage(errors.join(" "));
    }
  });
}

// Contact Form Validation
if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = contactForm.querySelector('input[placeholder*="name" i]');
    const email = contactForm.querySelector('input[type="email"]');
    const subject = contactForm.querySelector(
      'input[placeholder*="subject" i]'
    );
    const message = contactForm.querySelector("textarea");

    let isValid = true;
    const errors = [];

    if (!name?.value.trim()) {
      errors.push("Please enter your name.");
      highlightError(name);
      isValid = false;
    }

    if (!email?.value.trim() || !isValidEmail(email.value)) {
      errors.push("Please enter a valid email address.");
      highlightError(email);
      isValid = false;
    }

    if (!subject?.value.trim()) {
      errors.push("Please enter a subject.");
      highlightError(subject);
      isValid = false;
    }

    if (!message?.value.trim()) {
      errors.push("Please enter your message.");
      highlightError(message);
      isValid = false;
    }

    if (isValid) {
      showSuccessMessage(
        "Thank you for your message! We will get back to you soon."
      );
      contactForm.reset();
      clearErrorHighlights(contactForm);
    } else {
      showErrorMessage(errors.join(" "));
    }
  });
}

// Newsletter Subscription
const newsletterForm = document.querySelector(".newsletter-form");
if (newsletterForm) {
  const newsletterButton = newsletterForm.querySelector("button");
  const newsletterInput = newsletterForm.querySelector("input");

  newsletterButton.addEventListener("click", (e) => {
    e.preventDefault();

    if (!newsletterInput.value.trim() || !isValidEmail(newsletterInput.value)) {
      highlightError(newsletterInput);
      showErrorMessage("Please enter a valid email address.");
      return;
    }

    showSuccessMessage("Successfully subscribed to our newsletter!");
    newsletterInput.value = "";
    clearErrorHighlights(newsletterForm);
  });
}

// Cryptocurrency Address Copy Functionality
function copyToClipboard(cryptoId) {
  const addressElement = document.getElementById(cryptoId);
  if (!addressElement) return;

  const address = addressElement.textContent;

  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard
      .writeText(address)
      .then(() => {
        showCopySuccess(addressElement);
      })
      .catch(() => {
        fallbackCopyTextToClipboard(address, addressElement);
      });
  } else {
    fallbackCopyTextToClipboard(address, addressElement);
  }
}

function fallbackCopyTextToClipboard(text, element) {
  const textArea = document.createElement("textarea");
  textArea.value = text;
  textArea.style.top = "0";
  textArea.style.left = "0";
  textArea.style.position = "fixed";

  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();

  try {
    document.execCommand("copy");
    showCopySuccess(element);
  } catch (err) {
    showErrorMessage("Failed to copy address. Please copy manually.");
  }

  document.body.removeChild(textArea);
}

function showCopySuccess(element) {
  const originalText = element.textContent;
  element.textContent = "Address Copied!";
  element.style.background = "rgba(255, 215, 0, 0.3)";

  setTimeout(() => {
    element.textContent = originalText;
    element.style.background = "rgba(0, 0, 0, 0.4)";
  }, 2000);

  showNotification("Crypto address copied to clipboard!", "success");
}

// Utility Functions
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function highlightError(element) {
  if (!element) return;

  element.style.borderColor = "#ff4444";
  element.style.boxShadow = "0 0 10px rgba(255, 68, 68, 0.3)";

  // Remove error styling after 5 seconds
  setTimeout(() => {
    element.style.borderColor = "";
    element.style.boxShadow = "";
  }, 5000);
}

function clearErrorHighlights(form) {
  const inputs = form.querySelectorAll("input, select, textarea");
  inputs.forEach((input) => {
    input.style.borderColor = "";
    input.style.boxShadow = "";
  });
}

function showSuccessMessage(message) {
  showNotification(message, "success");
}

function showErrorMessage(message) {
  showNotification(message, "error");
}

function showNotification(message, type = "info") {
  // Remove existing notifications
  const existingNotifications = document.querySelectorAll(".notification");
  existingNotifications.forEach((notification) => notification.remove());

  const notification = document.createElement("div");
  notification.className = `notification notification-${type}`;
  notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${getNotificationIcon(type)}"></i>
            <span>${message}</span>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;

  // Styles for notification
  notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        z-index: 10000;
        background: ${getNotificationBackground(type)};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        max-width: 400px;
        animation: slideInRight 0.3s ease-out;
        border-left: 4px solid ${getNotificationBorder(type)};
    `;

  const content = notification.querySelector(".notification-content");
  content.style.cssText = `
        display: flex;
        align-items: center;
        gap: 0.5rem;
    `;

  const closeButton = notification.querySelector(".notification-close");
  closeButton.style.cssText = `
        background: none;
        border: none;
        color: white;
        cursor: pointer;
        font-size: 1rem;
        margin-left: auto;
        padding: 0.2rem;
        border-radius: 3px;
        transition: background 0.3s ease;
    `;

  closeButton.onmouseover = () =>
    (closeButton.style.background = "rgba(255,255,255,0.2)");
  closeButton.onmouseout = () => (closeButton.style.background = "none");

  document.body.appendChild(notification);

  // Auto remove after 5 seconds
  setTimeout(() => {
    if (notification.parentNode) {
      notification.style.animation = "slideOutRight 0.3s ease-in";
      setTimeout(() => notification.remove(), 300);
    }
  }, 5000);
}

function getNotificationIcon(type) {
  switch (type) {
    case "success":
      return "fa-check-circle";
    case "error":
      return "fa-exclamation-triangle";
    case "info":
      return "fa-info-circle";
    default:
      return "fa-bell";
  }
}

function getNotificationBackground(type) {
  switch (type) {
    case "success":
      return "linear-gradient(135deg, #28a745, #20c997)";
    case "error":
      return "linear-gradient(135deg, #dc3545, #e74c3c)";
    case "info":
      return "linear-gradient(135deg, #17a2b8, #6f42c1)";
    default:
      return "linear-gradient(135deg, #6c757d, #495057)";
  }
}

function getNotificationBorder(type) {
  switch (type) {
    case "success":
      return "#28a745";
    case "error":
      return "#dc3545";
    case "info":
      return "#17a2b8";
    default:
      return "#6c757d";
  }
}

// Add CSS for notifications
const notificationStyles = document.createElement("style");
notificationStyles.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(notificationStyles);

// Handle window resize for particles
window.addEventListener("resize", () => {
  // Clear existing particles and recreate with new count
  if (particlesContainer) {
    particlesContainer.innerHTML = "";
    initializeParticles();
  }
});

// Add loading screen
window.addEventListener("load", () => {
  const loadingScreen = document.createElement("div");
  loadingScreen.id = "loading-screen";
  loadingScreen.innerHTML = `
        <div class="loading-content">
            <i class="fas fa-flag-usa loading-icon"></i>
            <h2>Charlie Kirk Foundation</h2>
            <div class="loading-spinner"></div>
        </div>
    `;

  loadingScreen.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, var(--primary-blue), var(--primary-red));
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        transition: opacity 0.5s ease-out;
    `;

  const loadingContent = loadingScreen.querySelector(".loading-content");
  loadingContent.style.cssText = `
        text-align: center;
        color: white;
        animation: fadeInUp 1s ease-out;
    `;

  const loadingIcon = loadingScreen.querySelector(".loading-icon");
  loadingIcon.style.cssText = `
        font-size: 4rem;
        color: #FFD700;
        margin-bottom: 1rem;
        animation: bounce 1s infinite;
    `;

  const spinner = loadingScreen.querySelector(".loading-spinner");
  spinner.style.cssText = `
        width: 40px;
        height: 40px;
        border: 3px solid rgba(255, 255, 255, 0.3);
        border-top: 3px solid #FFD700;
        border-radius: 50%;
        animation: spin 1s linear infinite;
        margin: 1rem auto 0;
    `;

  // Add spinner animation
  const spinnerStyles = document.createElement("style");
  spinnerStyles.textContent = `
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    `;
  document.head.appendChild(spinnerStyles);

  document.body.appendChild(loadingScreen);

  // Remove loading screen after 2 seconds
  setTimeout(() => {
    loadingScreen.style.opacity = "0";
    setTimeout(() => loadingScreen.remove(), 500);
  }, 2000);
});

// Add scroll-to-top button
const scrollToTopButton = document.createElement("button");
scrollToTopButton.innerHTML = '<i class="fas fa-chevron-up"></i>';
scrollToTopButton.id = "scroll-to-top";
scrollToTopButton.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    background: linear-gradient(135deg, var(--primary-blue), var(--primary-red));
    color: white;
    border: 2px solid #FFD700;
    border-radius: 50%;
    font-size: 1.2rem;
    cursor: pointer;
    z-index: 1000;
    transition: all 0.3s ease;
    opacity: 0;
    transform: translateY(100px);
    box-shadow: 0 5px 15px rgba(0,0,0,0.3);
`;

scrollToTopButton.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

scrollToTopButton.addEventListener("mouseover", () => {
  scrollToTopButton.style.transform = "translateY(0) scale(1.1)";
  scrollToTopButton.style.background = "#FFD700";
  scrollToTopButton.style.color = "var(--dark-blue)";
});

scrollToTopButton.addEventListener("mouseout", () => {
  scrollToTopButton.style.transform = "translateY(0) scale(1)";
  scrollToTopButton.style.background =
    "linear-gradient(135deg, var(--primary-blue), var(--primary-red))";
  scrollToTopButton.style.color = "white";
});

document.body.appendChild(scrollToTopButton);

// Show/hide scroll-to-top button
window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    scrollToTopButton.style.opacity = "1";
    scrollToTopButton.style.transform = "translateY(0)";
  } else {
    scrollToTopButton.style.opacity = "0";
    scrollToTopButton.style.transform = "translateY(100px)";
  }
});

// Add keyboard navigation
document.addEventListener("keydown", (e) => {
  // Press ESC to close mobile menu
  if (e.key === "Escape" && navLinks.classList.contains("active")) {
    navLinks.classList.remove("active");
    hamburger.classList.remove("toggle");
  }

  // Press Ctrl+Home to scroll to top
  if (e.ctrlKey && e.key === "Home") {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
});

// Performance optimization: Lazy load images when implemented
function lazyLoadImages() {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.remove("lazy");
        imageObserver.unobserve(img);
      }
    });
  });

  document.querySelectorAll("img[data-src]").forEach((img) => {
    imageObserver.observe(img);
  });
}

// Initialize lazy loading
lazyLoadImages();

console.log("Charlie Kirk Foundation website loaded successfully! 🇺🇸");
