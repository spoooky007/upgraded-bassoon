// ===== Mobile Navigation Toggle =====
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// ===== Smooth Scrolling for Safari =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===== Navbar Background on Scroll =====
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.15)';
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
    }
});

// ===== Newsletter Form Submission =====
const newsletterForm = document.getElementById('newsletterForm');

newsletterForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const email = this.querySelector('input[type="email"]').value;
    
    // Here you would normally send the data to your server
    // For now, we'll just show a success message
    showSuccessMessage(this, 'Thank you for subscribing! Check your email for the discount code. 🎁');
    
    // Clear the form
    this.reset();
    
    // Log the email (for testing purposes)
    console.log('Newsletter subscription:', email);
});

// ===== Contact Form Submission =====
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = {
        name: this.querySelector('input[type="text"]').value,
        email: this.querySelector('input[type="email"]').value,
        message: this.querySelector('textarea').value
    };
    
    // Here you would normally send the data to your server
    // For now, we'll just show a success message
    showSuccessMessage(this, 'Thank you for your message! We will get back to you within 24 hours. 💅');
    
    // Clear the form
    this.reset();
    
    // Log the data (for testing purposes)
    console.log('Contact form submission:', formData);
});

// ===== Show Success Message Function =====
function showSuccessMessage(form, message) {
    // Remove any existing messages
    const existingMessage = form.querySelector('.success-message, .error-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Create success message
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.textContent = message;
    
    // Add message after the form
    form.appendChild(successDiv);
    
    // Show message
    successDiv.style.display = 'block';
    
    // Hide message after 5 seconds
    setTimeout(() => {
        successDiv.style.display = 'none';
    }, 5000);
}

// ===== Add Animation on Scroll =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all product cards and blog cards
document.querySelectorAll('.product-card, .blog-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

// ===== Add to Cart Animation (for future use) =====
function addToCart(productName) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'cart-notification';
    notification.innerHTML = `
        <i class="fas fa-check-circle"></i>
        <span>${productName} added to cart!</span>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: #4CAF50;
        color: white;
        padding: 15px 25px;
        border-radius: 10px;
        box-shadow: 0 5px 20px rgba(0,0,0,0.2);
        z-index: 9999;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// ===== Track Amazon Link Clicks (for analytics) =====
document.querySelectorAll('.btn-amazon').forEach(link => {
    link.addEventListener('click', function(e) {
        const productName = this.closest('.product-info').querySelector('h3').textContent;
        console.log('Amazon affiliate link clicked:', productName);
        
        // You can add Google Analytics or other tracking here
        // gtag('event', 'affiliate_click', {
        //     'event_category': 'Amazon',
        //     'event_label': productName
        // });
    });
});

// ===== Current Year in Footer =====
document.querySelector('.footer-bottom p').innerHTML = 
    `&copy; ${new Date().getFullYear()} ManiInMinutes. All rights reserved.`;

// ===== Lazy Loading Images (for better performance) =====
if ('loading' in HTMLImageElement.prototype) {
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
        img.src = img.dataset.src;
    });
} else {
    // Fallback for browsers that don't support lazy loading
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
    document.body.appendChild(script);
}

// ===== Easter Egg: Konami Code =====
let konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 
                  'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
let konamiIndex = 0;

document.addEventListener('keydown', (e) => {
    if (e.key === konamiCode[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === konamiCode.length) {
            activateEasterEgg();
            konamiIndex = 0;
        }
    } else {
        konamiIndex = 0;
    }
});

function activateEasterEgg() {
    const colors = ['#FFB6C1', '#FFE4E1', '#D4AF37', '#F4E8C1'];
    document.body.style.transition = 'background 0.5s';
    document.body.style.background = colors[Math.floor(Math.random() * colors.length)];
    
    setTimeout(() => {
        document.body.style.background = '';
    }, 2000);
    
    alert('🎉 You found the secret! Thanks for being awesome! 💅✨');
}