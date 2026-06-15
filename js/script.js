
// PROTECT ADMIN PAGE
if (window.location.pathname.includes("admin.html")) {
    const isAdmin = localStorage.getItem("isAdmin");

    if (isAdmin !== "true") {
        window.location.href = "login.html";
    }
}

// PROTECT USER DASHBOARD
if (window.location.pathname.includes("dashboard.html")) {
    const isUser = localStorage.getItem("isUser");

    if (isUser !== "true") {
        window.location.href = "login.html";
    }
}

// NAVIGATION
function joinNow() {
    window.location.href = "dashboard.html";
}

// SIGNAL DATA
let signals = [];

try {
    signals = JSON.parse(localStorage.getItem("signals")) || [];
} catch {
    signals = [];
}

// fallback default if empty
if (signals.length === 0) {
    signals = [
        {
            pair: "GOLD (XAUUSD)",
            type: "BUY",
            entry: "2350.00",
            tp: "2365.00",
            sl: "2340.00",
            status: "ACTIVE"
        }
    ];
}

// DISPLAY SIGNALS
function loadSignals() {
    const container = document.getElementById("signals-container");
    if (!container) return;

    container.innerHTML = "";

    signals.forEach((signal, index) => {
        const card = document.createElement("div");

        card.classList.add("signal-card");

        if (signal.type === "BUY") {
            card.classList.add("buy");
        } else {
            card.classList.add("sell");
        }

        card.innerHTML = `
            <h3>${signal.pair}</h3>
            <p>Type: ${signal.type}</p>
            <p>Entry: ${signal.entry}</p>
            <p>Take Profit: ${signal.tp}</p>
            <p>Stop Loss: ${signal.sl}</p>
            <p>Status: ${signal.status}</p>
            ${window.location.pathname.includes("admin") ?
            `<button onclick="deleteSignal(${index})">Delete</button>` : ""}
            <button onclick="closeSignal(${index})">Close</button>
        `;

        container.appendChild(card);
    });

    updateStats();
}

// RUN FUNCTION
if (
    window.location.pathname.includes("dashboard.html") ||
    window.location.pathname.includes("admin.html")
) {
    loadSignals();
}

// ADD SIGNAL FROM ADMIN
function addSignal() {
    const pair = document.getElementById("pair").value;
    const type = document.getElementById("type").value;
    const entry = document.getElementById("entry").value;
    const tp = document.getElementById("tp").value;
    const sl = document.getElementById("sl").value;

    // 🚨 validation
    if (!pair || !type || !entry || !tp || !sl) {
        alert("Please fill all fields");
        return;
    }

    const newSignal = {
        pair,
        type,
        entry,
        tp,
        sl,
        status: "ACTIVE"
    };

    signals.push(newSignal);

    localStorage.setItem("signals", JSON.stringify(signals));

    alert("Signal Added!");
    loadSignals();
}

// DELETE SIGNAL
function deleteSignal(index) {
    signals.splice(index, 1);
    localStorage.setItem("signals", JSON.stringify(signals));
    updateStats();
    loadSignals();

}

// CLOSE SIGNAL
function closeSignal(index) {
    signals[index].status = "CLOSED";
    localStorage.setItem("signals", JSON.stringify(signals));
    updateStats();
    loadSignals();
}

// LOGIN
function login() {
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    const users = JSON.parse(localStorage.getItem("users")) || [];

    // 🔹 ADMIN LOGIN (FIRST)
    if (username === "admin" && password === "1234") {
        localStorage.setItem("isAdmin", "true");
        localStorage.removeItem("isUser");

        window.location.href = "admin.html";
        return;
    }

    // 🔹 CLIENT LOGIN
    const validUser = users.find(user =>
        user.username === username && user.password === password
    );

    if (validUser) {
        localStorage.setItem("isUser", "true");
        localStorage.removeItem("isAdmin");

        window.location.href = "dashboard.html";
        return;
    }

    alert("Invalid login credentials");
}

// LOGOUT
function logout() {
    localStorage.removeItem("isAdmin");
    localStorage.removeItem("isUser");
    window.location.href = "login.html";
}

function calculateProfit() {
    const lot = document.getElementById("lot").value;
    const pips = document.getElementById("pips").value;

    const profit = lot * pips * 10;

    document.getElementById("result").innerText =
        "Estimated Profit: $" + profit;
}

function updateStats() {
    const totalEl = document.getElementById("total");
    const closedEl = document.getElementById("closed");

    if (!totalEl || !closedEl) return;

    const total = signals.length;
    const closed = signals.filter(s => s.status === "CLOSED").length;

    totalEl.innerText = total;
    closedEl.innerText = closed;
}

function register() {
    const username = document.getElementById("regUsername").value;
    const password = document.getElementById("regPassword").value;

    if (!username || !password) {
        alert("Please fill all fields");
        return;
    }
    if (username === "admin") {
    alert("This username is reserved");
    return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || [];

    users.push({ username, password });

    localStorage.setItem("users", JSON.stringify(users));

    alert("Account created successfully!");

    window.location.href = "login.html";
}

function goToRegister() {
    window.location.href = "register.html";
}

function goToLogin() {
    window.location.href = "login.html";
 }  