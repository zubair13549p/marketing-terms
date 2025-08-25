// ===== Basic demo-only auth (client-side). For real security, use a backend. =====

// 1) Allowed Student IDs (edit this list)
const validIds = [
  "SSBN257201","SSBN257202","SSBN257203","SSBN257204","SSBN257205",
  "SSBN257206","SSBN257207","SSBN257208","SSBN257209","SSBN257210",
  "SSBN257211","SSBN257212","SSBN257213","SSBN257214","SSBN257215",
  "SSBN257216","SSBN257217","SSBN257218","SSBN257219","SSBN257220",
  "SSBN257221","SSBN257222","SSBN257223","SSBN257224","SSBN257225",
  "SSBN257226","SSBN257227","SSBN257228","SSBN257229","SSBN257230",
  "SSBN257231","SSBN257232","SSBN257233","SSBN257234","SSBN257235",
  "SSBN257236","SSBN257237","SSBN257238","SSBN257239","SSBN257240",
  "SSBN257241","SSBN257242","SSBN257243","SSBN257244","SSBN257245",
  "SSBN257246","SSBN257247","SSBN257248","SSBN257249","SSBN257001","SSBN257002","SSBN257003","SSBN257004","SSBN257005",
  "SSBN257006","SSBN257007","SSBN257008","SSBN257009","SSBN257010",
  "SSBN257011","SSBN257012","SSBN257013","SSBN257014","SSBN257015",
  "SSBN257016","SSBN257017","SSBN257018","SSBN257019","SSBN257020",
  "SSBN257021","SSBN257022","SSBN257023","SSBN257024","SSBN257025",
  "SSBN257026","SSBN257027","SSBN257028","SSBN257029","SSBN257030",
  "SSBN257031","SSBN257032","SSBN257033","SSBN257034","SSBN257035",
  "SSBN257036","SSBN257037","SSBN257038","SSBN257039","SSBN257040",
  "SSBN257041","SSBN257042","SSBN257043","SSBN257044","SSBN257045",
  "SSBN257046","SSBN257047","SSBN257048","SSBN257049","SSBN257050"
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

// 4) Search + render
function renderResults(items) {
  const results = document.getElementById("results");
  const stats = document.getElementById("stats");
  if (!results) return;

  results.innerHTML = "";
  if (items.length === 0) {
    results.innerHTML = "<p class='muted'>No results found.</p>";
    if (stats) stats.textContent = "";
    return;
  }

  items.forEach(t => {
    const div = document.createElement("div");
    div.className = "term";
    div.innerHTML = `<h3>${t.word}</h3>`;

    // When clicked, open modal with details
    div.addEventListener("click", () => {
      openModal(t.word, t.definition);
    });

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

// 5) Modal functions
function openModal(word, definition) {
  const modal = document.getElementById("termModal");
  const title = document.getElementById("modalTitle");
  const body = document.getElementById("modalDefinition");
  if (!modal || !title || !body) return;

  title.textContent = word;
  body.textContent = definition;
  modal.classList.add("show");
}

function closeModal() {
  const modal = document.getElementById("termModal");
  if (modal) modal.classList.remove("show");
}

// 6) Wire up events depending on page
document.addEventListener("DOMContentLoaded", () => {
  const path = location.pathname.toLowerCase();
  if (path.endsWith("home.html")) {
    checkLogin();
    const input = document.getElementById("searchBox");
    const logoutBtn = document.getElementById("logoutBtn");

    if (input) {
      input.addEventListener("input", () => searchTerm());
      renderResults(terms); // show all terms by default
    }
    if (logoutBtn) {
      logoutBtn.addEventListener("click", logout);
    }

    // Modal close handlers
    const closeBtn = document.getElementById("closeModal");
    const modalEl = document.getElementById("termModal");

    if (closeBtn) closeBtn.addEventListener("click", closeModal);
    if (modalEl) {
      modalEl.addEventListener("click", (e) => {
        if (e.target === modalEl) closeModal();
      });
      document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") closeModal();
      });
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
