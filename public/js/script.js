const sidebar = document.getElementById('sidebar');
const sidebarOverlay = document.getElementById('sidebarOverlay');
const menuToggle = document.getElementById('menuToggle');
const sidebarClose = document.getElementById('sidebarClose');

let currentSlide = 0;
const slides = document.querySelectorAll('.hero-slide');
const dots = document.querySelectorAll('.hero-dots .dot');
let autoSlideInterval;

function showSlide(index) {
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));

    if (index >= slides.length) {
        currentSlide = 0;
    } else if (index < 0) {
        currentSlide = slides.length - 1;
    } else {
        currentSlide = index;
    }

    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
}

function nextSlide() {
    showSlide(currentSlide + 1);
}

function prevSlide() {
    showSlide(currentSlide - 1);
}

function startAutoSlide() {
    autoSlideInterval = setInterval(nextSlide, 5000);
}

function stopAutoSlide() {
    clearInterval(autoSlideInterval);
}

// Event Listeners
document.getElementById('heroNext').addEventListener('click', () => {
    nextSlide();
    stopAutoSlide();
    startAutoSlide();
});

document.getElementById('heroPrev').addEventListener('click', () => {
    prevSlide();
    stopAutoSlide();
    startAutoSlide();
});

dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        showSlide(index);
        stopAutoSlide();
        startAutoSlide();
    });
});

// Start auto-slide
startAutoSlide();

// Start Tech Carousel
let startTechPosition = 0;
const startTechTrack = document.getElementById('startTechTrack');
const startTechCards = document.querySelectorAll('#startTechTrack .product-card');
const startTechPrev = document.getElementById('startTechPrev');
const startTechNext = document.getElementById('startTechNext');

function getCardsPerView() {
    if (window.innerWidth <= 480) return 1;
    if (window.innerWidth <= 1024) return 2;
    return 4;
}

function updateStartTechCarousel() {
    const cardsPerView = getCardsPerView();
    const maxPosition = Math.max(0, startTechCards.length - cardsPerView);

    if (startTechPosition > maxPosition) {
        startTechPosition = maxPosition;
    }

    const cardWidth = startTechCards[0].offsetWidth;
    const gap = 20;
    const offset = -(startTechPosition * (cardWidth + gap));

    startTechTrack.style.transform = `translateX(${offset}px)`;
}

startTechNext.addEventListener('click', () => {
    const cardsPerView = getCardsPerView();
    const maxPosition = Math.max(0, startTechCards.length - cardsPerView);

    if (startTechPosition < maxPosition) {
        startTechPosition++;
        updateStartTechCarousel();
    }
});

startTechPrev.addEventListener('click', () => {
    if (startTechPosition > 0) {
        startTechPosition--;
        updateStartTechCarousel();
    }
});

window.addEventListener('resize', updateStartTechCarousel);

function openSidebar() {
    sidebar.classList.add('active');
    sidebarOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeSidebar() {
    sidebar.classList.remove('active');
    sidebarOverlay.classList.remove('active');
    document.body.style.overflow = '';
}

menuToggle.addEventListener('click', openSidebar);
sidebarClose.addEventListener('click', closeSidebar);
sidebarOverlay.addEventListener('click', closeSidebar);

sidebar.addEventListener('click', (e) => {
    if (e.target.classList.contains('sidebar-menu')) {
        return;
    }
    e.stopPropagation();
});

const expandableToggles = document.querySelectorAll('.sidebar-expandable-toggle');
expandableToggles.forEach(toggle => {
    toggle.addEventListener('click', function() {
        const targetId = this.getAttribute('data-target');
        const target = document.getElementById(targetId);

        this.classList.toggle('active');
        target.classList.toggle('active');
    });
});

const brandToggles = document.querySelectorAll('.brand-category-toggle');
brandToggles.forEach(toggle => {
    toggle.addEventListener('click', function() {
        const targetId = this.getAttribute('data-target');
        const target = document.getElementById(targetId);
        const isActive = this.classList.contains('active');

        brandToggles.forEach(t => {
            if (t !== this) {
                t.classList.remove('active');
                const otherId = t.getAttribute('data-target');
                document.getElementById(otherId).classList.remove('active');
            }
        });

        this.classList.toggle('active');
        target.classList.toggle('active');
    });
});

const sidebarContent = document.querySelector('.sidebar-content');
let startX, startY, scrollLeft, scrollTop;
let isDragging = false;

sidebarContent.addEventListener('touchstart', (e) => {
    isDragging = true;
    startY = e.touches[0].pageY - sidebarContent.offsetTop;
    scrollTop = sidebarContent.scrollTop;
}, { passive: true });

sidebarContent.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    const y = e.touches[0].pageY - sidebarContent.offsetTop;
    const walk = (y - startY) * 1.5;
    sidebarContent.scrollTop = scrollTop - walk;
}, { passive: true });

