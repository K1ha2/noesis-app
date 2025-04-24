// ========= Section Navigation ========= //
function showSection(sectionId) {
  const sections = document.querySelectorAll(".section");
  sections.forEach(section => {
    section.classList.remove("active");
    section.style.display = "none";
  });

  const target = document.getElementById(sectionId);
  if (target) {
    target.classList.add("active");
    target.style.display = "block";
  }
}

// ========= PWA Installation Support ========= //
let deferredPrompt;

window.addEventListener("beforeinstallprompt", (e) => {
  e.preventDefault();
  deferredPrompt = e;
  const installBtn = document.getElementById("installAppBtn");
  if (installBtn) installBtn.style.display = "inline-block";
});

document.addEventListener("DOMContentLoaded", () => {
  showSection("chat-section"); // Default section

  const installBtn = document.getElementById("installAppBtn");
  if (installBtn) {
    installBtn.addEventListener("click", () => {
      if (deferredPrompt) {
        deferredPrompt.prompt();
        deferredPrompt.userChoice.then(choice => {
          if (choice.outcome === "accepted") {
            console.log("User accepted the install prompt");
          } else {
            console.log("User dismissed the install prompt");
          }
          deferredPrompt = null;
        });
      }
    });
  }

  // Show app version if element exists
  const versionTag = document.getElementById("app-version");
  if (versionTag) versionTag.textContent = "v1.0.0";

  // Show offline warning
  window.addEventListener("offline", () => {
    alert("You are now offline. Some features may not work.");
  });

  // Optional: Add loader spinner on section change
  const navLinks = document.querySelectorAll(".nav-link");
  navLinks.forEach(link => {
    link.addEventListener("click", () => {
      const loader = document.getElementById("loader");
      if (loader) {
        loader.style.display = "block";
        setTimeout(() => loader.style.display = "none", 600); // Simulate loading
      }
    });
  });
});