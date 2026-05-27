// ============================================================
// AutoPush - Codeforces Content Script
// Detects "Accepted" verdict and scrapes solution code
// ============================================================

(function () {
  let isWatching = false;
  let lastCheckedId = null;

  // ---- Utility: language to file extension ----
  function getLangExtension(lang) {
    if (!lang) return "txt";
    const l = lang.toLowerCase();
    if (l.includes("c++")) return "cpp";
    if (l.includes("java")) return "java";
    if (l.includes("python")) return "py";
    if (l.includes("javascript")) return "js";
    if (l.includes("typescript")) return "ts";
    if (l.includes("go")) return "go";
    if (l.includes("rust")) return "rs";
    if (l.includes("kotlin")) return "kt";
    if (l.includes("c#")) return "cs";
    if (l.includes("ruby")) return "rb";
    if (l.includes("php")) return "php";
    if (l.includes("swift")) return "swift";
    if (l.includes("scala")) return "scala";
    if (l.includes(" c ") || l === "c") return "c";
    return "txt";
  }

  // ---- Parse problem info from URL ----
  function getProblemInfo() {
    // /contest/1234/problem/A  OR  /problemset/problem/1234/A
    const contestMatch = window.location.pathname.match(/\/contest\/(\d+)\/problem\/([A-Z0-9]+)/i);
    const problemsetMatch = window.location.pathname.match(/\/problemset\/problem\/(\d+)\/([A-Z0-9]+)/i);

    if (contestMatch) {
      return { contestId: contestMatch[1], problemIndex: contestMatch[2], isContest: true };
    }
    if (problemsetMatch) {
      return { contestId: problemsetMatch[1], problemIndex: problemsetMatch[2], isContest: false };
    }
    return null;
  }

  // ---- Get problem title from page DOM ----
  function getProblemTitle() {
    const el = document.querySelector(".title");
    return el ? el.textContent.trim() : "Unknown Problem";
  }

  // ---- Fetch submissions via Codeforces API ----
  async function getLatestSubmission(handle, contestId) {
    try {
      const url = `https://codeforces.com/api/contest.status?contestId=${contestId}&handle=${handle}&from=1&count=5`;
      const resp = await fetch(url);
      const data = await resp.json();
      if (data.status !== "OK") return null;
      return data.result?.[0] || null;
    } catch (e) {
      return null;
    }
  }

  // ---- Get logged-in Codeforces handle from page ----
  function getHandle() {
    const el = document.querySelector("a.rated-user, a[href^='/profile/']");
    return el ? el.textContent.trim() : null;
  }

  // ---- Fetch source code of a submission ----
  async function fetchSourceCode(contestId, submissionId) {
    try {
      const url = `https://codeforces.com/contest/${contestId}/submission/${submissionId}`;
      const resp = await fetch(url, { credentials: "include" });
      const html = await resp.text();
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, "text/html");
      const codeEl = doc.querySelector("#program-source-text, .program-source");
      return codeEl ? codeEl.textContent : null;
    } catch (e) {
      return null;
    }
  }

  // ---- Watch for Accepted verdict ----
  async function watchForAccepted() {
    if (isWatching) return;
    isWatching = true;

    const info = getProblemInfo();
    if (!info) { isWatching = false; return; }

    const handle = getHandle();
    if (!handle) {
      console.warn("[AutoPush] Could not detect Codeforces handle. Are you logged in?");
      isWatching = false;
      return;
    }

    const interval = setInterval(async () => {
      const submission = await getLatestSubmission(handle, info.contestId);
      if (!submission) return;
      if (submission.id === lastCheckedId) return;
      if (submission.problem.index !== info.problemIndex.toUpperCase()) return;
      if (submission.verdict !== "OK") {
        lastCheckedId = submission.id;
        return;
      }

      // Accepted!
      lastCheckedId = submission.id;
      clearInterval(interval);
      isWatching = false;

      const code = await fetchSourceCode(info.contestId, submission.id);
      const lang = submission.programmingLanguage;

      const payload = {
        platform: "codeforces",
        problemId: `${info.contestId}${info.problemIndex}`,
        title: getProblemTitle(),
        contestId: info.contestId,
        problemIndex: info.problemIndex,
        difficulty: submission.problem.rating ? String(submission.problem.rating) : "Unrated",
        tags: submission.problem.tags || [],
        language: lang,
        extension: getLangExtension(lang),
        code: code || "// Could not fetch source code automatically",
        submittedAt: new Date().toISOString(),
        runtime: `${submission.timeConsumedMillis}ms`,
        memory: `${submission.memoryConsumedBytes / 1024}KB`,
      };

      try {
        if (chrome?.runtime?.id) {
          chrome.runtime.sendMessage({ type: "SOLUTION_ACCEPTED", payload });
          console.log("[AutoPush] ✅ Solution sent to background!");
        } else {
          console.warn("[AutoPush] Extension context lost. Refresh the page and try again.");
        }
      } catch (err) {
        console.warn("[AutoPush] Could not send message:", err.message);
      }
    }, 4000);

    // Stop after 10 minutes
    setTimeout(() => {
      clearInterval(interval);
      isWatching = false;
    }, 600000);
  }

  // ---- Listen for submit button clicks ----
  function attachSubmitListener() {
    document.addEventListener("click", (e) => {
      const btn = e.target.closest('input[value="Submit"]');
      if (btn) {
        setTimeout(watchForAccepted, 3000);
      }
    });
  }

  attachSubmitListener();
  console.log("[AutoPush] Codeforces watcher initialized ✅");
})();
