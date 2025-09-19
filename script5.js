document.addEventListener("DOMContentLoaded", () => {
  const chatBox = document.getElementById("chat-box");
  const openChat = document.getElementById("open-chat");
  const closeChat = document.getElementById("close-chat");
  const sendBtn = document.getElementById("send-btn");
  const chatInput = document.getElementById("chat-input");
  const chatMessages = document.getElementById("chat-messages");

  openChat.addEventListener("click", () => {
    chatBox.style.display = "flex";
    openChat.style.display = "none";
  });

  closeChat.addEventListener("click", () => {
    chatBox.style.display = "none";
    openChat.style.display = "block";
  });

  async function sendMessage() {
    const msg = chatInput.value.trim();
    if (!msg) return;

    const userMsg = document.createElement("p");
    userMsg.className = "text-right text-green-400 mb-2";
    userMsg.textContent = `You: ${msg}`;
    chatMessages.appendChild(userMsg);
    chatInput.value = "";

    try {
    
      const backendURL =
        window.location.origin.includes("127.0.0.1") ||
        window.location.origin.includes("localhost")
          ? "/chat"
          : "http://127.0.0.1:5000/chat";

      const res = await fetch(backendURL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: msg }),
      });

      if (!res.ok) throw new Error("Server error");

      const data = await res.json();

      const botMsg = document.createElement("p");
      botMsg.className = "text-left text-blue-400 mb-2";
      botMsg.textContent = `Bot: ${data.reply}`;
      chatMessages.appendChild(botMsg);
      chatMessages.scrollTop = chatMessages.scrollHeight;
    } catch (err) {
      const errMsg = document.createElement("p");
      errMsg.className = "text-red-400";
      errMsg.textContent = "Error: could not connect to server.";
      chatMessages.appendChild(errMsg);
    }
  }

  sendBtn.addEventListener("click", sendMessage);
  chatInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") sendMessage();
  });
});
