// lotus.js

document.getElementById("lotusAsk").addEventListener("click", async () => {
    const input = document.getElementById("lotusInput").value.trim();
    const responseContainer = document.getElementById("lotusResponse");
  
    if (!input) {
      responseContainer.textContent = "Please enter something first.";
      return;
    }
  
    responseContainer.textContent = "Thinking...";
  
    try {
      // Basic fetch example using your OpenAI endpoint (modify as needed)
      const res = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer YOUR_OPENAI_API_KEY" // Replace or inject securely
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [{ role: "user", content: input }]
        })
      });
  
      const data = await res.json();
      const output = data.choices?.[0]?.message?.content || "No response.";
      responseContainer.textContent = output;
    } catch (err) {
      responseContainer.textContent = "Error fetching response.";
      console.error("Lotus Error:", err);
    }
  });