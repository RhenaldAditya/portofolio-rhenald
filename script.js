// Memastikan script berjalan setelah seluruh elemen HTML selesai dimuat browser
document.addEventListener("DOMContentLoaded", function() {
    
    // Mengambil elemen teks <h2> di HTML yang memiliki ID 'greeting'
    const greetingElement = document.getElementById("greeting");
    
    // Mendapatkan jam saat ini dari komputer pengunjung (dalam format 0 - 23)
    const currentHour = new Date().getHours();
    
    // Menyiapkan variabel kosong untuk menyimpan teks sapaan
    let greetingText = "";

    // Logika kondisi untuk menentukan sapaan berdasarkan waktu
    if (currentHour >= 5 && currentHour < 11) {
        greetingText = "Selamat Pagi!"; // Jam 5 sampai 10.59
    } else if (currentHour >= 11 && currentHour < 15) {
        greetingText = "Selamat Siang!"; // Jam 11 sampai 14.59
    } else if (currentHour >= 15 && currentHour < 18) {
        greetingText = "Selamat Sore!"; // Jam 15 sampai 17.59
    } else {
        greetingText = "Selamat Malam!"; // Selain jam di atas
    }

    // Mengganti teks pada elemen HTML dengan sapaan yang sudah ditentukan
    greetingElement.innerText = greetingText;
    
    // Mencetak pesan tersembunyi di Developer Console (tekan F12 di browser untuk melihat)
    // Ini menunjukkan ke rekruter bahwa kamu paham fungsi dasar console
    console.log("Welcome to Rhenald's Portfolio! This page is built with HTML, CSS, and JS.");
});