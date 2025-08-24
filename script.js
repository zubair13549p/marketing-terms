// ===== Basic demo-only auth (client-side). For real security, use a backend. =====

// 1) Allowed Student IDs (edit this list)
const validIds = [
  "SSBN257201", "SSBN257202", "SSBN257203", "SSBN257204", "SSBN257205", "SSBN257206", "SSBN257207", "SSBN257208", "SSBN257209", "SSBN257210", "SSBN257211", "SSBN257212", "SSBN257213", "SSBN25714", "SSBN257215", "SSBN257216", "SSBN257217", "SSBN257218", "SSBN257219", "SSBN257220",
];

// 2) Handle Login
function login(idInput) {
  const id = (idInput || document.getElementById("studentId").value || "").trim();
  const errorEl = document.getElementById("error");
  if (!id) {
    if (errorEl) errorEl.textContent = "Please enter your College ID.";
    return;
  }
  if (validIds.includes(id)) {
    localStorage.setItem("studentId", id);
    window.location.href = "home.html";
  } else {
    if (errorEl) errorEl.textContent = "Invalid ID. Contact the admin to add your ID.";
  }
}

// 3) Logout and guard
function logout() {
  localStorage.removeItem("studentId");
  window.location.href = "index.html";
}

function checkLogin() {
  const id = localStorage.getItem("studentId");
  if (!id) {
    window.location.href = "index.html";
  } else {
    const welcome = document.getElementById("welcome");
    if (welcome) welcome.textContent = "Logged in: " + id;
  }
}

// 4) Search
function renderResults(items) {
  const results = document.getElementById("results");
  const stats = document.getElementById("stats");
  if (!results) return;

  results.innerHTML = "";
  if (items.length === 0) {
    results.innerHTML = "<p class=\"muted\">No results found.</p>";
    if (stats) stats.textContent = "";
    return;
  }

  items.forEach(t => {
    const div = document.createElement("div");
    div.className = "term";
    div.innerHTML = `<h3>${t.word}</h3><p>${t.definition}</p>`;
    results.appendChild(div);
  });

  if (stats) stats.textContent = items.length + " result(s)";
}

function searchTerm(query) {
  const q = (query ?? document.getElementById("searchBox")?.value ?? "").toLowerCase().trim();
  if (!q) {
    renderResults(terms); // show all when empty
    return;
  }
  const filtered = terms.filter(t =>
    t.word.toLowerCase().includes(q) ||
    t.definition.toLowerCase().includes(q)
  );
  renderResults(filtered);
}

// 5) Wire up events depending on page
document.addEventListener("DOMContentLoaded", () => {
  const path = location.pathname.toLowerCase();
  if (path.endsWith("home.html")) {
    checkLogin();
    const input = document.getElementById("searchBox");
    const logoutBtn = document.getElementById("logoutBtn");
    if (input) {
      input.addEventListener("input", () => searchTerm());
      // Show all terms by default:
      renderResults(terms);
    }
    if (logoutBtn) {
      logoutBtn.addEventListener("click", logout);
    }
  } else {
    const form = document.getElementById("loginForm");
    if (form) {
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        login();
      });
    }
  }
});
