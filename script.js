// ===== User Authentication System with OTP =====

// Initialize users from localStorage or create empty array
let users = JSON.parse(localStorage.getItem('marketingPortalUsers')) || [];

// Add default admin user if none exists
if (users.length === 0) {
  users = [
    { 
      id: 'SSBN257202', 
      name: 'Malik Zubair Hussain', 
      email: 'admin@ssbn.edu', 
      password: 'ammiabba',
      role: 'admin' 
    }
  ];
  localStorage.setItem('marketingPortalUsers', JSON.stringify(users));
}

// OTP variables
let generatedOtp = '';
let timerInterval;
let timeLeft = 120; // 2 minutes in seconds

// 1) Registration Function with OTP
function register() {
  const fullName = document.getElementById('fullName').value.trim();
  const collegeId = document.getElementById('collegeId').value.trim();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirmPassword').value;
  const errorEl = document.getElementById('error');
  const successEl = document.getElementById('success');
  
  // Reset messages
  errorEl.textContent = '';
  successEl.textContent = '';
  
  // Validation
  if (!fullName || !collegeId || !email || !password || !confirmPassword) {
    errorEl.textContent = 'All fields are required';
    return false;
  }
  
  if (password !== confirmPassword) {
    errorEl.textContent = 'Passwords do not match';
    return false;
  }
  
  if (password.length < 6) {
    errorEl.textContent = 'Password must be at least 6 characters';
    return false;
  }
  
  // Check if user already exists
  if (users.find(u => u.id === collegeId)) {
    errorEl.textContent = 'User with this College ID already exists';
    return false;
  }
  
  if (users.find(u => u.email === email)) {
    errorEl.textContent = 'Email already registered';
    return false;
  }
  
  // Generate random 6-digit OTP
  generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();
  
  // In a real application, you would send this OTP to the user's email
  // For demo purposes, we'll just show it in a success message
  successEl.textContent = `Demo: OTP sent to ${email}. Your OTP is: ${generatedOtp}`;
  
  // Show OTP container
  document.getElementById('otpContainer').style.display = 'block';
  
  // Disable send OTP button
  document.getElementById('sendOtpBtn').disabled = true;
  document.getElementById('sendOtpBtn').textContent = 'Code Sent';
  
  // Start timer
  startTimer();
  
  return true;
}

// 2) Verify OTP Function
function verifyOtp() {
  const otpInputs = document.querySelectorAll('.otp-input');
  const enteredOtp = Array.from(otpInputs).map(input => input.value).join('');
  const errorEl = document.getElementById('error');
  const successEl = document.getElementById('success');
  
  if (enteredOtp === generatedOtp) {
    // Get form values
    const fullName = document.getElementById('fullName').value.trim();
    const collegeId = document.getElementById('collegeId').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    
    // Create new user
    const newUser = {
      id: collegeId,
      name: fullName,
      email: email,
      password: password,
      role: 'student'
    };
    
    users.push(newUser);
    localStorage.setItem('marketingPortalUsers', JSON.stringify(users));
    
    successEl.textContent = 'Email verified successfully! Account created.';
    errorEl.textContent = '';
    
    // Redirect to login page after success
    setTimeout(() => {
      alert('Registration successful! Redirecting to login page.');
      window.location.href = 'index.html';
    }, 1500);
    
    return true;
  } else {
    errorEl.textContent = 'Invalid verification code. Please try again.';
    return false;
  }
}

// 3) Send OTP Function
function sendOtp() {
  const fullName = document.getElementById('fullName').value.trim();
  const collegeId = document.getElementById('collegeId').value.trim();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirmPassword').value;
  const errorEl = document.getElementById('error');
  const successEl = document.getElementById('success');
  
  // Reset messages
  errorEl.textContent = '';
  successEl.textContent = '';
  
  // Validation
  if (!fullName || !collegeId || !email || !password || !confirmPassword) {
    errorEl.textContent = 'All fields are required';
    return false;
  }
  
  if (password !== confirmPassword) {
    errorEl.textContent = 'Passwords do not match';
    return false;
  }
  
  if (password.length < 6) {
    errorEl.textContent = 'Password must be at least 6 characters';
    return false;
  }
  
  // Check if user already exists
  if (users.find(u => u.id === collegeId)) {
    errorEl.textContent = 'User with this College ID already exists';
    return false;
  }
  
  if (users.find(u => u.email === email)) {
    errorEl.textContent = 'Email already registered';
    return false;
  }
  
  // Generate random 6-digit OTP
  generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();
  
  // In a real application, you would send this OTP to the user's email
  // For demo purposes, we'll just show it in a success message
  successEl.textContent = `Demo: OTP sent to ${email}. Your OTP is: ${generatedOtp}`;
  
  // Show OTP container
  document.getElementById('otpContainer').style.display = 'block';
  
  // Disable send OTP button
  document.getElementById('sendOtpBtn').disabled = true;
  document.getElementById('sendOtpBtn').textContent = 'Code Sent';
  
  // Start timer
  startTimer();
  
  return true;
}

