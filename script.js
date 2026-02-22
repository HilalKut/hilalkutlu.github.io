function setActiveNavLink() {
    const navLinks = document.querySelectorAll(".site-nav a");
    const pathSegments = window.location.pathname.split("/").filter(Boolean);
    const currentPage = pathSegments.length ? pathSegments[pathSegments.length - 1] : "index.html";

    navLinks.forEach((link) => {
        const href = link.getAttribute("href") || "";

        if (href.startsWith("#")) {
            link.classList.remove("active");
            return;
        }

        const linkPage = href.split("#")[0];
        if (linkPage === currentPage || (currentPage === "" && linkPage === "index.html")) {
            link.classList.add("active");
            link.setAttribute("aria-current", "page");
        } else {
            link.classList.remove("active");
            link.removeAttribute("aria-current");
        }
    });
}

function setupMobileMenu() {
    const menuButton = document.querySelector(".menu-toggle");
    const nav = document.getElementById("primaryNav");

    if (!menuButton || !nav) {
        return;
    }

    const closeMenu = () => {
        document.body.classList.remove("menu-open");
        menuButton.setAttribute("aria-expanded", "false");
    };

    menuButton.addEventListener("click", () => {
        const isOpen = document.body.classList.toggle("menu-open");
        menuButton.setAttribute("aria-expanded", String(isOpen));
    });

    nav.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", closeMenu);
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            closeMenu();
        }
    });

    document.addEventListener("click", (event) => {
        if (!document.body.classList.contains("menu-open")) {
            return;
        }

        if (!nav.contains(event.target) && !menuButton.contains(event.target)) {
            closeMenu();
        }
    });
}

function handleFormSubmit(event) {
    event.preventDefault();

    const form = document.getElementById("contactForm");
    const name = document.getElementById("name");
    const email = document.getElementById("email");
    const message = document.getElementById("message");
    const feedback = document.getElementById("formFeedback");

    if (!form || !name || !email || !message || !feedback) {
        return;
    }

    const emailValid = /\S+@\S+\.\S+/.test(email.value.trim());

    if (!name.value.trim() || !email.value.trim() || !message.value.trim()) {
        feedback.textContent = "Lütfen tüm alanları doldurun.";
        feedback.style.color = "#b42318";
        return;
    }

    if (!emailValid) {
        feedback.textContent = "Lütfen geçerli bir e-posta adresi girin.";
        feedback.style.color = "#b42318";
        return;
    }

    feedback.textContent = "Mesajınız alındı. En kısa sürede dönüş yapacağım.";
    feedback.style.color = "#0d4ecf";
    form.reset();
}

function setupToggleMoreButton() {
    const toggleButton = document.getElementById("toggleMore");
    const moreInfo = document.getElementById("moreInfo");

    if (!toggleButton || !moreInfo) {
        return;
    }

    toggleButton.addEventListener("click", () => {
        const isHidden = moreInfo.classList.toggle("hidden");
        toggleButton.textContent = isHidden ? "Kariyer Hedefleri ve Detaylar" : "Detayları Gizle";
        toggleButton.setAttribute("aria-expanded", String(!isHidden));
    });
}

function loadFooter(footerId) {
    const footerElement = document.getElementById(footerId);

    if (!footerElement) {
        return;
    }

    const footerContent = `
        <div class="footer-content">
            <div class="social-links">
                <a href="https://www.linkedin.com/in/hilal-kutlu-672376284/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                <a href="https://github.com/hilalkutlu" target="_blank" rel="noopener noreferrer">GitHub</a>
            </div>
            <div class="footer-info">
                <p>&copy; ${new Date().getFullYear()} Hilal Kutlu. Tüm hakları saklıdır.</p>
                <p>İletişim: <a href="mailto:hilal.kutlu.tr@gmail.com">hilal.kutlu.tr@gmail.com</a></p>
            </div>
        </div>
    `;

    footerElement.innerHTML = footerContent;
    footerElement.classList.add("footer");
}

function setupRevealAnimations() {
    const revealItems = document.querySelectorAll(".reveal");

    if (!revealItems.length || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        revealItems.forEach((item) => item.classList.add("is-visible"));
        return;
    }

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-visible");
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.16 }
    );

    revealItems.forEach((item) => observer.observe(item));
}

document.addEventListener("DOMContentLoaded", () => {
    setActiveNavLink();
    setupMobileMenu();
    loadFooter("mainFooter");
    setupToggleMoreButton();
    setupRevealAnimations();

    const contactForm = document.getElementById("contactForm");
    if (contactForm) {
        contactForm.addEventListener("submit", handleFormSubmit);
    }
});
