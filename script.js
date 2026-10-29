// Theme toggle (remembered in localStorage)
const root = document.documentElement;
const themeBtn = document.getElementById("themeToggle");
try {
  const saved = localStorage.getItem("theme");
  if (saved) root.setAttribute("data-theme", saved);
} catch (e) {}
function syncIcon() {
  if (themeBtn) themeBtn.textContent = root.getAttribute("data-theme") === "dark" ? "☀️" : "🌙";
}
syncIcon();
if (themeBtn) {
  themeBtn.addEventListener("click", () => {
    const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    try { localStorage.setItem("theme", next); } catch (e) {}
    syncIcon();
  });
}

// Mobile menu
const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");
if (menuBtn) menuBtn.addEventListener("click", () => navLinks.classList.toggle("open"));

// Scroll reveal + skill bars
const io = new IntersectionObserver((entries) => {
  entries.forEach((en) => {
    if (en.isIntersecting) {
      en.target.classList.add("show");
      en.target.querySelectorAll(".bar i").forEach((b) => (b.style.width = b.dataset.w + "%"));
      io.unobserve(en.target);
    }
  });
}, { threshold: 0.15 });
document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

// Typing effect on home page
const typing = document.getElementById("typing");
if (typing) {
  const words = ["Web Developer", "MCA Student", "Problem Solver", "ML Enthusiast"];
  let w = 0, c = 0, del = false;
  (function tick() {
    const word = words[w];
    typing.textContent = word.slice(0, c);
    if (!del && c < word.length) c++;
    else if (!del) { del = true; return setTimeout(tick, 1200); }
    else if (c > 0) c--;
    else { del = false; w = (w + 1) % words.length; }
    setTimeout(tick, del ? 50 : 100);
  })();
}

// Project filters
const filterBtns = document.querySelectorAll(".filters button");
filterBtns.forEach((btn) => btn.addEventListener("click", () => {
  filterBtns.forEach((b) => b.classList.remove("active"));
  btn.classList.add("active");
  const f = btn.dataset.filter;
  document.querySelectorAll("#projectGrid .card").forEach((card) => {
    card.classList.toggle("hide", f !== "all" && card.dataset.cat !== f);
  });
}));

// Contact form validation
const form = document.getElementById("contactForm");
if (form) {
  const setErr = (input, msg) => {
    input.classList.toggle("invalid", !!msg);
    input.parentElement.querySelector(".error").textContent = msg;
    return !msg;
  };
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const { name, email, message } = form.elements;
    const okName = setErr(name, name.value.trim().length < 2 ? "Please enter your name." : "");
    const okEmail = setErr(email, /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value) ? "" : "Enter a valid email address.");
    const okMsg = setErr(message, message.value.trim().length < 10 ? "Message must be at least 10 characters." : "");
    if (okName && okEmail && okMsg) {
      document.getElementById("success").style.display = "block";
      form.reset();
    }
  });
}
