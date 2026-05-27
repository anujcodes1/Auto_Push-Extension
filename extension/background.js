// ============================================================
// AutoPush - Background Service Worker
// Receives solved problems and pushes them to GitHub
// ============================================================

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "SOLUTION_ACCEPTED") {
    handleAcceptedSolution(message.payload);
  }
});

// ============================================================
// MAIN HANDLER
// ============================================================
async function handleAcceptedSolution(payload) {
  const config = await getConfig();

  if (!config.githubToken || !config.repoOwner || !config.repoName) {
    showNotification("⚠️ AutoPush", "GitHub not configured! Click the extension icon to set up.");
    return;
  }

  try {
    showNotification("⏳ AutoPush", `Pushing ${payload.title} to GitHub...`);

    const filePath = buildFilePath(payload, config);
    const fileContent = buildFileContent(payload, config);
    const commitMessage = buildCommitMessage(payload, config);

    await pushToGitHub({
      token: config.githubToken,
      owner: config.repoOwner,
      repo: config.repoName,
      branch: config.branch || "main",
      path: filePath,
      content: fileContent,
      message: commitMessage,
    });

    // Log to history
    await logToHistory(payload);

    showNotification(
      "✅ AutoPush - Success!",
      `${payload.title} pushed to ${config.repoOwner}/${config.repoName}`
    );
  } catch (err) {
    console.error("[AutoPush] GitHub push failed:", err);
    showNotification("❌ AutoPush - Failed", err.message || "Could not push to GitHub.");
  }
}

// ============================================================
// FILE PATH BUILDER
// ============================================================
function buildFilePath(payload, config) {
  const folderStyle = config.folderStyle || "platform/difficulty";
  const slug = sanitize(payload.slug || payload.title);
  const ext = payload.extension;

  if (payload.platform === "leetcode") {
    const id = payload.problemId?.toString().padStart(4, "0") || "0000";
    const diff = payload.difficulty.toLowerCase();

    if (folderStyle === "platform/difficulty") {
      return `leetcode/${diff}/${id}-${slug}.${ext}`;
    } else if (folderStyle === "platform/language") {
      return `leetcode/${payload.language.toLowerCase()}/${id}-${slug}.${ext}`;
    } else {
      return `leetcode/${id}-${slug}.${ext}`;
    }
  }

  if (payload.platform === "codeforces") {
    const contest = payload.contestId;
    const index = payload.problemIndex?.toUpperCase();

    if (folderStyle === "platform/difficulty") {
      const rating = payload.difficulty !== "Unrated" ? payload.difficulty : "unrated";
      return `codeforces/${rating}/${contest}${index}-${slug}.${ext}`;
    } else if (folderStyle === "platform/language") {
      return `codeforces/${payload.language.toLowerCase()}/${contest}${index}-${slug}.${ext}`;
    } else {
      return `codeforces/${contest}${index}-${slug}.${ext}`;
    }
  }

  return `solutions/${sanitize(payload.title)}.${ext}`;
}

// ============================================================
// FILE CONTENT BUILDER (adds header comment)
// ============================================================
function buildFileContent(payload, config) {
  if (!config.addHeader) return payload.code;

  const commentChar = getCommentChar(payload.extension);
  const date = new Date(payload.submittedAt).toLocaleDateString("en-US", {
    year: "numeric", month: "long", day: "numeric"
  });

  let header = "";

  if (commentChar === "//") {
    header = [
      `// ===================================================`,
      `// Problem  : ${payload.title}`,
      `// Platform : ${capitalize(payload.platform)}`,
      payload.platform === "leetcode"
        ? `// Link     : https://leetcode.com/problems/${payload.slug}/`
        : `// Link     : https://codeforces.com/problemset/problem/${payload.contestId}/${payload.problemIndex}`,
      `// Difficulty: ${payload.difficulty}`,
      `// Language : ${payload.language}`,
      payload.runtime ? `// Runtime  : ${payload.runtime}` : null,
      payload.memory ? `// Memory   : ${payload.memory}` : null,
      `// Date     : ${date}`,
      `// ===================================================`,
      "",
    ].filter(Boolean).join("\n");
  } else if (commentChar === "#") {
    header = [
      `# ===================================================`,
      `# Problem  : ${payload.title}`,
      `# Platform : ${capitalize(payload.platform)}`,
      payload.platform === "leetcode"
        ? `# Link     : https://leetcode.com/problems/${payload.slug}/`
        : `# Link     : https://codeforces.com/problemset/problem/${payload.contestId}/${payload.problemIndex}`,
      `# Difficulty: ${payload.difficulty}`,
      `# Language : ${payload.language}`,
      payload.runtime ? `# Runtime  : ${payload.runtime}` : null,
      payload.memory ? `# Memory   : ${payload.memory}` : null,
      `# Date     : ${date}`,
      `# ===================================================`,
      "",
    ].filter(Boolean).join("\n");
  }

  return header + payload.code;
}

