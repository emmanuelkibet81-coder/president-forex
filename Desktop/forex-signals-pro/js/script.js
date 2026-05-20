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
        sl: "2340.00"
    }
];

// DISPLAY SIGNALS
function loadSignals() {
    const container = document.getElementById("signals-container");
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
        ${window.location.pathname.includes("admin") ? 
        `<button onclick="deleteSignal(${index})">Delete</button>` : ""}
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
function addSignal() {
    const pair = document.getElementById("pair").value;
    const type = document.getElementById("type").value;
    const entry = document.getElementById("entry").value;
    const tp = document.getElementById("tp").value;
    const sl = document.getElementById("sl").value;

    const newSignal = { pair, type, entry, tp, sl };

    signals.push(newSignal);

    // SAVE DATA
    localStorage.setItem("signals", JSON.stringify(signals));

    alert("Signal Saved!");
}

window.deleteSignal = function(index) {
    signals.splice(index, 1);

    localStorage.setItem("signals", JSON.stringify(signals));

    loadSignals();
};

function login() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // SIMPLE LOGIN (we improve later)
    if (username === "admin" && password === "1234") {
        localStorage.setItem("isAdmin", "true");
        window.location.href = "admin.html";
    } else {
        alert("Wrong credentials");
    }
}

function logout() {
    localStorage.removeItem("isAdmin");
    window.location.href = "login.html";
}