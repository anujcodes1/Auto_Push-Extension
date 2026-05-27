// ============================================================
// AutoPush - LeetCode Content Script v2
// ============================================================

(function () {
  let lastSubmissionId = null;
  let isWatching = false;

  function getLangExtension(lang) {
    const map = {
      "C++": "cpp", "Java": "java", "Python": "py", "Python3": "py",
      "C": "c", "C#": "cs", "JavaScript": "js", "TypeScript": "ts",
      "PHP": "php", "Swift": "swift", "Kotlin": "kt", "Dart": "dart",
      "Go": "go", "Ruby": "rb", "Scala": "scala", "Rust": "rs",
      "Racket": "rkt", "Erlang": "erl", "Elixir": "ex", "MySQL": "sql",
    };
    return map[lang] || "txt";
  }

  function getProblemSlug() {
    const match = window.location.pathname.match(/\/problems\/([^/]+)/);
    return match ? match[1] : null;
  }

  async function checkLatestSubmission(slug) {
    try {
      const resp = await fetch(
        "https://leetcode.com/api/submissions/?offset=0&limit=1&slug=" + slug,
        { credentials: "include" }
      );
      if (!resp.ok) return null;
      const data = await resp.json();
      return data.submissions_dump ? data.submissions_dump[0] : null;
    } catch (e) {
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
  console.log("[AutoPush] LeetCode watcher initialized v2 ✅");
})();
