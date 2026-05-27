// ============================================================
// AutoPush - LeetCode Content Script v4
// ============================================================

(function () {
  let lastSubmissionId = null;
  let isWatching = false;

  function getLangExtension(lang) {
    const map = {
      "cpp": "cpp", "java": "java", "python": "py", "python3": "py",
      "c": "c", "csharp": "cs", "javascript": "js", "typescript": "ts",
      "php": "php", "swift": "swift", "kotlin": "kt", "dart": "dart",
      "golang": "go", "ruby": "rb", "scala": "scala", "rust": "rs",
      "racket": "rkt", "erlang": "erl", "elixir": "ex", "mysql": "sql",
      "C++": "cpp", "Java": "java", "Python": "py", "Python3": "py",
      "JavaScript": "js", "TypeScript": "ts",
    };
    return map[lang] || "txt";
  }

  function getProblemSlug() {
    const match = window.location.pathname.match(/\/problems\/([^/]+)/);
    return match ? match[1] : null;
  }

  // Get submission ID from current URL
  function getSubmissionIdFromURL() {
    const match = window.location.pathname.match(/\/submissions\/(\d+)/);
    return match ? match[1] : null;
  }

  // Fetch submission details by ID using GraphQL
  async function getSubmissionById(submissionId) {
    try {
      const resp = await fetch("https://leetcode.com/graphql", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          query: `query submissionDetails($submissionId: Int!) {
            submissionDetails(submissionId: $submissionId) {
              statusCode
              lang { verboseName }
              runtimeDisplay
              memoryDisplay
              code
              question {
                questionId
                title
                titleSlug
                difficulty
                topicTags { name }
              }
            }
          }`,
          variables: { submissionId: parseInt(submissionId) },
        }),
      });

      if (!resp.ok) return null;
      const data = await resp.json();
      return data?.data?.submissionDetails || null;
    } catch (e) {
      console.error("[AutoPush] submissionDetails fetch error:", e);
      return null;
    }
  }

  function safeSendMessage(payload) {
    try {
      if (chrome && chrome.runtime && chrome.runtime.id) {
        chrome.runtime.sendMessage({ type: "SOLUTION_ACCEPTED", payload });
        console.log("[AutoPush] Solution sent to background successfully!");
      } else {
        console.warn("[AutoPush] Extension context lost. Please refresh the page.");
      }
    } catch (err) {
      console.warn("[AutoPush] Send failed:", err.message);
    }
  }

  // Watch for URL change to /submissions/<id>/
  async function watchForAccepted() {
    if (isWatching) return;
    isWatching = true;

    const slug = getProblemSlug();
    if (!slug) { isWatching = false; return; }

    console.log("[AutoPush] Watching for Accepted on: " + slug);

    let attempts = 0;
    const interval = setInterval(async () => {
      attempts++;
      if (attempts > 60) { // 3 min timeout
        clearInterval(interval);
        isWatching = false;
        return;
      }

      const submissionId = getSubmissionIdFromURL();
      if (!submissionId) return;
      if (submissionId === lastSubmissionId) return;

      // URL has submission ID — fetch details
      const details = await getSubmissionById(submissionId);
      if (!details) return;

      // statusCode 10 = Accepted on LeetCode
      if (details.statusCode !== 10) {
        console.log("[AutoPush] Status code: " + details.statusCode + " - not accepted yet");
        return;
      }

      lastSubmissionId = submissionId;
      clearInterval(interval);
      isWatching = false;

      console.log("[AutoPush] Accepted! Building payload...");

      const q = details.question || {};
      const tags = (q.topicTags || []).map(t => t.name);
      const lang = details.lang?.verboseName || "unknown";

      const payload = {
        platform: "leetcode",
        problemId: q.questionId || "unknown",
        title: q.title || slug,
        slug: q.titleSlug || slug,
        difficulty: q.difficulty || "Unknown",
        tags,
        language: lang,
        extension: getLangExtension(lang),
        code: details.code,
        submittedAt: new Date().toISOString(),
        runtime: details.runtimeDisplay,
        memory: details.memoryDisplay,
      };

      safeSendMessage(payload);
    }, 3000);
  }

  function attachSubmitListener() {
    document.addEventListener("click", function (e) {
      let btn = null;

      const selectors = [
        '[data-e2e-locator="console-submit-button"]',
        'button[data-e2e-locator="console-submit-button"]',
      ];

      for (const sel of selectors) {
        btn = e.target.closest(sel);
        if (btn) break;
      }

      if (!btn) {
        let el = e.target;
        while (el && el !== document.body) {
          if (el.tagName === "BUTTON" && el.textContent?.trim() === "Submit") {
            btn = el;
            break;
          }
          el = el.parentElement;
        }
      }

      if (btn) {
        console.log("[AutoPush] Submit button clicked!");
        setTimeout(watchForAccepted, 2000);
      }
    });
  }

  attachSubmitListener();
  console.log("[AutoPush] LeetCode watcher initialized v4 ✅");
})();
