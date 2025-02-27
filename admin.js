document.addEventListener("DOMContentLoaded", function () {
    const username = localStorage.getItem("username");

    if (username !== "admin") {
        window.location.href = "login.html"; // Redirect to login if not admin
    } else {
        document.getElementById("welcome-message").textContent = `Hi, ${username}`;
        document.getElementById("logout").style.display = "inline-block"; // Show logout button
    }

    // Display current date
    const currentDate = new Date();
    document.getElementById("current-date").textContent = currentDate.toLocaleDateString();

    // Load and display articles
    const articles = JSON.parse(localStorage.getItem("articles") || "[]");
    const articlesContainer = document.getElementById("articles-container");

    function renderArticles() {
        articlesContainer.innerHTML = ""; // Clear previous articles

        articles.forEach((article, index) => {
            const articleElement = document.createElement("div");
            articleElement.classList.add("article");
            articleElement.innerHTML = `
                <h3>${article.title}</h3>
                <p>${article.content}</p>
                <p><strong>Author:</strong> ${article.author}</p>
                <p><strong>Published on:</strong> ${article.date}</p>
                <img src="${article.image}" alt="Article Image" class="article-img" />
                <button class="delete-btn">Delete</button>
            `;

            // Delete button functionality
            articleElement.querySelector(".delete-btn").addEventListener("click", function () {
                articles.splice(index, 1); // Remove the article from the array
                localStorage.setItem("articles", JSON.stringify(articles)); // Update localStorage
                renderArticles(); // Re-render articles after deletion
            });

            articlesContainer.appendChild(articleElement);
        });
    }

    // Call the function to render articles
    renderArticles();

    // Add article functionality
    document.getElementById("article-form").addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent form submission

        const title = document.getElementById("article-title").value;
        const content = document.getElementById("article-content").value;
        const author = document.getElementById("article-author").value;
        const date = document.getElementById("article-date").value;
        const image = document.getElementById("article-image").files[0];

        if (title && content && author && date && image) {
            const reader = new FileReader();
            reader.onload = function (e) {
                const newArticle = {
                    title,
                    content,
                    author,
                    date,
                    image: e.target.result, // Store the image as a data URL
                };

                articles.push(newArticle);
                localStorage.setItem("articles", JSON.stringify(articles)); // Save to localStorage
                renderArticles(); // Re-render articles with the new one
            };
            reader.readAsDataURL(image); // Convert image to base64 data URL
        }
    });

    // Logout functionality
    document.getElementById("logout").addEventListener("click", function () {
        localStorage.removeItem("username");
        window.location.href = "login.html"; // Redirect to login page
    });
});
