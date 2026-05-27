// ============================================================
// AutoPush - LeetCode Content Script v3 (Fixed)
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

  // ✅ FIXED: Use GraphQL instead of broken REST API
  async function checkLatestSubmission(slug) {
    try {
      const resp = await fetch("https://leetcode.com/graphql", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          query: `query recentSubmissions($titleSlug: String!) {
            submissionList(offset: 0, limit: 1, questionSlug: $titleSlug) {
              submissions {
                id
                statusDisplay
                lang
                runtime
                memory
                code
                timestamp
              }
            }
          }`,
          variables: { titleSlug: slug },
        }),
      });

      if (!resp.ok) return null;
      const data = await resp.json();
      const subs = data?.data?.submissionList?.submissions;
      if (!subs || subs.length === 0) return null;

      const s = subs[0];
      return {
        id: s.id,
        status_display: s.statusDisplay,
        lang: s.lang,
        runtime: s.runtime,
        memory: s.memory,
        code: s.code,
      };
    } catch (e) {
      console.error("[AutoPush] GraphQL submission fetch error:", e);
      return null;
    }
  }

  async function getProblemMeta(slug) {
    try {
      const resp = await fetch("https://leetcode.com/graphql", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          query: "query questionData($titleSlug: String!) { question(titleSlug: $titleSlug) { questionId title difficulty topicTags { name } } }",
          variables: { titleSlug: slug },
        }),
      });
      const json = await resp.json();
      return (json.data && json.data.question) ? json.data.question : {};
    } catch (e) {
      return {};
    }
  }

  function safeSendMessage(payload) {
    try {
      if (chrome && chrome.runtime && chrome.runtime.id) {
        chrome.runtime.sendMessage({ type: "SOLUTION_ACCEPTED", payload: payload });
        console.log("[AutoPush] Solution sent to background successfully!");
      } else {
        console.warn("[AutoPush] Extension context lost. Please refresh the page.");
      }
    } catch (err) {
      console.warn("[AutoPush] Send failed:", err.message);
    }
  }

  async function watchForAccepted() {
    if (isWatching) return;
    isWatching = true;

    var slug = getProblemSlug();
    if (!slug) {
      isWatching = false;
      return;
    }

    console.log("[AutoPush] Watching for Accepted on: " + slug);

    var interval = setInterval(async function () {
      var submission = await checkLatestSubmission(slug);
      if (!submission) return;
      if (submission.id === lastSubmissionId) return;
      if (submission.status_display !== "Accepted") {
        console.log("[AutoPush] Verdict: " + submission.status_display + " - still waiting...");
        return;
      }

      lastSubmissionId = submission.id;
      clearInterval(interval);
      isWatching = false;

      console.log("[AutoPush] Accepted! Fetching metadata...");
      var meta = await getProblemMeta(slug);

      var tags = [];
      if (meta.topicTags) {
        for (var i = 0; i < meta.topicTags.length; i++) {
          tags.push(meta.topicTags[i].name);
        }
      }

      var payload = {
        platform: "leetcode",
        problemId: meta.questionId || "unknown",
        title: meta.title || slug,
        slug: slug,
        difficulty: meta.difficulty || "Unknown",
        tags: tags,
        language: submission.lang,
        extension: getLangExtension(submission.lang),
        code: submission.code,
        submittedAt: new Date().toISOString(),
        runtime: submission.runtime,
        memory: submission.memory,
      };

      safeSendMessage(payload);

    }, 3000);

    setTimeout(function () {
      clearInterval(interval);
      isWatching = false;
    }, 600000);
  }

  function attachSubmitListener() {
    document.addEventListener("click", function (e) {
      var btn = null;

      var selectors = [
        '[data-e2e-locator="console-submit-button"]',
        'button[data-e2e-locator="console-submit-button"]',
      ];

      for (var i = 0; i < selectors.length; i++) {
        btn = e.target.closest(selectors[i]);
        if (btn) break;
      }

      if (!btn) {
        var el = e.target;
        while (el && el !== document.body) {
          if (el.tagName === "BUTTON" && el.textContent && el.textContent.trim() === "Submit") {
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
  console.log("[AutoPush] LeetCode watcher initialized v3 ✅");
})();
