// PROTECT ADMIN PAGE
if (window.location.pathname.includes("admin.html")) {
    const isAdmin = localStorage.getItem("isAdmin");

    if (isAdmin !== "true") {
        window.location.href = "login.html";
    }
}

// NAVIGATION
function joinNow() {
    window.location.href = "dashboard.html";
}

// SIGNAL DATA
let signals = JSON.parse(localStorage.getItem("signals")) || [
    {
        pair: "GOLD (XAUUSD)",
        type: "BUY",
        entry: "2350.00",
        tp: "2365.00",
        sl: "2340.00",
        status: "ACTIVE"
    }
];

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
}

// RUN FUNCTION
if (
    window.location.pathname.includes("dashboard.html") ||
    window.location.pathname.includes("admin.html")
) {
    loadSignals();
}

// ADD SIGNAL FROM ADMIN
function addSignal(pair, type, entry, tp, sl) {
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

    alert("Signal Saved!");
    alert("🚀 New Signal Added!");
}

// DELETE SIGNAL
function deleteSignal(index) {
    signals.splice(index, 1);
    localStorage.setItem("signals", JSON.stringify(signals));
    loadSignals();
}

// CLOSE SIGNAL
function closeSignal(index) {
    signals[index].status = "CLOSED";
    localStorage.setItem("signals", JSON.stringify(signals));
    loadSignals();
}

// LOGIN
function login() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if (username === "admin" && password === "1234") {
        localStorage.setItem("isAdmin", "true");
        window.location.href = "admin.html";
    } else {
        alert("Invalid login credentials");
    }
}

// LOGOUT
function logout() {
    localStorage.removeItem("isAdmin");
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
    const total = signals.length;
    const closed = signals.filter(s => s.status === "CLOSED").length;

    document.getElementById("total").innerText = total;
    document.getElementById("closed").innerText = closed;
}

updateStats();