/* ==========================================================================
   Harvest Training & Education Center - main.js
   ========================================================================== */

/* ---------- 1. Mobile menu ---------- */
const navToggle = document.getElementById("navToggle");
const navMenu = document.getElementById("navMenu");
const navLinks = document.querySelectorAll(".navbar__link");

if (navToggle && navMenu) {
  navToggle.addEventListener("click", () => {
    navToggle.classList.toggle("open");
    navMenu.classList.toggle("open");
  });

  // Close the menu when a link is clicked
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navToggle.classList.remove("open");
      navMenu.classList.remove("open");
    });
  });
}

/* ---------- 2. Active nav link on scroll ---------- */
const sections = document.querySelectorAll("section[id]");

const setActiveLink = () => {
  const scrollPos = window.scrollY + 140;

  sections.forEach((section) => {
    const top = section.offsetTop;
    const height = section.offsetHeight;
    const id = section.getAttribute("id");
    const link = document.querySelector(`.navbar__link[href="#${id}"]`);

    if (link && scrollPos >= top && scrollPos < top + height) {
      navLinks.forEach((l) => l.classList.remove("active"));
      link.classList.add("active");
    }
  });
};

window.addEventListener("scroll", setActiveLink);
window.addEventListener("load", setActiveLink);

/* ---------- 3. Reveal on scroll ---------- */
const revealItems = document.querySelectorAll(".reveal");

if (revealItems.length) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  revealItems.forEach((item) => observer.observe(item));
}

/* ---------- 4. Contact form -> WhatsApp ---------- */
const contactForm = document.getElementById("contactForm");

if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const data = new FormData(contactForm);
    const branchSelect = contactForm.querySelector("#branch");
    const branchName = branchSelect.options[branchSelect.selectedIndex].text;

    const lines = [
      "Hello Harvest! I'd like to enroll.",
      "",
      `Name: ${data.get("name")}`,
      `Phone: ${data.get("phone")}`,
      `Branch: ${branchName}`,
      `Course: ${data.get("course")}`,
    ];

    if (data.get("message")) {
      lines.push(`Message: ${data.get("message")}`);
    }

    const url = `https://wa.me/${data.get("branch")}?text=${encodeURIComponent(lines.join("\n"))}`;
    window.open(url, "_blank", "noopener");
    contactForm.reset();
  });
}