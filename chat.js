const proxyUrl = "https://your-vercel-app.vercel.app/api/chat"; // Replace with your actual Vercel domain

function isMemoryEnabled() {
  return document.getElementById("toggle-memory")?.checked ?? true;
}

document.addEventListener("DOMContentLoaded", () => {
  const chatInput = document.getElementById("chat-input");
  const chatSend = document.getElementById("chat-send");
  const chatResponse = document.getElementById("chat-response");
  const fileInput = document.getElementById("file-upload");
  const fileUploadBtn = document.getElementById("file-upload-btn");

  async function sendMessage(prompt) {
    const res = await fetch(proxyUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }]
      })
    });

    const data = await res.json();
    return data.choices?.[0]?.message?.content || "No response.";
  }

  chatSend.addEventListener("click", async () => {
    const question = chatInput.value.trim();
    if (!question) {
      chatResponse.innerText = "Type something!";
      return;
    }

    let fileNote = "";
    const file = fileInput.files[0];
    if (file) {
      fileNote = `\n\nUser uploaded a file: "${file.name}", type: "${file.type}".`;
    }

    chatResponse.innerText = "Thinking...";
    const reply = await sendMessage(question + fileNote);
    chatResponse.innerHTML = reply;

    if (window.renderMathInElement) {
      renderMathInElement(chatResponse);
    }

    if (isMemoryEnabled()) {
      const memory = JSON.parse(localStorage.getItem("chat_memory") || "[]");
      memory.push({ q: question, a: reply });
      localStorage.setItem("chat_memory", JSON.stringify(memory));
    }
  });

  fileUploadBtn.addEventListener("click", () => {
    const file = fileInput.files[0];
    if (!file) {
      chatResponse.innerText = "Please select a file to upload.";
      return;
    }

    chatResponse.innerHTML = `Thanks for uploading "${file.name}".`;
    if (window.renderMathInElement) renderMathInElement(chatResponse);

    const memory = JSON.parse(localStorage.getItem("chat_memory") || "[]");
    memory.push({ file: file.name, note: "Uploaded" });
    localStorage.setItem("chat_memory", JSON.stringify(memory));
  });
});