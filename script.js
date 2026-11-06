document.addEventListener("DOMContentLoaded", function() {
    // Mengambil fungsi createApp dari pustaka Vue yang dimuat via CDN
    if (typeof Vue !== 'undefined' && document.getElementById('app')) {
        const { createApp } = Vue;
        createApp({
            data() {
                return {
                    message: 'Halo dari Vue.js!'
                }
            },
            methods: {
                changeMessage() {
                    this.message = 'Vue.js Berhasil Terintegrasi!';
                }
            }
        }).mount('#app');
    }

    // --- ANIMASI KETIK (TYPING EFFECT) ---
    const textElement = document.getElementById("typed-text");
    if (textElement) {
        const words = ["Web Developer.", "Mahasiswa IT.", "Programmer."];
        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typingSpeed = 100;

        function type() {
            const currentWord = words[wordIndex];
            
            if (isDeleting) {
                textElement.textContent = currentWord.substring(0, charIndex - 1);
                charIndex--;
                typingSpeed = 50;
            } else {
                textElement.textContent = currentWord.substring(0, charIndex + 1);
                charIndex++;
                typingSpeed = 150;
            }

            if (!isDeleting && charIndex === currentWord.length) {
                isDeleting = true;
                typingSpeed = 1500;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length;
                typingSpeed = 500;
            }

            setTimeout(type, typingSpeed);
        }

        type();
    }

    // --- NAVIGASI HALUS (SMOOTH SCROLL) ---
    const navLinks = document.querySelectorAll('.nav-links a, .navbar a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId && targetId.startsWith('#')) {
                e.preventDefault();
                const targetSection = document.querySelector(targetId);
                if (targetSection) {
                    targetSection.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // --- POPUP DETAIL PROYEK ---
    const popup = document.getElementById('project-popup');
    if (popup) {
        const popupTitle = document.getElementById('popup-title');
        const popupDesc = document.getElementById('popup-desc');

        function openPopup(card) {
            const info = card.querySelector('.portfolio-info');
            const title = info ? info.querySelector('h3') : null;
            const desc = info ? info.querySelector('p') : null;

            popupTitle.textContent = title ? title.textContent.trim() : '';
            popupDesc.textContent = desc ? desc.textContent.trim() : '';
            popup.classList.add('active');
        }

        function closePopup() {
            popup.classList.remove('active');
        }

        document.querySelectorAll('.portfolio-item').forEach(card => {
            const btn = card.querySelector('.btn-detail');
            if (btn) {
                btn.addEventListener('click', () => openPopup(card));
            }
        });

        const closeBtn = popup.querySelector('.popup-close');
        if (closeBtn) closeBtn.addEventListener('click', closePopup);
        
        popup.addEventListener('click', function(e) {
            if (e.target === popup) closePopup();
        });
        
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') closePopup();
        });
    }

    // --- FITUR TEMA (LIGHT & DARK MODE) ---
    const themeToggleBtn = document.getElementById('theme-toggle-btn');
    const themeToggleText = themeToggleBtn ? themeToggleBtn.querySelector('.theme-toggle-text') : null;

    function setTheme(theme, save = true) {
        if (theme === 'dark') {
            document.documentElement.setAttribute('data-theme', 'dark');
            document.body.classList.add('dark-mode');
            if (themeToggleText) themeToggleText.textContent = 'Light';
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
            document.body.classList.remove('dark-mode');
            if (themeToggleText) themeToggleText.textContent = 'Dark';
        }

        if (save) {
            localStorage.setItem('portfolio-theme', theme);
        }
    }

    // Inisialisasi tema saat halaman pertama kali dibuka
    const savedTheme = localStorage.getItem('portfolio-theme');
    if (savedTheme) {
        setTheme(savedTheme, false);
    } else {
        const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        setTheme(prefersDark ? 'dark' : 'light', false);
    }

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', function() {
            const currentTheme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
            const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
            setTheme(nextTheme, true);
        });
    }

    // Deteksi otomatis jika preferensi sistem berganti dan user belum memilih manual
    if (window.matchMedia) {
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function(e) {
            if (!localStorage.getItem('portfolio-theme')) {
                setTheme(e.matches ? 'dark' : 'light', false);
            }
        });
    }

    // --- FITUR GAYA FONT (MONTSERRAT & MODERN STYLES) ---
    const fontSwitcherToggle = document.getElementById('font-switcher-toggle');
    const fontSwitcherMenu = document.getElementById('font-switcher-menu');
    const fontOptionBtns = document.querySelectorAll('.font-option-btn');
    const fontCurrentLabel = document.querySelector('.font-current-name');

    const fontMap = {
        'montserrat': { name: 'Montserrat', family: "'Montserrat', sans-serif" },
        'jakarta': { name: 'Plus Jakarta Sans', family: "'Plus Jakarta Sans', sans-serif" },
        'inter': { name: 'Inter', family: "'Inter', sans-serif" },
        'poppins': { name: 'Poppins', family: "'Poppins', sans-serif" }
    };

    function applyFont(fontKey) {
        if (!fontMap[fontKey]) fontKey = 'montserrat';
        
        document.documentElement.style.setProperty('--font-main', fontMap[fontKey].family);
        if (fontCurrentLabel) {
            fontCurrentLabel.textContent = fontMap[fontKey].name;
        }

        fontOptionBtns.forEach(btn => {
            if (btn.getAttribute('data-font') === fontKey) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });

        localStorage.setItem('portfolio-selected-font', fontKey);
    }

    if (fontSwitcherToggle && fontSwitcherMenu) {
        fontSwitcherToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            fontSwitcherMenu.classList.toggle('active');
        });

        fontOptionBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const selectedFont = this.getAttribute('data-font');
                applyFont(selectedFont);
                fontSwitcherMenu.classList.remove('active');
            });
        });

        document.addEventListener('click', function(e) {
            const switcher = document.getElementById('font-switcher');
            if (switcher && !switcher.contains(e.target)) {
                fontSwitcherMenu.classList.remove('active');
            }
        });

        const savedFont = localStorage.getItem('portfolio-selected-font') || 'montserrat';
        applyFont(savedFont);
    }
});
