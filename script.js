// Navigasyon Aktif Link Belirleme
function setActiveNavLink() {
    const navLinks = document.querySelectorAll("nav ul li a");
    const pathSegments = window.location.pathname.split("/").filter(Boolean);
    const currentPage = pathSegments.length > 0 ? pathSegments.pop() : "index.html"; 

    navLinks.forEach(link => {
        const linkHref = link.getAttribute('href').split('#')[0]; // Anchor tag'leri dikkate alma

        if (linkHref === currentPage || (currentPage === "" && linkHref === "index.html")) {
            link.classList.add("active"); 
        } else {
            link.classList.remove("active");
        }
    });
}

// İletişim Formu İşleyicisi
function handleFormSubmit(event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    const feedback = document.getElementById('formFeedback');

    // Bu kısım gerçek bir backend/form hizmeti (Formspree, Netlify Forms vb.) ile entegre edilmelidir.
    if (!name || !email || !message) {
        feedback.textContent = 'Lütfen tüm alanları doldurun.';
        feedback.style.color = '#e54d26'; // Vurgu rengiyle hata mesajı
    } else if (!/\S+@\S+\.\S+/.test(email)) {
        feedback.textContent = 'Lütfen geçerli bir e-posta girin.';
        feedback.style.color = '#e54d26';
    } else {
        // Başarılı Simülasyon
        feedback.textContent = 'Mesajınız başarıyla alındı! Teşekkürler.';
        feedback.style.color = '#192330'; 
        document.getElementById('contactForm').reset();
    }
}

// Hakkımda Sayfası - Daha Az/Daha Çok Gör Butonu
function setupToggleMoreButton() {
    const toggleButton = document.getElementById('toggleMore');
    const moreInfo = document.getElementById('moreInfo');

    if (toggleButton && moreInfo) { 
        toggleButton.addEventListener('click', function() {
            const isHidden = moreInfo.style.display === "none" || moreInfo.style.display === "";
            moreInfo.style.display = isHidden ? "block" : "none"; 
            this.textContent = isHidden ? "Detayları Gizle" : "Kariyer Hedefleri ve Detaylar"; 
        });
    }
}

// Footer'ı Dinamik Olarak Yükleme
function loadFooter(footerId) {
    const footerElement = document.getElementById(footerId);
    if (footerElement) {
        // fetch('footer.html') kullanmak yerine, projenin tamamen çalışabilmesi için 
        // HTML'i doğrudan JavaScript içinde tanımlayalım.
        // Gerçek bir projede, footer.html'i fetch ile yüklemek daha iyidir.
        const footerContent = `
            <div class="footer-content">
                <div class="social-links">
                    <a href="https://www.linkedin.com" target="_blank">LinkedIn</a> |
                    <a href="https://www.github.com" target="_blank">GitHub</a> 
                </div>
                <div class="footer-info">
                    <p>&copy; ${new Date().getFullYear()} Hilal Kutlu. Tüm hakları saklıdır.</p>
                    <p>Contact: <a href="mailto:hilal.kutlu.tr@gmail.com">hilal.kutlu.tr@gmail.com</a></p>
                </div>
            </div>
        `;
        footerElement.innerHTML = footerContent;
        footerElement.classList.add('footer'); // CSS sınıfını ekle
    }
}


document.addEventListener("DOMContentLoaded", function() {
    setActiveNavLink(); 
    loadFooter("mainFooter"); 
    setupToggleMoreButton();

    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmit);
    }
});