sidebarContent.addEventListener('touchend', () => {
    isDragging = false;
});

let currentBrandIndex = 0;
let brandInterval;
const brands = document.querySelectorAll('.brand-item');
const totalBrands = brands.length;

function updateBrandsCarousel() {
    brands.forEach((brand, index) => {
        brand.classList.remove('center', 'left', 'right', 'hidden');

        const leftIndex = (currentBrandIndex - 1 + totalBrands) % totalBrands;
        const rightIndex = (currentBrandIndex + 1) % totalBrands;

        if (index === currentBrandIndex) {
            brand.classList.add('center');
        } else if (index === leftIndex) {
            brand.classList.add('left');
        } else if (index === rightIndex) {
            brand.classList.add('right');
        } else {
            brand.classList.add('hidden');
        }
    });
}

function rotateBrands() {
    currentBrandIndex = (currentBrandIndex + 1) % totalBrands;
    updateBrandsCarousel();
}

function startBrandsCarousel() {
    updateBrandsCarousel();
    brandInterval = setInterval(rotateBrands, 5000);
}

if (brands.length > 0) {
    startBrandsCarousel();
}

const categoriesGrid = document.querySelector('.categories-grid');
let startXCategories, scrollLeftCategories;
let isDraggingCategories = false;

if (categoriesGrid) {
    categoriesGrid.addEventListener('touchstart', (e) => {
        isDraggingCategories = true;
        startXCategories = e.touches[0].pageX;
        scrollLeftCategories = categoriesGrid.scrollLeft;
    }, { passive: true });

    categoriesGrid.addEventListener('touchmove', (e) => {
        if (!isDraggingCategories) return;
        const x = e.touches[0].pageX;
        const walk = (startXCategories - x) * 1.5;
        categoriesGrid.scrollLeft = scrollLeftCategories + walk;
    }, { passive: true });

    categoriesGrid.addEventListener('touchend', () => {
        isDraggingCategories = false;
    });

    categoriesGrid.style.overflowX = 'auto';
    categoriesGrid.style.scrollBehavior = 'smooth';
}

const productsTrack = document.getElementById('startTechTrack');
let startXProducts, scrollLeftProducts;
let isDraggingProducts = false;

if (productsTrack) {
    productsTrack.addEventListener('touchstart', (e) => {
        isDraggingProducts = true;
        startXProducts = e.touches[0].pageX - productsTrack.offsetLeft;
        scrollLeftProducts = productsTrack.scrollLeft;
        productsTrack.style.cursor = 'grabbing';
    }, { passive: true });

    productsTrack.addEventListener('touchmove', (e) => {
        if (!isDraggingProducts) return;
        const x = e.touches[0].pageX - productsTrack.offsetLeft;
        const walk = (startXProducts - x) * 2;
        productsTrack.scrollLeft = scrollLeftProducts + walk;
    }, { passive: true });

    productsTrack.addEventListener('touchend', () => {
        isDraggingProducts = false;
        productsTrack.style.cursor = 'grab';
    });

    productsTrack.addEventListener('mousedown', (e) => {
        isDraggingProducts = true;
        startXProducts = e.pageX - productsTrack.offsetLeft;
        scrollLeftProducts = productsTrack.scrollLeft;
        productsTrack.style.cursor = 'grabbing';
        e.preventDefault();
    });

    productsTrack.addEventListener('mousemove', (e) => {
        if (!isDraggingProducts) return;
        const x = e.pageX - productsTrack.offsetLeft;
        const walk = (startXProducts - x) * 2;
        productsTrack.scrollLeft = scrollLeftProducts + walk;
    });

    productsTrack.addEventListener('mouseup', () => {
        isDraggingProducts = false;
        productsTrack.style.cursor = 'grab';
    });

    productsTrack.addEventListener('mouseleave', () => {
        isDraggingProducts = false;
        productsTrack.style.cursor = 'grab';
    });

    productsTrack.style.cursor = 'grab';
}

document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".moneyStyle").forEach(div => {
        const valor = parseFloat(div.dataset.valor);

        if (!isNaN(valor)) {
        div.textContent = valor.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        });
        }
    });
});
