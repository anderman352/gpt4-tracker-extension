
let lastMessageId = null;

function detectNewMessage() {
  const chatBoxes = document.querySelectorAll('[data-message-author-role="user"]');
  if (chatBoxes.length === 0) return;

  const lastBox = chatBoxes[chatBoxes.length - 1];
  const messageId = lastBox.getAttribute('data-message-id');

  if (messageId && messageId !== lastMessageId) {
    lastMessageId = messageId;

    const modelLabel = document.querySelector('nav')?.innerText;
    if (modelLabel && /GPT-4|4o/i.test(modelLabel)) {
      chrome.runtime.sendMessage({ type: "incrementCount" });
    }
  }
}

setInterval(detectNewMessage, 2000);