// 4) Resend OTP Function
function resendOtp() {
  const email = document.getElementById('email').value.trim();
  const errorEl = document.getElementById('error');
  const successEl = document.getElementById('success');
  
  // Generate new OTP
  generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();
  
  successEl.textContent = `Demo: New OTP sent to ${email}. Your OTP is: ${generatedOtp}`;
  errorEl.textContent = '';
  
  // Clear OTP inputs
  const otpInputs = document.querySelectorAll('.otp-input');
  otpInputs.forEach(input => input.value = '');
  
  // Reset and start timer
  clearInterval(timerInterval);
  timeLeft = 120;
  startTimer();
  
  // Focus on first OTP input
  otpInputs[0].focus();
}

// 5) Timer Functions
function startTimer() {
  clearInterval(timerInterval);
  timeLeft = 120;
  updateTimerDisplay();
  
  timerInterval = setInterval(() => {
    timeLeft--;
    updateTimerDisplay();
    
    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      generatedOtp = ''; // Invalidate OTP after expiration
      document.getElementById('error').textContent = 'Verification code has expired.';
      document.getElementById('verifyOtpBtn').disabled = true;
    }
  }, 1000);
}

function updateTimerDisplay() {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  document.getElementById('timer').textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

// 6) OTP Input Navigation
function setupOtpInputs() {
  const otpInputs = document.querySelectorAll('.otp-input');
  
  otpInputs.forEach((input, index) => {
    input.addEventListener('input', function() {
      // Move to next input if current input is filled
      if (this.value.length === 1 && index < otpInputs.length - 1) {
        otpInputs[index + 1].focus();
      }
      
      // Check if all inputs are filled
      checkOtpCompletion();
    });
    
    input.addEventListener('keydown', function(e) {
      // Move to previous input on backspace
      if (e.key === 'Backspace' && this.value === '' && index > 0) {
        otpInputs[index - 1].focus();
      }
    });
  });
}

function checkOtpCompletion() {
  const otpInputs = document.querySelectorAll('.otp-input');
  const isComplete = Array.from(otpInputs).every(input => input.value.length === 1);
  document.getElementById('verifyOtpBtn').disabled = !isComplete;
}

// 7) Login Function
function login() {
  const id = document.getElementById("studentId").value.trim();
  const password = document.getElementById("password").value;
  const errorEl = document.getElementById("error");
  
  if (!id || !password) {
    errorEl.textContent = "Please enter your College ID and password.";
    return;
  }
  
  const user = users.find(u => u.id === id && u.password === password);
  
  if (user) {
    // Store only essential info in session
    const sessionUser = {
      id: user.id,
      name: user.name,
      role: user.role
    };
    localStorage.setItem("currentUser", JSON.stringify(sessionUser));
    window.location.href = "home.html";
  } else {
    errorEl.textContent = "Invalid credentials. Please try again.";
  }
}

// 8) Logout Function
function logout() {
  localStorage.removeItem("currentUser");
  window.location.href = "index.html";
}

// 9) Check if user is logged in
function checkLogin() {
  const userData = localStorage.getItem("currentUser");
  if (!userData) {
    window.location.href = "index.html";
  } else {
    const user = JSON.parse(userData);
    const welcome = document.getElementById("welcome");
    if (welcome) welcome.textContent = "Welcome, " + user.name;
  }
}

// 10) Search + render functions
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

// 11) Modal functions
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

// 12) Wire up events depending on page
document.addEventListener("DOMContentLoaded", function() {
  const path = location.pathname.toLowerCase();
  
  if (path.endsWith("index.html") || path.endsWith("/")) {
    // Login page
    const form = document.getElementById("loginForm");
    if (form) {
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        login();
      });
    }
  } 
  else if (path.endsWith("registration.html")) {
    // Registration page
    const form = document.getElementById("registerForm");
    const sendOtpBtn = document.getElementById("sendOtpBtn");
    const verifyOtpBtn = document.getElementById("verifyOtpBtn");
    const resendOtp = document.getElementById("resendOtp");
    
    if (sendOtpBtn) {
      sendOtpBtn.addEventListener("click", (e) => {
        e.preventDefault();
        sendOtp();
      });
    }
    
    if (verifyOtpBtn) {
      verifyOtpBtn.addEventListener("click", (e) => {
        e.preventDefault();
        verifyOtp();
      });
    }
    
    if (resendOtp) {
      resendOtp.addEventListener("click", (e) => {
        e.preventDefault();
        resendOtp();
      });
    }
    
    // Setup OTP input navigation
    setupOtpInputs();
  }
  else if (path.endsWith("home.html")) {
    // Main application page
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
  }
});