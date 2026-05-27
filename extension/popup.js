// ============================================================
// AutoPush - Popup JS
// ============================================================

// ---- Tab switching ----
document.querySelectorAll(".tab").forEach((tab) => {
  tab.addEventListener("click", () => {
    document.querySelectorAll(".tab").forEach((t) => t.classList.remove("active"));
    document.querySelectorAll(".panel").forEach((p) => p.classList.remove("active"));
    tab.classList.add("active");
    document.getElementById(`tab-${tab.dataset.tab}`).classList.add("active");
  });
});

// ---- Load saved settings ----
chrome.storage.sync.get(
  ["githubToken", "repoOwner", "repoName", "branch", "folderStyle", "addHeader", "commitTemplate"],
  (data) => {
    if (data.githubToken) document.getElementById("githubToken").value = data.githubToken;
    if (data.repoOwner) document.getElementById("repoOwner").value = data.repoOwner;
    if (data.repoName) document.getElementById("repoName").value = data.repoName;
    document.getElementById("branch").value = data.branch || "main";
    document.getElementById("folderStyle").value = data.folderStyle || "platform/difficulty";
    document.getElementById("addHeader").checked = data.addHeader !== false;
    document.getElementById("commitTemplate").value = data.commitTemplate || "default";

    // Update status dot
    if (data.githubToken && data.repoOwner && data.repoName) {
      document.getElementById("statusDot").classList.add("connected");
    }
  }
);

// ---- Save settings ----
document.getElementById("saveSettings").addEventListener("click", () => {
  const token = document.getElementById("githubToken").value.trim();
  const owner = document.getElementById("repoOwner").value.trim();
  const repo = document.getElementById("repoName").value.trim();
  const branch = document.getElementById("branch").value.trim() || "main";

  chrome.storage.sync.set({ githubToken: token, repoOwner: owner, repoName: repo, branch }, () => {
    showToast("✅ GitHub settings saved!");
    if (token && owner && repo) {
      document.getElementById("statusDot").classList.add("connected");
    }
  });
});

// ---- Save options ----
document.getElementById("saveOptions").addEventListener("click", () => {
  const folderStyle = document.getElementById("folderStyle").value;
  const addHeader = document.getElementById("addHeader").checked;
  const commitTemplate = document.getElementById("commitTemplate").value;

  chrome.storage.sync.set({ folderStyle, addHeader, commitTemplate }, () => {
    showToast("✅ Options saved!");
  });
});

// ---- Load history ----
chrome.storage.local.get("history", ({ history = [] }) => {
  const list = document.getElementById("historyList");

  document.getElementById("statTotal").textContent = history.length;
  document.getElementById("statLeetcode").textContent = history.filter((h) => h.platform === "leetcode").length;
  document.getElementById("statCF").textContent = history.filter((h) => h.platform === "codeforces").length;

  if (history.length === 0) {
    list.innerHTML = `
      <div class="empty-state">
        <div class="icon">🚀</div>
        <div>No pushes yet.<br/>Solve a problem to get started!</div>
      </div>`;
    return;
  }

  list.innerHTML = history.slice(0, 20).map((item) => `
    <div class="history-item">
      <span class="platform-badge ${item.platform}">${item.platform === "leetcode" ? "LC" : "CF"}</span>
      <span class="history-problem" title="${item.title}">${item.title}</span>
      <span class="diff-badge ${item.difficulty}">${item.difficulty}</span>
    </div>
  `).join("");
});

// ---- Toast helper ----
function showToast(msg) {
  const toast = document.getElementById("toast");
  toast.textContent = msg;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 2500);
}
