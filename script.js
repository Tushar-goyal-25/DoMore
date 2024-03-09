document.getElementById("login-form").addEventListener("submit", function(event) {
    event.preventDefault();

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
                window.location.href = "web.html";
            } else {
                // Display error message for incorrect credentials
                document.getElementById("error-message").textContent = "Invalid username or password";
            }
        })
        .catch(error => console.error("Error fetching users:", error));
});
