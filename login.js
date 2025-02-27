document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("login-form");
    const errorMessage = document.getElementById("login-error-message");

    loginForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const username = document.getElementById("login-username").value;
        const password = document.getElementById("login-password").value;

        // Admin login validation
        if (username === "admin" && password === "admin123") {
            localStorage.setItem("username", username); // Save admin session
            window.location.href = "admin.html";
            return;
        }

        // User login validation (check against local storage)
        const users = JSON.parse(localStorage.getItem("users")) || [];
        const user = users.find(u => u.username === username && u.password === password);

        if (user) {
            localStorage.setItem("username", username); // Save user session
            window.location.href = "index.html";
        } else {
            errorMessage.style.display = "block";
            errorMessage.textContent = "Invalid credentials, please try again.";
        }
    });
});
