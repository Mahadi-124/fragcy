// Header scroll effect
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.style.padding = '10px 0';
        header.style.backgroundColor = 'rgba(0, 0, 0, 0.9)';
    } else {
        header.style.padding = '15px 0';
        header.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
    }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            const headerHeight = document.querySelector('header').offsetHeight;
            const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Form submission handling
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = this.querySelector('input[type="text"]').value;
        const email = this.querySelector('input[type="email"]').value;
        const message = this.querySelector('textarea').value;
        
        // Simple validation
        if (!name || !email || !message) {
            alert('Please fill in all required fields.');
            return;
        }
        
        // In a real application, you would send this data to a server
        alert('Thank you for your message! We will get back to you soon.');
        this.reset();
    });
}

// Newsletter subscription
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = this.querySelector('input[type="email"]').value;
        
        if (!email) {
            alert('Please enter your email address.');
            return;
        }
        
        // In a real application, you would send this data to a server
        alert('Thank you for subscribing to our newsletter!');
        this.reset();
    });
}

// Product details modal functionality
function showDetails(productId) {
    const products = {
        'acqua-di-gio': {
            name: 'Acqua Di Gio',
            description: 'A fresh, aquatic fragrance that captures the spirit of the Mediterranean. Perfect for daily wear.',
            sizes: ['6ml', '8ml', '15ml', 'Tester (2ml)'],
            prices: ['৳490', '৳650', '৳950', '৳165']
        },
        'black-friday': {
            name: 'Black Friday',
            description: 'A bold and sophisticated scent with notes of leather and spices. Ideal for evening wear.',
            sizes: ['6ml', '8ml', '15ml', 'Tester (2ml)'],
            prices: ['৳550', '৳730', '৳990', '৳185']
        },
        'creed-aventus': {
            name: 'Creed Aventus',
            description: 'A luxurious blend of fruity and woody notes, creating a bold and confident fragrance.',
            sizes: ['6ml', '8ml', '15ml', 'Tester (2ml)'],
            prices: ['৳600', '৳790', '৳1110', '৳200']
        },
        'intense-cafe': {
            name: 'Intense Café',
            description: 'A rich coffee-based fragrance with vanilla and floral notes. Perfect for coffee lovers.',
            sizes: ['6ml', '8ml', '15ml', 'Tester (2ml)'],
            prices: ['৳550', '৳730', '৳990', '৳185']
        },
        'black-xs': {
            name: 'Black XS',
            description: 'A rebellious and energetic fragrance with notes of spices and woods.',
            sizes: ['6ml', '8ml', '15ml', 'Tester (2ml)'],
            prices: ['৳490', '৳650', '৳950', '৳165']
        },
        'cool-water': {
            name: 'Cool Water',
            description: 'A fresh and invigorating scent inspired by the ocean.',
            sizes: ['6ml', '8ml', '15ml', 'Tester (2ml)'],
            prices: ['৳300', '৳400', '৳650', '৳100']
        },
        'dunhill-desire': {
            name: 'Dunhill Desire Red',
            description: 'A warm and spicy fragrance with notes of rose and vanilla.',
            sizes: ['6ml', '8ml', '15ml', 'Tester (2ml)'],
            prices: ['৳300', '৳400', '৳650', '৳100']
        },
        'ebra-pura': {
            name: 'Ebra Pura',
            description: 'A clean and fresh fragrance with citrus and woody notes.',
            sizes: ['6ml', '8ml', '15ml', 'Tester (2ml)'],
            prices: ['৳300', '৳400', '৳650', '৳100']
        },
        'black-opium': {
            name: 'Black Opium',
            description: 'An addictive feminine fragrance with notes of coffee, vanilla, and white flowers.',
            sizes: ['6ml', '8ml', '15ml', 'Tester (2ml)'],
            prices: ['৳550', '৳730', '৳990', '৳185']
        },
        'delina': {
            name: 'Delina',
            description: 'A sophisticated floral fragrance with Turkish rose, lily of the valley, and vanilla.',
            sizes: ['6ml', '8ml', '15ml', 'Tester (2ml)'],
            prices: ['৳600', '৳800', '৳1110', '৳200']
        },
        'gucci-bloom': {
            name: 'Gucci Bloom',
            description: 'A rich floral scent featuring Rangoon Creeper, jasmine, and tuberose.',
            sizes: ['6ml', '8ml', '15ml', 'Tester (2ml)'],
            prices: ['৳550', '৳730', '৳990', '৳185']
        },
        'coco-mademoiselle': {
            name: 'Coco Mademoiselle',
            description: 'A fresh oriental fragrance with notes of orange, jasmine, and patchouli.',
            sizes: ['6ml', '8ml', '15ml', 'Tester (2ml)'],
            prices: ['৳550', '৳730', '৳990', '৳185']
        },
        'br-540': {
            name: 'BR 540 Extrait',
            description: 'A luxurious and sweet fragrance with notes of saffron and amber wood.',
            sizes: ['6ml', '8ml', '15ml', 'Tester (2ml)'],
            prices: ['৳300', '৳400', '৳650', '৳100']
        },
        'chance-fraiche': {
            name: 'Chance Eau Fraîche',
            description: 'A fresh and sparkling fragrance with citrus and jasmine notes.',
            sizes: ['6ml', '8ml', '15ml', 'Tester (2ml)'],
            prices: ['৳490', '৳650', '৳950', '৳165']
        },
        'crystal-noir': {
            name: 'Crystal Noir',
            description: 'A mysterious and sensual oriental floral fragrance.',
            sizes: ['6ml', '8ml', '15ml', 'Tester (2ml)'],
            prices: ['৳550', '৳730', '৳990', '৳185']
        },
        'gucci-flora': {
            name: 'Gucci Flora',
            description: 'A fresh and feminine floral fragrance with peony and rose notes.',
            sizes: ['6ml', '8ml', '15ml', 'Tester (2ml)'],
            prices: ['৳550', '৳730', '৳990', '৳185']
        }
    };

    const product = products[productId];
    if (!product) return;

    // Create modal HTML
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-modal">&times;</span>
            <h2>${product.name}</h2>
            <p>${product.description}</p>
            <div class="size-price-grid">
                ${product.sizes.map((size, index) => `
                    <div class="size-price-item">
                        <span class="size">${size}</span>
                        <span class="price">${product.prices[index]}</span>
                    </div>
                `).join('')}
            </div>
            <a href="#contact" class="modal-buy-btn">Buy Now</a>
        </div>
    `;

    // Add modal styles
    const style = document.createElement('style');
    style.textContent = `
        .modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.8);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 1000;
        }
        .modal-content {
            background-color: rgba(34, 34, 34, 0.95);
            padding: 30px;
            border-radius: 15px;
            max-width: 500px;
            width: 90%;
            position: relative;
        }
        .close-modal {
            position: absolute;
            right: 20px;
            top: 15px;
            font-size: 24px;
            cursor: pointer;
            color: var(--text-color);
        }
        .modal h2 {
            color: var(--primary-color);
            margin-bottom: 15px;
            font-family: 'Playfair Display', serif;
        }
        .modal p {
            color: var(--text-color);
            margin-bottom: 20px;
            line-height: 1.6;
        }
        .size-price-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 10px;
            margin-bottom: 20px;
        }
        .size-price-item {
            background-color: rgba(255, 255, 255, 0.1);
            padding: 10px;
            border-radius: 5px;
            display: flex;
            justify-content: space-between;
            color: var(--text-color);
        }
        .modal-buy-btn {
            display: block;
            background-color: var(--primary-color);
            color: var(--bg-color);
            text-align: center;
            padding: 12px;
            border-radius: 5px;
            text-decoration: none;
            font-weight: 600;
            transition: var(--transition);
        }
        .modal-buy-btn:hover {
            background-color: #fff;
            color: var(--bg-color);
        }
    `;

    document.head.appendChild(style);
    document.body.appendChild(modal);

    // Close modal functionality
    const closeBtn = modal.querySelector('.close-modal');
    closeBtn.onclick = () => {
        modal.remove();
        style.remove();
    };

    // Close modal when clicking outside
    modal.onclick = (e) => {
        if (e.target === modal) {
            modal.remove();
            style.remove();
        }
    };
}

// Initialize animations and other existing functionality
document.addEventListener('DOMContentLoaded', () => {
    const features = document.querySelectorAll('.feature, .size, .testimonial-card, .product-card');
    features.forEach(feature => {
        feature.style.opacity = '0';
        feature.style.transform = 'translateY(20px)';
        feature.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    animateOnScroll();
    window.addEventListener('scroll', animateOnScroll);
});

// Add animation to features on scroll
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.feature, .size, .testimonial-card, .product-card');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (elementPosition < screenPosition) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
};

function toggleBot() {
    const botContainer = document.getElementById('botContainer');
    if (botContainer.style.display === 'none' || botContainer.style.display === '') {
        botContainer.style.display = 'block';
    } else {
        botContainer.style.display = 'none';
    }
}