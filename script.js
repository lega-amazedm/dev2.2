document.addEventListener('DOMContentLoaded', function () {
    // Мобильное меню
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileNavLinks = document.querySelector('.nav-links');

    if (menuToggle && mobileNavLinks) {
        menuToggle.addEventListener('click', function () {
            mobileNavLinks.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
    }

    // Плавная прокрутка
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Закрываем мобильное меню если оно открыто
                if (mobileNavLinks.classList.contains('active')) {
                    mobileNavLinks.classList.remove('active');
                    menuToggle.classList.remove('active');
                }
            }
        });
    });

    // Анимация при скролле
    const animateOnScroll = function () {
        const elements = document.querySelectorAll('.feature-card, .section-header, .mods-category, .dev-category, .order-form');
        
        elements.forEach((element, index) => {
            element.style.setProperty('--animation-order', index);
            
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.classList.add('animated');
            }
        });
    };

    // Анимация хедера при скролле
    const header = document.querySelector('.header');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        lastScrollTop = scrollTop;
        
        // Запускаем анимацию элементов
        animateOnScroll();
    });

    // Анимация для карточек при наведении
    const cards = document.querySelectorAll('.feature-card, .mods-category, .dev-category, .mod-item, .dev-item');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = 'var(--shadow-md)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'var(--shadow-sm)';
        });
    });

    // Инициализация анимаций
    animateOnScroll(); // Инициализация при загрузке
});