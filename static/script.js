const passwordInput = document.getElementById("password");
const strengthBar = document.getElementById("strength-bar");
const strengthText = document.getElementById("strength-text");
const crackTime = document.getElementById("crack-time");
const warning = document.getElementById("warning");
const suggestions = document.getElementById("suggestions");
const toggleBtn = document.getElementById("toggleBtn");

toggleBtn.addEventListener("click", () => {

    if(passwordInput.type === "password"){
        passwordInput.type = "text";
    }
    else{
        passwordInput.type = "password";
    }

});

passwordInput.addEventListener("input", async () => {

    const password = passwordInput.value;

    const response = await fetch("/analyze", {
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({password})
    });

    const data = await response.json();

    const width = (data.score + 1) * 20;

    strengthBar.style.width = width + "%";

    const colors = [
        "#ef4444",
        "#f97316",
        "#eab308",
        "#22c55e",
        "#16a34a"
    ];

    strengthBar.style.background = colors[data.score];

    strengthText.innerHTML =
        `Strength: ${data.strength}`;

    crackTime.innerHTML =
        `⏳ Crack Time: ${data.crack_time}`;

    warning.innerHTML =
        data.warning ? `⚠ ${data.warning}` : "";

    suggestions.innerHTML = "";

    data.suggestions.forEach(item => {

        const li = document.createElement("li");

        li.textContent = item;

        suggestions.appendChild(li);

    });

});