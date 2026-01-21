const imageBase = "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/iphone-17-pro-finish-select-202509-6-9inch-cosmicorange?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=NUNzdzNKR0FJbmhKWm5YamRHb05tUzkyK3hWak1ybHhtWDkwUXVINFc0RnVrUzFnTVVSUnNLVnZUWUMxNTBGaGhsQTdPYWVGbmdIenAvNE9qYmZVYWVRU0p3cnVrZzhmdWQwTDVYRlMxUFpybkIybk5RZmlyRnNkQjBrajdkK0xqWUxobjNlSmdUU0RNNnFXZ0d4NHJR&traceId=1"

const heroSlides = [
    {
        id: 1,
        title: 'SUPER OFERTA\nLAPTOP GAMER',
        subtitle: 'Performance extrema para jogos e trabalho',
        cta: 'VER ÚLTIMAS UNIDADES',
        badge: 'RESTAM\n3',
        image: imageBase
    },
    {
        id: 2,
        title: 'SMARTPHONES\nDE ÚLTIMA GERAÇÃO',
        subtitle: 'Tecnologia de ponta na palma da sua mão',
        cta: 'APROVEITAR AGORA',
        badge: 'RESTAM\n5',
        image: imageBase
    },
    {
        id: 3,
        title: 'MONITORES 4K\nEM PROMOÇÃO',
        subtitle: 'Qualidade de imagem incomparável',
        cta: 'CONFERIR OFERTAS',
        badge: 'RESTAM\n8',
        image: imageBase
    }
];

const startTechProducts = [
    {
        id: 1,
        title: 'Notebook Gamer RTX 4060 16GB RAM SSD 512GB',
        image: imageBase,
        oldPrice: 'R$ 6.499,00',
        price: 'R$ 4.999,00',
        discountLabel: 'Baixou 23%',
        installments: 'em até 10x de R$ 499,90 sem juros',
        badgeRemaining: 'Restam 7',
        ratingLabel: 'Muito bom'
    },
    {
        id: 2,
        title: 'Smartphone Pro Max 256GB 5G Câmera 108MP',
        image: imageBase,
        oldPrice: 'R$ 3.899,00',
        price: 'R$ 2.799,00',
        discountLabel: 'Baixou 28%',
        installments: 'em até 10x de R$ 279,90 sem juros',
        badgeRemaining: 'Restam 3',
        ratingLabel: 'Excelente'
    },
    {
        id: 3,
        title: 'Monitor Ultrawide 34" 144Hz Curvo Gaming',
        image: imageBase,
        oldPrice: 'R$ 2.499,00',
        price: 'R$ 1.899,00',
        discountLabel: 'Baixou 24%',
        installments: 'em até 10x de R$ 189,90 sem juros',
        badgeRemaining: 'Restam 5',
        ratingLabel: 'Muito bom'
    },
    {
        id: 4,
        title: 'Tablet 11" 128GB WiFi + 4G Tela Retina',
        image: imageBase,
        oldPrice: 'R$ 2.299,00',
        price: 'R$ 1.699,00',
        discountLabel: 'Baixou 26%',
        installments: 'em até 10x de R$ 169,90 sem juros',
        badgeRemaining: 'Restam 12',
        ratingLabel: 'Muito bom'
    },
    {
        id: 5,
        title: 'PC Gamer Completo i7 RTX 4070 32GB SSD 1TB',
        image: imageBase,
        oldPrice: 'R$ 8.999,00',
        price: 'R$ 6.999,00',
        discountLabel: 'Baixou 22%',
        installments: 'em até 12x de R$ 583,25 sem juros',
        badgeRemaining: 'Restam 4',
        ratingLabel: 'Excelente'
    },
    {
        id: 6,
        title: 'Headset Gamer Wireless 7.1 RGB Pro',
        image: imageBase,
        oldPrice: 'R$ 699,00',
        price: 'R$ 449,00',
        discountLabel: 'Baixou 36%',
        installments: 'em até 6x de R$ 74,83 sem juros',
        badgeRemaining: 'Restam 15',
        ratingLabel: 'Muito bom'
    }
];

