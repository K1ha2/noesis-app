function isMemoryEnabled() {
  return document.getElementById("toggle-memory")?.checked ?? true;
}

document.addEventListener("DOMContentLoaded", () => {
  const chatInput = document.getElementById("chat-input");
  const chatSend = document.getElementById("chat-send");
  const chatResponse = document.getElementById("chat-response");
  const fileInput = document.getElementById("file-upload");
  const fileUploadBtn = document.getElementById("file-upload-btn");

  const CHATGPT_API_KEY = "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"; // Be sure to keep this secret in production!

  async function fetchChatGPT(prompt) {
    const endpoint = "https://api.openai.com/v1/chat/completions";

    const payload = {
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are Noesis, a smart educational assistant." },
        { role: "user", content: prompt }
      ],
      temperature: 0.7
    };

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${CHATGPT_API_KEY}`
        },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      return data.choices?.[0]?.message?.content || "No response from the model.";
    } catch (err) {
      console.error(err);
      return "You're offline or something went wrong.";
    }
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
      fileNote = `\n\nUser uploaded a file named "${file.name}" of type "${file.type}".`;
    }

    chatResponse.innerText = "Thinking...";
    const answer = await fetchChatGPT(question + fileNote);
    chatResponse.innerHTML = answer;

    if (window.renderMathInElement) {
      renderMathInElement(chatResponse, {
        delimiters: [
          { left: "$$", right: "$$", display: true },
          { left: "$", right: "$", display: false }
        ]
      });
    }

    if (isMemoryEnabled()) {
      let memory = JSON.parse(localStorage.getItem("chat_memory") || "[]");
      memory.push({ q: question, a: answer });
      localStorage.setItem("chat_memory", JSON.stringify(memory));
    }
  });

  fileUploadBtn.addEventListener("click", () => {
    const file = fileInput.files[0];
    if (!file) {
      chatResponse.innerText = "Please select a file to upload.";
      return;
    }

    const fileInfo = `You uploaded: ${file.name} (${Math.round(file.size / 1024)} KB)`;
    const fakeReply = `Thanks for uploading "${file.name}". I’ll help you with this as soon as I'm online.`;

    chatResponse.innerHTML = fakeReply;
    if (window.renderMathInElement) {
      renderMathInElement(chatResponse);
    }

    let memory = JSON.parse(localStorage.getItem("chat_memory") || "[]");
    memory.push({ file: file.name, note: "Uploaded" });
    localStorage.setItem("chat_memory", JSON.stringify(memory));
  });
});
