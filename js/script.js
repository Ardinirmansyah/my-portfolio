// Wait for the DOM to be fully loaded before executing JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // ========== NAVBAR FUNCTIONALITY ==========
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const menuToggle = document.getElementById('mobile-menu');
    const navList = document.querySelector('.nav-list');
    
    // Highlight active nav link on scroll
    function highlightNavLink() {
        const scrollPosition = window.scrollY;
        
        // Add 'scrolled' class to navbar when scrolling
        if (scrollPosition > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Highlight the current section in view
        document.querySelectorAll('section').forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    // Mobile menu toggle
    menuToggle.addEventListener('click', function() {
        navList.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });
    
    // Close mobile menu when clicking a nav link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navList.classList.remove('active');
            menuToggle.classList.remove('active');
        });
    });
    
    // ========== TESTIMONIAL SLIDER ==========
    const testimonialSlides = document.querySelectorAll('.testimonial-slide');
    const prevBtn = document.querySelector('.slider-prev');
    const nextBtn = document.querySelector('.slider-next');
    let currentSlide = 0;
    
    // Show initial slide
    showSlide(currentSlide);
    
    // Next slide function
    function nextSlide() {
        testimonialSlides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % testimonialSlides.length;
        showSlide(currentSlide);
    }
    
    // Previous slide function
    function prevSlide() {
        testimonialSlides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide - 1 + testimonialSlides.length) % testimonialSlides.length;
        showSlide(currentSlide);
    }
    
    // Show specific slide
    function showSlide(index) {
        testimonialSlides[index].classList.add('active');
    }
    
    // Event listeners for buttons
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);
    
    // Auto-rotate testimonials (optional)
    let slideInterval = setInterval(nextSlide, 5000);
    
    // Pause on hover
    const slider = document.querySelector('.testimonial-slider');
    slider.addEventListener('mouseenter', () => clearInterval(slideInterval));
    slider.addEventListener('mouseleave', () => {
        slideInterval = setInterval(nextSlide, 5000);
    });
    
    // ========== CONTACT FORM VALIDATION ==========
    const contactForm = document.getElementById('contact-form');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    const nameError = document.getElementById('name-error');
    const emailError = document.getElementById('email-error');
    const messageError = document.getElementById('message-error');
    
    // Form validation
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        let isValid = true;
        
        // Name validation
        if (nameInput.value.trim() === '') {
            nameError.textContent = 'Nama harus diisi';
            isValid = false;
        } else {
            nameError.textContent = '';
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailInput.value.trim() === '') {
            emailError.textContent = 'Email harus diisi';
            isValid = false;
        } else if (!emailRegex.test(emailInput.value)) {
            emailError.textContent = 'Email tidak valid';
            isValid = false;
        } else {
            emailError.textContent = '';
        }
        
        // Message validation
        if (messageInput.value.trim() === '') {
            messageError.textContent = 'Pesan harus diisi';
            isValid = false;
        } else {
            messageError.textContent = '';
        }
        
        // If form is valid, submit it (in a real app, you would send to server)
        if (isValid) {
            alert('Pesan berhasil dikirim!');
            contactForm.reset();
        }
    });
    
    // ========== DOWNLOAD CV BUTTON ==========
    const downloadBtn = document.getElementById('download-cv');
    
    downloadBtn.addEventListener('click', function(e) {
        e.preventDefault();
        alert('Ini adalah simulasi. Pada implementasi nyata, ini akan mengunduh file CV.');
        // In a real implementation, you would link to your actual CV file
        // window.location.href = 'path/to/your-cv.pdf';
    });
    
    // ========== SMOOTH SCROLL FOR ANCHOR LINKS ==========
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ========== UPDATE COPYRIGHT YEAR ==========
    const yearElement = document.getElementById('year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
    
    // ========== INITIAL SCROLL HIGHLIGHT ==========
    window.addEventListener('scroll', highlightNavLink);
    highlightNavLink(); // Run once on page load
});