const offersTabs = {
    notebook: [
        {
            id: 101,
            title: 'Notebook Ultra i5 8GB SSD 256GB Tela 15.6"',
            image: imageBase,
            oldPrice: 'R$ 3.299,00',
            price: 'R$ 2.499,00',
            discountLabel: 'Baixou 24%',
            installments: 'em até 10x de R$ 249,90 sem juros',
            badgeRemaining: 'Restam 8',
            ratingLabel: 'Muito bom'
        },
        {
            id: 102,
            title: 'Notebook Premium Ryzen 7 16GB SSD 512GB',
            image: imageBase,
            oldPrice: 'R$ 4.599,00',
            price: 'R$ 3.399,00',
            discountLabel: 'Baixou 26%',
            installments: 'em até 10x de R$ 339,90 sem juros',
            badgeRemaining: 'Restam 5',
            ratingLabel: 'Excelente'
        },
        {
            id: 103,
            title: 'Notebook Business i7 32GB SSD 1TB',
            image: imageBase,
            oldPrice: 'R$ 5.999,00',
            price: 'R$ 4.699,00',
            discountLabel: 'Baixou 22%',
            installments: 'em até 12x de R$ 391,58 sem juros',
            badgeRemaining: 'Restam 6',
            ratingLabel: 'Excelente'
        },
        {
            id: 104,
            title: 'Notebook 2 em 1 Touch i5 8GB SSD 256GB',
            image: imageBase,
            oldPrice: 'R$ 3.799,00',
            price: 'R$ 2.899,00',
            discountLabel: 'Baixou 24%',
            installments: 'em até 10x de R$ 289,90 sem juros',
            badgeRemaining: 'Restam 10',
            ratingLabel: 'Muito bom'
        }
    ],
    smartphones: [
        {
            id: 201,
            title: 'Smartphone 5G 128GB Câmera 64MP Tela 6.5"',
            image: imageBase,
            oldPrice: 'R$ 2.299,00',
            price: 'R$ 1.699,00',
            discountLabel: 'Baixou 26%',
            installments: 'em até 10x de R$ 169,90 sem juros',
            badgeRemaining: 'Restam 15',
            ratingLabel: 'Muito bom'
        },
        {
            id: 202,
            title: 'Smartphone Premium 256GB 5G 108MP',
            image: imageBase,
            oldPrice: 'R$ 3.499,00',
            price: 'R$ 2.599,00',
            discountLabel: 'Baixou 26%',
            installments: 'em até 10x de R$ 259,90 sem juros',
            badgeRemaining: 'Restam 7',
            ratingLabel: 'Excelente'
        },
        {
            id: 203,
            title: 'Smartphone Gamer 512GB 5G 120Hz',
            image: imageBase,
            oldPrice: 'R$ 4.299,00',
            price: 'R$ 3.199,00',
            discountLabel: 'Baixou 26%',
            installments: 'em até 12x de R$ 266,58 sem juros',
            badgeRemaining: 'Restam 4',
            ratingLabel: 'Excelente'
        },
        {
            id: 204,
            title: 'Smartphone Básico 64GB 4G Dual Chip',
            image: imageBase,
            oldPrice: 'R$ 1.199,00',
            price: 'R$ 849,00',
            discountLabel: 'Baixou 29%',
            installments: 'em até 8x de R$ 106,13 sem juros',
            badgeRemaining: 'Restam 20',
            ratingLabel: 'Bom'
        }
    ],
    computador: [
        {
            id: 301,
            title: 'Desktop Office i5 16GB SSD 480GB',
            image: imageBase,
            oldPrice: 'R$ 3.299,00',
            price: 'R$ 2.499,00',
            discountLabel: 'Baixou 24%',
            installments: 'em até 10x de R$ 249,90 sem juros',
            badgeRemaining: 'Restam 9',
            ratingLabel: 'Muito bom'
        },
        {
            id: 302,
            title: 'Desktop Gamer i7 RTX 3060 16GB SSD 500GB',
            image: imageBase,
            oldPrice: 'R$ 6.999,00',
            price: 'R$ 5.299,00',
            discountLabel: 'Baixou 24%',
            installments: 'em até 12x de R$ 441,58 sem juros',
            badgeRemaining: 'Restam 5',
            ratingLabel: 'Excelente'
        },
        {
            id: 303,
            title: 'Desktop Workstation Xeon 64GB SSD 2TB',
            image: imageBase,
            oldPrice: 'R$ 9.999,00',
            price: 'R$ 7.699,00',
            discountLabel: 'Baixou 23%',
            installments: 'em até 12x de R$ 641,58 sem juros',
            badgeRemaining: 'Restam 3',
            ratingLabel: 'Excelente'
        },
        {
            id: 304,
            title: 'Mini PC Compact i3 8GB SSD 240GB',
            image: imageBase,
            oldPrice: 'R$ 1.999,00',
            price: 'R$ 1.499,00',
            discountLabel: 'Baixou 25%',
            installments: 'em até 10x de R$ 149,90 sem juros',
            badgeRemaining: 'Restam 12',
            ratingLabel: 'Bom'
        }
    ]
};

