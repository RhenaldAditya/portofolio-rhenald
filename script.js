document.addEventListener("DOMContentLoaded", function() {
    // Mengambil fungsi createApp dari pustaka Vue yang dimuat via CDN
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
    }).mount('#app'); // Mengaitkan ke <div id="app">

    const textElement = document.getElementById("typed-text");
    // Daftar kata
    const words = ["Web Developer.", "Mahasiswa IT.", "Programmer."];
    
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function type() {
        const currentWord = words[wordIndex];
        
        // Kondisi jika sedang menghapus kata atau mengetik
        if (isDeleting) {
            textElement.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50; // Kecepatan menghapus 
        } else {
            textElement.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 150; // Kecepatan mengetik
        }

        // Jika kata sudah selesai diketik semua
        if (!isDeleting && charIndex === currentWord.length) {
            isDeleting = true;
            typingSpeed = 1500; // Jeda sebelum mulai menghapus
        } 
        // Jika kata sudah selesai dihapus semua
        else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length; // Pindah ke kata selanjutnya
            typingSpeed = 500; // Jeda sebelum mulai mengetik kata baru
        }

        setTimeout(type, typingSpeed);
    }

    // efek animasi
    type();

    // Mengambil semua tautan yang ada di dalam navbar
    const navLinks = document.querySelectorAll('.navbar a');

    // Menambahkan event klik pada setiap tautan
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if(targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- POPUP DETAIL PROYEK ---
    const popup = document.getElementById('project-popup');

    if (popup) {
        const popupTitle = document.getElementById('popup-title');
        const popupDesc = document.getElementById('popup-desc');

        // Mengambil judul & deskripsi langsung dari dalam card
        function openPopup(card) {
            const info = card.querySelector('.portfolio-info');
            const title = info.querySelector('h3');
            const desc = info.querySelector('p');

            popupTitle.textContent = title ? title.textContent.trim() : '';
            popupDesc.textContent = desc ? desc.textContent.trim() : '';
            popup.classList.add('active');
        }

        function closePopup() {
            popup.classList.remove('active');
        }

        // Pasang aksi klik pada tombol tiap card
        document.querySelectorAll('.portfolio-item').forEach(card => {
            const btn = card.querySelector('.btn-detail');
            if (btn) {
                btn.addEventListener('click', () => openPopup(card));
            }
        });

        // Tutup lewat tombol X, klik area luar, atau tombol Esc
        popup.querySelector('.popup-close').addEventListener('click', closePopup);
        popup.addEventListener('click', function(e) {
            if (e.target === popup) closePopup();
        });
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') closePopup();
        });
    }
});