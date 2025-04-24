document.addEventListener("DOMContentLoaded", () => {
    const modal = document.getElementById("onboarding-modal");
    const checkbox = document.getElementById("accept-terms");
    const startBtn = document.getElementById("start-app");
  
    if (!localStorage.getItem("noesis_accepted_terms")) {
      modal.style.display = "flex";
    }
  
    startBtn.addEventListener("click", () => {
      if (!checkbox.checked) {
        alert("Please accept the Terms of Use to continue.");
        return;
      }
      localStorage.setItem("noesis_accepted_terms", "true");
      modal.style.display = "none";
    });
  });