let currentHeroSlide = 0;
let heroAutoplayInterval;
let currentStartTechPosition = 0;
let cartCount = 0;
let wishlist = new Set();

function initHeroCarousel() {
    const slidesContainer = document.getElementById('heroSlides');
    const dotsContainer = document.getElementById('heroDots');

    heroSlides.forEach((slide, index) => {
        const slideElement = document.createElement('div');
        slideElement.className = `hero-slide ${index === 0 ? 'active' : ''}`;
        slideElement.innerHTML = `
      <div class="hero-content">
        <h1>${slide.title.replace('\n', '<br>')}</h1>
        <p>${slide.subtitle}</p>
        <button class="cta-btn">${slide.cta}</button>
      </div>
      <div class="hero-badge">${slide.badge.replace('\n', '<br>')}</div>
      <div class="hero-image">
        <img src="${slide.image}" alt="${slide.title}">
      </div>
    `;
        slidesContainer.appendChild(slideElement);

        const dot = document.createElement('div');
        dot.className = `dot ${index === 0 ? 'active' : ''}`;
        dot.addEventListener('click', () => goToHeroSlide(index));
        dotsContainer.appendChild(dot);
    });

    document.getElementById('heroPrev').addEventListener('click', () => {
        goToHeroSlide(currentHeroSlide - 1);
        resetHeroAutoplay();
    });

    document.getElementById('heroNext').addEventListener('click', () => {
        goToHeroSlide(currentHeroSlide + 1);
        resetHeroAutoplay();
    });

    startHeroAutoplay();
}

function goToHeroSlide(index) {
    const slides = document.querySelectorAll('.hero-slide');
    const dots = document.querySelectorAll('#heroDots .dot');

    if (index < 0) index = slides.length - 1;
    if (index >= slides.length) index = 0;

    slides[currentHeroSlide].classList.remove('active');
    dots[currentHeroSlide].classList.remove('active');

    currentHeroSlide = index;

    slides[currentHeroSlide].classList.add('active');
    dots[currentHeroSlide].classList.add('active');
}

function startHeroAutoplay() {
    heroAutoplayInterval = setInterval(() => {
        goToHeroSlide(currentHeroSlide + 1);
    }, 5000);
}

function resetHeroAutoplay() {
    clearInterval(heroAutoplayInterval);
    startHeroAutoplay();
}

