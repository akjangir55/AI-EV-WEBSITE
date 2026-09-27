// =========================
// Mobile Navigation
// =========================

const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");

menuToggle.addEventListener("click", () => {
  navMenu.classList.toggle("active");
});


// Close mobile menu after clicking a link

const navLinks = document.querySelectorAll("#navMenu a");

navLinks.forEach(link => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("active");
  });
});


// =========================
// Test Drive Modal
// =========================

const testDriveBtn = document.getElementById("testDriveBtn");
const modal = document.getElementById("testDriveModal");
const modalClose = document.getElementById("modalClose");
const testDriveForm = document.getElementById("testDriveForm");
const formMessage = document.getElementById("formMessage");


// Open modal

document.querySelectorAll('a[href="#test-drive"]').forEach(button => {
  button.addEventListener("click", (event) => {
    event.preventDefault();
    modal.classList.add("active");
  });
});


testDriveBtn.addEventListener("click", () => {
  modal.classList.add("active");
});


// Close modal

modalClose.addEventListener("click", () => {
  modal.classList.remove("active");
});


// Close when clicking outside modal

modal.addEventListener("click", (event) => {
  if (event.target === modal) {
    modal.classList.remove("active");
  }
});


// =========================
// Form Submission
// =========================

testDriveForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const name = document.getElementById("name").value;

  formMessage.textContent =
    `Thanks ${name}! Your test-drive request has been received.`;

  testDriveForm.reset();
});


// =========================
// Escape Key
// =========================

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    modal.classList.remove("active");
    navMenu.classList.remove("active");
  }
});
