document.addEventListener('DOMContentLoaded', () => {
    document.getElementById("login-form").addEventListener("submit", function(event) {
        event.preventDefault();

        // Function to display comments
        function displayComments(comments) {
            const commentsSection = document.querySelector('.comments-section');
            commentsSection.innerHTML = ''; // Clear existing comments

            comments.forEach(comment => {
                const commentElement = document.createElement('p');
                commentElement.textContent = `${comment.username}: ${comment.comment}`;
                commentsSection.appendChild(commentElement);
            });
        }

        // Fetch comments from comments.json
        fetch('comments.json')
            .then(response => response.json())
            .then(comments => {
                // Display comments
                displayComments(comments);
            })
            .catch(error => console.error('Error fetching comments:', error));

        // Get the username and password from the form
        var username = document.getElementById("username").value;
        var password = document.getElementById("password").value;

        // Load user data from JSON (for simplicity, this could come from an AJAX request)
        fetch("users.json")
            .then(response => response.json())
            .then(users => {
                // Check if the provided username and password match any user in the JSON
                var authenticatedUser = users.find(user => user.username === username && user.password === password);

                if (authenticatedUser) {
                    // Redirect to a dashboard page or perform other actions for successful login
                    window.location.href = "home-page.html";
                } else {
                    // Display error message for incorrect credentials
                    document.getElementById("error-message").textContent = "Invalid username or password";
                }
            })
            .catch(error => {
                // Display error message if there's an issue fetching user data
                console.error("Error fetching users:", error);
                document.getElementById("error-message").textContent = "An error occurred. Please try again later.";
            });
    });
});