function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
    <div class="product-header">
      <span class="remaining-badge">${product.badgeRemaining}</span>
      <div class="product-actions">
        <button class="action-btn wishlist-product" data-id="${product.id}">
          <i class="far fa-heart"></i>
        </button>
        <button class="action-btn add-to-cart" data-id="${product.id}">
          <i class="fas fa-shopping-cart"></i>
        </button>
      </div>
    </div>
    <div class="product-image">
      <img src="${product.image}" alt="${product.title}">
      <div class="rating-badge">
        <i class="fas fa-medal"></i>
        ${product.ratingLabel}
      </div>
    </div>
    <h3 class="product-title">${product.title}</h3>
    <div class="price-info">
      <div class="old-price">
        <span>${product.oldPrice}</span>
        <span class="discount-badge">${product.discountLabel}</span>
      </div>
      <div class="current-price">${product.price}</div>
      <div class="payment-info">no PIX / Boleto</div>
      <div class="installment-info">${product.installments}</div>
    </div>
  `;

    card.querySelector('.wishlist-product').addEventListener('click', function () {
        toggleWishlist(product.id, this);
    });

    card.querySelector('.add-to-cart').addEventListener('click', function () {
        addToCart(product.id);
    });

    return card;
}

function initStartTechCarousel() {
    const track = document.getElementById('startTechTrack');
    const dotsContainer = document.getElementById('startTechDots');

    startTechProducts.forEach(product => {
        track.appendChild(createProductCard(product));
    });

    const totalSlides = Math.ceil(startTechProducts.length / getVisibleCards());
    for (let i = 0; i < totalSlides; i++) {
        const dot = document.createElement('div');
        dot.className = `dot ${i === 0 ? 'active' : ''}`;
        dot.addEventListener('click', () => goToStartTechSlide(i));
        dotsContainer.appendChild(dot);
    }

    document.getElementById('startTechPrev').addEventListener('click', () => {
        moveStartTech(-1);
    });

    document.getElementById('startTechNext').addEventListener('click', () => {
        moveStartTech(1);
    });
}

function getVisibleCards() {
    const width = window.innerWidth;
    if (width < 768) return 1;
    if (width < 1024) return 2;
    return 4;
}

function moveStartTech(direction) {
    const track = document.getElementById('startTechTrack');
    const visibleCards = getVisibleCards();
    const maxPosition = startTechProducts.length - visibleCards;

    currentStartTechPosition += direction;

    if (currentStartTechPosition < 0) currentStartTechPosition = 0;
    if (currentStartTechPosition > maxPosition) currentStartTechPosition = maxPosition;

    const cardWidth = track.querySelector('.product-card').offsetWidth;
    const gap = 20;
    const offset = currentStartTechPosition * (cardWidth + gap);

    track.style.transform = `translateX(-${offset}px)`;

    updateStartTechDots();
}

function goToStartTechSlide(index) {
    const visibleCards = getVisibleCards();
    currentStartTechPosition = index * visibleCards;

    const track = document.getElementById('startTechTrack');
    const cardWidth = track.querySelector('.product-card').offsetWidth;
    const gap = 20;
    const offset = currentStartTechPosition * (cardWidth + gap);

    track.style.transform = `translateX(-${offset}px)`;

    updateStartTechDots();
}

function updateStartTechDots() {
    const dots = document.querySelectorAll('#startTechDots .dot');
    const visibleCards = getVisibleCards();
    const currentSlide = Math.floor(currentStartTechPosition / visibleCards);

    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlide);
    });
}

function initOffersTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const grid = document.getElementById('offersGrid');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            tabButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const tab = button.getAttribute('data-tab');
            updateOffersGrid(tab);
        });
    });

    updateOffersGrid('notebook');
}

function updateOffersGrid(category) {
    const grid = document.getElementById('offersGrid');
    grid.innerHTML = '';

    offersTabs[category].forEach(product => {
        grid.appendChild(createProductCard(product));
    });
}

function toggleWishlist(productId, button) {
    const icon = button.querySelector('i');

    if (wishlist.has(productId)) {
        wishlist.delete(productId);
        icon.className = 'far fa-heart';
        button.classList.remove('active');
    } else {
        wishlist.add(productId);
        icon.className = 'fas fa-heart';
        button.classList.add('active');
    }
}

function addToCart(productId) {
    cartCount++;
    updateCartBadge();

    showNotification('Produto adicionado ao carrinho!');
}

function updateCartBadge() {
    document.getElementById('cartBadge').textContent = cartCount;
}

function showNotification(message) {
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
    position: fixed;
    top: 100px;
    right: 20px;
    background-color: #1AA34A;
    color: white;
    padding: 16px 24px;
    border-radius: 12px;
    box-shadow: 0 4px 16px rgba(0,0,0,0.2);
    z-index: 1000;
    font-weight: 600;
    animation: slideIn 0.3s ease-out;
  `;

    const style = document.createElement('style');
    style.textContent = `
    @keyframes slideIn {
      from {
        transform: translateX(400px);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }
    @keyframes slideOut {
      from {
        transform: translateX(0);
        opacity: 1;
      }
      to {
        transform: translateX(400px);
        opacity: 0;
      }
    }
  `;
    document.head.appendChild(style);

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-in';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

function initNewsletterForm() {
    const form = document.getElementById('newsletterForm');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        showNotification('Inscrito com sucesso na newsletter!');
        form.reset();
    });
}

window.addEventListener('resize', () => {
    const track = document.getElementById('startTechTrack');
    track.style.transform = 'translateX(0)';
    currentStartTechPosition = 0;
    updateStartTechDots();
});

document.addEventListener('DOMContentLoaded', () => {
    initHeroCarousel();
    initStartTechCarousel();
    initOffersTabs();
    initNewsletterForm();
});
