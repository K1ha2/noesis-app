document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("user-settings-form");
    const nameInput = document.getElementById("setting-name");
    const emailInput = document.getElementById("setting-email");
    const themeSelect = document.getElementById("setting-theme");
    const memoryToggle = document.getElementById("toggle-memory");
    const status = document.getElementById("settings-status");
  
    // Load saved settings
    const saved = JSON.parse(localStorage.getItem("noesis_user_settings") || "{}");
    if (saved.name) nameInput.value = saved.name;
    if (saved.email) emailInput.value = saved.email;
    if (saved.theme) themeSelect.value = saved.theme;
    if (typeof saved.memory !== "undefined") memoryToggle.checked = saved.memory;
  
    applyTheme(saved.theme || "light");
  
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const settings = {
        name: nameInput.value.trim(),
        email: emailInput.value.trim(),
        theme: themeSelect.value,
        memory: memoryToggle.checked
      };
      localStorage.setItem("noesis_user_settings", JSON.stringify(settings));
      status.innerText = "Settings saved!";
      applyTheme(settings.theme);
    });
  });
  
  function applyTheme(theme) {
    document.body.style.backgroundColor = theme === "dark" ? "#121212" : "#f4f4f4";
    document.body.style.color = theme === "dark" ? "#eee" : "#333";
  }

  const darkToggle = document.getElementById("toggle-dark-mode");

darkToggle.addEventListener("change", () => {
  document.body.classList.toggle("dark", darkToggle.checked);
  localStorage.setItem("noesis_dark", darkToggle.checked);
});

document.addEventListener("DOMContentLoaded", () => {
  const dark = localStorage.getItem("noesis_dark") === "true";
  darkToggle.checked = dark;
  if (dark) document.body.classList.add("dark");
});