const musicUrlInput = document.getElementById("music-url");
const musicDownloadBtn = document.getElementById("music-download");
const musicStatus = document.getElementById("music-status");
const musicList = document.getElementById("music-list");

// Safely parse JSON or return fallback
function safeParse(json, fallback) {
  try {
    return JSON.parse(json) || fallback;
  } catch {
    return fallback;
  }
}

// Load saved music list into the UI
function loadMusicList() {
  const savedSongs = safeParse(localStorage.getItem("noesis_music"), []);
  musicList.innerHTML = "";

  savedSongs.forEach((song, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <strong>${song.name}</strong><br>
      <audio controls src="${song.url}"></audio>
    `;
    musicList.appendChild(li);
  });
}

// Handle adding a new music URL
musicDownloadBtn.addEventListener("click", () => {
  const url = musicUrlInput.value.trim();

  if (!url) {
    musicStatus.innerText = "Please paste a URL.";
    return;
  }

  // Basic audio URL validation (just a hint, not full-proof)
  const isAudio = /\.(mp3|wav|ogg|aac)$/i.test(url) || url.includes("data:audio");
  if (!isAudio) {
    musicStatus.innerText = "Invalid or unsupported audio URL.";
    return;
  }

  const fakeFile = {
    name: `Track ${new Date().toLocaleString()}`,
    url: url
  };

  let savedSongs = safeParse(localStorage.getItem("noesis_music"), []);
  savedSongs.push(fakeFile);
  localStorage.setItem("noesis_music", JSON.stringify(savedSongs));

  musicStatus.innerText = "Saved for offline access.";
  musicUrlInput.value = "";
  loadMusicList();
});

loadMusicList();