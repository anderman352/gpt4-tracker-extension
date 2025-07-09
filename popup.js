
(() => {
  const usageText = document.getElementById("usageText");
  const addBtn = document.getElementById("addBtn");
  const resetBtn = document.getElementById("resetBtn");

  const updateUI = () => {
    chrome.storage.local.get(["count", "startTime"], (data) => {
      const count = Number(data.count) || 0;
      const startTime = new Date(Number(data.startTime) || Date.now());
      const nextRefresh = new Date(startTime.getTime() + 3 * 60 * 60 * 1000);

      const percent = Math.floor((count / 50) * 100);
      const refreshTime = nextRefresh.toLocaleTimeString("en-US", {
        timeZone: "America/New_York",
        hour: "2-digit",
        minute: "2-digit",
      });

      usageText.innerHTML = `${count}/50 messages used (${percent}%)<br>Resets at: ${refreshTime}`;
    });
  };

  const safelyIncrementCount = () => {
    chrome.storage.local.get("count", (data) => {
      const current = Number(data.count) || 0;
      chrome.storage.local.set({ count: current + 1 }, updateUI);
    });
  };

  const safelyResetCount = () => {
    chrome.storage.local.set({ count: 0, startTime: Date.now() }, updateUI);
  };

  if (addBtn) {
    addBtn.addEventListener("click", safelyIncrementCount);
  }

  if (resetBtn) {
    resetBtn.addEventListener("click", safelyResetCount);
  }

  updateUI();
})();
