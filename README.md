# 🦸 Superhero Directory (Sortable)

A professional, modular Vanilla JavaScript application built to fetch, display, and organize a comprehensive directory of superheroes. 

## ✨ Features

- **Real-time Search:** Instantly filter superheroes by name on every keystroke.
- **Dynamic Sorting:** Click on any table header to sort data ascending or descending. Intelligently handles numeric strings (e.g., "78 kg") and ensures empty/missing data values always sink to the bottom.
- **Pagination:** Easily navigate through hundreds of heroes with adjustable page sizes (10, 20, 50, 100, or All).
- **No Frameworks:** Built entirely with pure Vanilla JavaScript, HTML, and CSS.

## 🏗️ Architecture

To maintain a clean separation of concerns and ensure beginner-friendly code, the application logic is strictly divided into specialized modules:

- **`fetch.js`**: Handles network requests, downloading data from the Superhero API, and cleaning/flattening the raw JSON.
- **`sort.js`**: Contains the core logic. Pure functions for searching, sorting, and pagination math without touching the DOM.
- **`dom.js`**: The presentation layer. Responsible for drawing the table, updating pagination controls, and attaching UI event listeners.
- **`main.js`**: The orchestrator. Imports the other modules and manages the application state and data flow between the logic layer and the DOM.

## 🚀 Getting Started

Since this project uses ES6 Modules (`import`/`export`), it must be served over HTTP/HTTPS rather than opened directly via a `file://` protocol to avoid CORS errors.

1. **Clone the repository:**
   ```bash
   git clone https://learn.zone01oujda.ma/git/erezzoug/sortable.git
   cd sortable
   ```

2. **Serve the files locally:**
   You can use any local web server. For example, using Python or Node.js:
   ```bash
   # Using Python 3
   python -m http.server 8000

   # Or using Node.js / npx
   npx serve .
   ```

3. **Open in Browser:**
   Navigate to `http://localhost:8000` (or the port specified by your server) to view the directory!

## 📡 API Reference

Superhero data is fetched from the [Superhero API (akabab.github.io)](https://akabab.github.io/superhero-api/api/).

## 👥 Developers

- **abouzerd**
- **erezzoug**
- **herrabba**