// ============================================================
// COMMIT MESSAGE BUILDER
// ============================================================
function buildCommitMessage(payload, config) {
  const template = config.commitTemplate || "default";

  if (template === "default") {
    return `✅ ${capitalize(payload.platform)}: ${payload.title} [${payload.difficulty}] (${payload.language})`;
  } else if (template === "simple") {
    return `Add ${payload.title}`;
  } else if (template === "detailed") {
    const tags = payload.tags?.length ? ` | Tags: ${payload.tags.slice(0, 3).join(", ")}` : "";
    return `✅ [${capitalize(payload.platform)}] ${payload.title} | ${payload.difficulty} | ${payload.language}${tags}`;
  }

  // Custom template
  return config.commitTemplate
    .replace("{platform}", capitalize(payload.platform))
    .replace("{title}", payload.title)
    .replace("{difficulty}", payload.difficulty)
    .replace("{language}", payload.language)
    .replace("{id}", payload.problemId || "");
}

// ============================================================
// GITHUB API
// ============================================================
async function pushToGitHub({ token, owner, repo, branch, path, content, message }) {
  const apiBase = `https://api.github.com/repos/${owner}/${repo}/contents/${path}`;
  const encodedContent = btoa(unescape(encodeURIComponent(content)));

  // Check if file already exists (to get SHA for update)
  let sha = undefined;
  try {
    const check = await fetch(`${apiBase}?ref=${branch}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/vnd.github+json",
      },
    });
    if (check.ok) {
      const existing = await check.json();
      sha = existing.sha;
    }
  } catch (_) {}

  const body = {
    message,
    content: encodedContent,
    branch,
    ...(sha ? { sha } : {}),
  };

  const resp = await fetch(apiBase, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.github+json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!resp.ok) {
    const err = await resp.json();
    throw new Error(err.message || `GitHub API error: ${resp.status}`);
  }

  return await resp.json();
}

// ============================================================
// HISTORY LOGGING
// ============================================================
async function logToHistory(payload) {
  const { history = [] } = await chrome.storage.local.get("history");
  history.unshift({
    platform: payload.platform,
    title: payload.title,
    difficulty: payload.difficulty,
    language: payload.language,
    pushedAt: new Date().toISOString(),
  });
  await chrome.storage.local.set({ history: history.slice(0, 100) }); // keep last 100
}

// ============================================================
// HELPERS
// ============================================================
async function getConfig() {
  const data = await chrome.storage.sync.get([
    "githubToken", "repoOwner", "repoName", "branch",
    "folderStyle", "addHeader", "commitTemplate",
  ]);
  return data;
}

function sanitize(str) {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

function getCommentChar(ext) {
  const hash = ["py", "rb", "sh", "r"];
  return hash.includes(ext) ? "#" : "//";
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function showNotification(title, message) {
  chrome.notifications.create({
    type: "basic",
    iconUrl: "icons/icon128.png",
    title,
    message,
  });
}

// ============================================================
// KEEP SERVICE WORKER ALIVE (Chrome kills it after 30s idle)
// ============================================================
chrome.runtime.onInstalled.addListener(() => {
  chrome.alarms.create("keepAlive", { periodInMinutes: 0.4 });
});

chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === "keepAlive") {
    console.log("[AutoPush] Service worker heartbeat ✅");
  }
});
