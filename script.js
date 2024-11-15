// Dinamik Saat Fonksiyonu
function updateClock() {
    const now = new Date();
    const timeString = now.toLocaleTimeString();
    const timeElement = document.getElementById('dynamicTime');

    if (timeElement) {
        timeElement.textContent = timeString;
    } else {
        console.error("ID 'dynamicTime' öğesi bulunamadı.");
    }
}

document.addEventListener("DOMContentLoaded", function() {
    updateClock();
    setInterval(updateClock, 1000);
});



document.addEventListener("DOMContentLoaded", () => {
    const navLinks = document.querySelectorAll("nav ul li a");
    const currentPage = window.location.pathname.split("/").pop(); 

    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add("active"); 
        }
        
        link.addEventListener("click", function() {
            navLinks.forEach(navLink => navLink.classList.remove("active"));
            this.classList.add("active");
        });
    });
});


// Form 
function handleFormSubmit(event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    const feedback = document.getElementById('formFeedback');

    if (!name || !email || !message) {
        feedback.textContent = 'Lütfen tüm alanları doldurun.';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
        feedback.textContent = 'Lütfen geçerli bir e-posta girin.';
    } else {
        feedback.textContent = 'Mesajınız başarıyla gönderildi!';
    }
}
document.getElementById('contactForm').addEventListener('submit', handleFormSubmit);


// Daha Az Daha Çok Butonu
document.getElementById('toggleMore').addEventListener('click', function() {
    var moreInfo = document.getElementById('moreInfo');
    
   
    if (moreInfo.style.display === "none" || moreInfo.style.display === "") {
        moreInfo.style.display = "block"; 
        this.innerHTML = "Daha Az Gör"; 
    } else {
        moreInfo.style.display = "none"; 
        this.innerHTML = "Daha Fazla Gör"; 
    }
});



// Footer 
class Footer {
    constructor(footerId) {
        this.footerElement = document.getElementById(footerId);
        if (this.footerElement) {
            this.renderFooter();
        }
    }

    renderFooter() {
        this.footerElement.innerHTML = 
            <div class="footer-content">
                <div class="social-links">
                    <a href="https://www.linkedin.com" target="_blank">LinkedIn</a> |
                    <a href="https://www.github.com" target="_blank">GitHub</a> |
                    <a href="https://www.twitter.com" target="_blank">Twitter</a>
                </div>
                <div class="footer-info">
                    <p>&copy; 2024 Hilal Kutlu. All rights reserved.</p>
                    <p>Contact: <a href="mailto:hilal.kutlu.tr@gmail.com">hilal.kutlu.tr@gmail.com</a></p>
                </div>
            </div>
        ;
    }
}

// Footer
function loadFooter(footerId) {
    const footerElement = document.getElementById(footerId);
    if (footerElement) {
        fetch('footer.html') 
            .then(response => response.text())
            .then(data => {
                footerElement.innerHTML = data; 
            })
            .catch(error => console.error('Footer yüklenirken bir hata oluştu:', error));
    }
}

document.addEventListener("DOMContentLoaded", function() {
    setActiveNavLink(); 
    loadFooter("mainFooter"); 
});