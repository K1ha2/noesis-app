// ====== Calorie Counter ====== //
const foodInput = document.getElementById("food-image");
const analyzeBtn = document.getElementById("analyze-food");
const calorieResult = document.getElementById("calorie-result");
const calorieHistory = document.getElementById("calorie-history");

analyzeBtn.addEventListener("click", () => {
  const file = foodInput.files[0];
  if (!file) {
    calorieResult.innerText = "Please upload a food image.";
    return;
  }

  const fakeCalories = Math.floor(Math.random() * 500) + 100; // Simulated
  const today = new Date().toISOString().split("T")[0];

  calorieResult.innerText = `Calories: ${fakeCalories}`;

  // Save history
  let history = JSON.parse(localStorage.getItem("calorie_history") || "[]");
  history.push({ date: today, cal: fakeCalories });
  localStorage.setItem("calorie_history", JSON.stringify(history));

  updateCalorieHistory();
  drawCalorieChart();
});

function updateCalorieHistory() {
  const history = JSON.parse(localStorage.getItem("calorie_history") || "[]");
  calorieHistory.innerHTML = "";
  history.slice(-7).forEach(item => {
    const li = document.createElement("li");
    li.innerText = `${item.date}: ${item.cal} cal`;
    calorieHistory.appendChild(li);
  });
}

function drawCalorieChart() {
  const canvas = document.getElementById("calorie-chart");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  const history = JSON.parse(localStorage.getItem("calorie_history") || "[]");
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const last7 = history.slice(-7);
  const max = Math.max(...last7.map(i => i.cal), 1000);
  const barWidth = canvas.width / last7.length;

  last7.forEach((item, i) => {
    const height = (item.cal / max) * canvas.height;
    ctx.fillStyle = "#FF9800";
    ctx.fillRect(i * barWidth, canvas.height - height, barWidth - 4, height);
    ctx.fillStyle = "#000";
    ctx.fillText(item.cal, i * barWidth + 5, canvas.height - height - 5);
  });
}

function updateStepsChart() {
  const canvas = document.getElementById("steps-chart");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  const history = loadStepHistory();
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const keys = Object.keys(history).slice(-7);
  const values = keys.map(k => history[k]);
  const barWidth = canvas.width / keys.length;
  const max = Math.max(...values, 1000);

  keys.forEach((key, i) => {
    const height = (values[i] / max) * canvas.height;
    ctx.fillStyle = "#4CAF50";
    ctx.fillRect(i * barWidth, canvas.height - height, barWidth - 4, height);
    ctx.fillStyle = "#000";
    ctx.fillText(values[i], i * barWidth + 5, canvas.height - height - 5);
  });
}

// Load data on start
updateCalorieHistory();
drawCalorieChart();


// ====== Step Counter (Fitness Tracker) ====== //
let stepsToday = 0;
const stepsDisplay = document.getElementById("steps-today");
const startTrackingBtn = document.getElementById("start-step-tracking");

function simulateStepCounting() {
  // Simulate steps every 2 seconds
  setInterval(() => {
    stepsToday += Math.floor(Math.random() * 3); // simulate 0-2 steps
    stepsDisplay.innerText = stepsToday;
    saveSteps(stepsToday);
    updateStepsChart();
  }, 2000);
}

startTrackingBtn.addEventListener("click", () => {
  simulateStepCounting();
  startTrackingBtn.disabled = true;
});

// Save and load steps from localStorage
function saveSteps(count) {
  const today = new Date().toISOString().split("T")[0];
  const history = JSON.parse(localStorage.getItem("step_history") || "{}");
  history[today] = count;
  localStorage.setItem("step_history", JSON.stringify(history));
}

function loadStepHistory() {
  const history = JSON.parse(localStorage.getItem("step_history") || "{}");
  return history;
}

// Draw simple bar chart
function updateStepsChart() {
  const history = loadStepHistory();
  const canvas = document.getElementById("steps-chart");
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const keys = Object.keys(history).slice(-7); // last 7 days
  const values = keys.map(k => history[k]);

  const barWidth = canvas.width / keys.length;
  const max = Math.max(...values, 1000);

  keys.forEach((key, i) => {
    const height = (values[i] / max) * canvas.height;
    ctx.fillStyle = "#4CAF50";
    ctx.fillRect(i * barWidth, canvas.height - height, barWidth - 4, height);
    ctx.fillStyle = "#000";
    ctx.fillText(values[i], i * barWidth + 5, canvas.height - height - 5);
  });
}