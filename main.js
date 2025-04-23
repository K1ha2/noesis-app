// ========= Section Navigation ========= //
function showSection(sectionId) {
  const sections = document.querySelectorAll(".section");
  sections.forEach((section) => {
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
  console.log("PWA Install prompt saved.");
});

function installApp() {
  if (deferredPrompt) {
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === "accepted") {
        console.log("User accepted the A2HS prompt");
      } else {
        console.log("User dismissed the A2HS prompt");
      }
      deferredPrompt = null;
    });
  }
}

// ========= Default Load ========= //
document.addEventListener("DOMContentLoaded", () => {
  showSection("chat-section"); // Chat loads by default
});