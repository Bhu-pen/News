document.addEventListener("DOMContentLoaded", function () {
    const username = localStorage.getItem("username");

    if (!username) {
        window.location.href = "login.html"; // Redirect to login if no user is logged in
    } else {
        document.getElementById("welcome-message").textContent = `Hi, ${username}`;
        document.getElementById("logout").style.display = "inline-block"; // Show logout button
    }

    // Get current date and display
    const currentDate = new Date().toLocaleDateString();
    document.getElementById("current-date").textContent = `Date: ${currentDate}`;

    // Load and display articles
    const articles = JSON.parse(localStorage.getItem("articles") || "[]");
    const articlesContainer = document.getElementById("articles-container");

    articles.forEach((article) => {
        const articleElement = document.createElement("div");
        articleElement.classList.add("article");
        articleElement.innerHTML = `
            <h3>${article.title}</h3>
            <p>${article.content}</p>
            <p><strong>Author:</strong> ${article.author}</p>
            <p><strong>Published on:</strong> ${article.date}</p>
            <img src="${article.image}" alt="Article Image" class="article-img" />
        `;
        articlesContainer.appendChild(articleElement);
    });

    // Logout functionality
    document.getElementById("logout").addEventListener("click", function () {
        localStorage.removeItem("username");
        window.location.href = "login.html";
    });
});
