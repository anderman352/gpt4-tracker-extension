
chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.set({
    count: 0,
    startTime: Date.now()
  });
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "incrementCount") {
    chrome.storage.local.get(["count", "startTime"], (data) => {
      const count = Number(data.count || 0) + 1;
      const startTime = Number(data.startTime || Date.now());
      const nextRefresh = new Date(startTime + 3 * 60 * 60 * 1000);

      chrome.storage.local.set({ count });

      if (count % 10 === 0 || count === 50) {
        chrome.notifications.create({
          type: "basic",
          iconUrl: "icon.png",
          title: "GPT-4 Usage Tracker",
          message: `You've used ${count}/50 messages.\nNext refresh at ${nextRefresh.toLocaleTimeString("en-US", { timeZone: "America/New_York" })}`,
          priority: 1
        });
      }

      sendResponse({ success: true });
    });

    return true;
  }
});
