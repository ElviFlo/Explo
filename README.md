# 🧪 Explo — Rick & Morty Explorer

🌐 **Repository:** [https://github.com/ElviFlo/Explo.git](https://github.com/ElviFlo/Explo.git)

Explo is a web application that allows users to explore characters from *Rick & Morty* through a dynamic and interactive interface built with React.

---

## 🚀 Overview

Explo is a **Single Page Application (SPA)** developed as part of a React integrative project. It consumes a public API to display character data, including images, status, species, and more.

The application focuses on modern frontend development practices such as routing, state management, user experience, and accessibility.

---

## 🧩 Features

✨ Explore a list of characters fetched from an API
📄 View detailed information for each character
❤️ Add and remove favorites (persist across routes)
🔎 Real-time search and filtering
📬 Contact form with validation
⚠️ Loading and error states handling
🔔 Toast notifications (success, error, info)
🪟 Modal dialogs using `<dialog>` and `useRef`
🎭 Dark pattern modal (intentionally implemented)
📱 Fully responsive design with Tailwind CSS

---

## 🛠️ Tech Stack

* ⚛️ React (Hooks)
* ⚡ Vite
* 🧭 React Router
* 🎨 Tailwind CSS
* 🔔 Toast library (react-hot-toast / sonner / toastify)

---

## 🗂️ Pages / Routes

* `/` — Home (Landing page)
* `/explore` — Characters list
* `/explore/:id` — Character detail
* `/favorites` — Favorites page
* `/contact` — Contact form
* `*` — 404 Not Found

---

## ⚙️ Installation

Clone the repository and run the project locally:

```bash
git clone https://github.com/ElviFlo/Explo.git
cd Explo
npm install
npm run dev
```

---

## 📡 API

This project uses the Rick and Morty API:

```
https://rickandmortyapi.com/api/character
```

* Fetch list of characters
* Fetch individual character by ID

---

## ♿ Accessibility

This project includes accessibility best practices:

* Semantic HTML structure
* `alt` attributes for images
* `aria-label` for interactive elements
* Proper form labels using `htmlFor`

---

## 🎯 Project Requirements Covered

✔️ React Router with dynamic routes  
✔️ Data fetching with `useEffect` + `async/await`  
✔️ Global state for favorites  
✔️ Controlled form with validation  
✔️ Toast notifications  
✔️ Modal handling with `useRef`  
✔️ Tailwind CSS only (no custom CSS)  
✔️ Responsive design  

---

## 📦 Deployment

*(deployed link)*

---

## 👨‍💻 Author

Developed by **ElviFlo** as part of a React integrative project (2026).

---
