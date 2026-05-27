# AutoPush 🚀

> Automatically push your accepted LeetCode & Codeforces solutions to GitHub — zero manual effort.

---

## ✨ Features

- ✅ **Auto-detects Accepted** verdict on LeetCode and Codeforces
- 📁 **Smart folder structure** — organized by platform/difficulty or platform/language
- 📝 **Auto header comments** — problem link, difficulty, runtime added to each file
- 💬 **Customizable commit messages**
- 📜 **Push history** with stats (total, LC, CF counts)
- 🔔 **Browser notifications** on success/failure
- 🔒 **Secure** — GitHub token stored in Chrome's encrypted sync storage

---

## 📦 Installation (Developer Mode)

> This extension is not on the Chrome Web Store yet. Install manually:

1. **Clone or download** this repository
2. Open **Chrome** → go to `chrome://extensions/`
3. Enable **Developer Mode** (top right toggle)
4. Click **"Load unpacked"**
5. Select the `extension/` folder inside this project
6. The AutoPush icon will appear in your toolbar ✅

---

## ⚙️ Setup

1. Click the **AutoPush icon** in Chrome toolbar
2. Go to **Setup tab**
3. Enter your **GitHub Personal Access Token**
   - Go to https://github.com/settings/tokens/new
   - Select **repo** scope
   - Copy the token
4. Enter your **Repository Owner** (your GitHub username)
5. Enter **Repository Name** (e.g. `competitive-programming`)
6. Click **Save Configuration**

---

## 🗂 Folder Structure (default)

```
your-repo/
├── leetcode/
│   ├── easy/
│   │   └── 0001-two-sum.py
│   ├── medium/
│   │   └── 0015-3sum.cpp
│   └── hard/
│       └── 0023-merge-k-sorted-lists.java
└── codeforces/
    ├── 800/
    │   └── 1234A-beautiful-string.cpp
    └── 1400/
        └── 1500B-integer-divisibility.py
```

---

## 🛠 Options

| Option | Description |
|---|---|
| **Folder Style** | `platform/difficulty`, `platform/language`, or flat |
| **Add Header Comment** | Adds problem metadata as a comment at the top of the file |
| **Commit Template** | Default, Simple, or Detailed (with tags) |

---

## 🔄 How It Works

```
1. You click "Submit" on LeetCode or Codeforces
2. Extension polls the platform's API every 3-4 seconds
3. When verdict = "Accepted" → scrapes your code + metadata
4. Sends to background service worker
5. GitHub REST API creates/updates the file directly in your repo
6. Browser notification confirms success 🎉
```

---

## 🧩 File Structure

```
autopush-extension/
├── extension/
│   ├── manifest.json          # Extension manifest (MV3)
│   ├── background.js          # Service worker + GitHub API
│   ├── popup.html             # Extension popup UI
│   ├── popup.js               # Popup logic
│   ├── icons/                 # Extension icons
│   └── content/
│       ├── leetcode.js        # LeetCode detector
│       └── codeforces.js      # Codeforces detector
├── generate_icons.py          # One-time icon generator
└── README.md
```

---

## ⚠️ Limitations & Notes

- **Codeforces source code scraping** requires you to be logged in
- **LeetCode** must have your submissions accessible (default behavior)
- Extension only runs on problem pages, not the dashboard
- GitHub token is stored in Chrome's encrypted sync storage (never sent anywhere except GitHub API)

---

## 🤝 Contributing

PRs welcome! Especially for:
- Adding more platforms (HackerRank, AtCoder, etc.)
- Better Codeforces code scraping
- Firefox support

---

## 📄 License

MIT
