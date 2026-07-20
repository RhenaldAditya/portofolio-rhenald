document.addEventListener("DOMContentLoaded", function() {
    const textElement = document.getElementById("typed-text");
    // Daftar kata yang akan diketik bergantian
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
            typingSpeed = 50; // Kecepatan menghapus lebih cepat
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

    // Memulai efek animasi
    type();

    // Mengambil semua tautan yang ada di dalam navbar
    const navLinks = document.querySelectorAll('.navbar a');

    // Menambahkan event klik pada setiap tautan
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault(); // Mencegah lompatan standar HTML
            
            // Mengambil ID tujuan dari atribut href (misal: #about)
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            // Memerintahkan browser untuk menggulir halus ke section tujuan
            if(targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});