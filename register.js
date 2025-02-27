document.addEventListener("DOMContentLoaded", function () {
    const registerForm = document.getElementById("register-form");
    const errorMessage = document.getElementById("error-message");

    registerForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;
        const confirmPassword = document.getElementById("confirm-password").value;

        if (password !== confirmPassword) {
            errorMessage.style.display = "block";
            errorMessage.textContent = "Passwords do not match!";
            return;
        }

        // Check if user already exists
        const existingUser = JSON.parse(localStorage.getItem("users")) || [];
        const userExists = existingUser.some(user => user.username === username);

        if (userExists) {
            errorMessage.style.display = "block";
            errorMessage.textContent = "Username already taken!";
            return;
        }

        // Save user to local storage
        existingUser.push({ username, password });
        localStorage.setItem("users", JSON.stringify(existingUser));

        // Redirect to login page after successful registration
        window.location.href = "login.html";
    });
});
