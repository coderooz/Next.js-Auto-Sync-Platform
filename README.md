# 🚀 Next.js Auto Sync Platform

A proof-of-concept platform that automatically syncs GitHub README content to a live website using **Next.js, MongoDB, API keys, and GitHub Actions**.

This README is **not static** — every update here is pushed automatically to the deployed website.

---

## ✨ What This Project Demonstrates

- 🔐 Secure API-based content publishing
- 🔁 GitHub Actions → Website auto-sync
- 🧠 Server-side rendering with Next.js App Router
- 🗄️ MongoDB-backed content storage
- 📝 Markdown-to-HTML rendering

---

## 🔄 How the Sync Works

1. This repository is connected to a deployed website
2. A project is created on the website → an API key is generated
3. The API key is stored as a **GitHub Actions secret**
4. When this README changes:
   - GitHub Action runs
   - Content is sent to the website API
   - Database content updates
   - Website reflects changes instantly

_No manual deployment required._

---

## 🧩 Tech Stack

- **Frontend**: Next.js (App Router)
- **Backend**: Next.js API routes
- **Database**: MongoDB Atlas
- **Auth**: API Key per project
- **CI/CD**: GitHub Actions
- **Hosting**: Vercel

---

## 🧪 Live Test Section

If you can see this section updated on the website, then:

✅ GitHub Action ran successfully  
✅ API authentication worked  
✅ MongoDB update succeeded  
✅ Markdown rendered correctly  

---

## 🧾 Example Markdown Rendering

### Code Block
```ts
export async function syncContent() {
  console.log("README synced successfully 🚀");
}
````

### List

* Auto-sync enabled
* API secured
* Database updated
* UI refreshed

### Quote

> “Content should update itself. Humans shouldn’t have to.”

---

## 🔗 Links

* 🌐 **Live Website**: [https://next-js-auto-sync-platform.vercel.app](https://next-js-auto-sync-platform.vercel.app)
* 📦 **GitHub Repo**: (this repository)

---

## 🕒 Last Updated

This timestamp should change every time this README is modified and synced.

**Updated at:** 28-12-2025 22:38
**Page link:** [https://next-js-auto-sync-platform.vercel.app/content/nextjs-auto-sync-platform](https://next-js-auto-sync-platform.vercel.app/content/nextjs-auto-sync-platform)

