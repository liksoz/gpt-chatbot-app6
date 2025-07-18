document.getElementById("sendBtn").addEventListener("click", async () => {
  const userInput = document.getElementById("userInput").value;
  const res = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: userInput })
  });
  const data = await res.json();
  document.getElementById("chatbox").innerHTML += `<p><b>🤖:</b> ${data.reply}</p>`;
});
