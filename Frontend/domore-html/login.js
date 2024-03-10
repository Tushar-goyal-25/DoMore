document.addEventListener('DOMContentLoaded', () => {
    document.getElementById("login-form").addEventListener("submit", function(event) {
        event.preventDefault();
    
        // Get the username and password from the form
        var username = document.getElementById("username").value;
        var password = document.getElementById("password").value;
    
        // Load user data from JSON (for simplicity, this could come from an AJAX request)
        fetch("http://127.0.0.1:8000/api/getunap")
            .then(response => response.json())
            .then(users => {
                var authenticatedUser = users.find(user => user.username === username && user.password === password);
    
                if (authenticatedUser) {
                    // Redirect to a dashboard page or perform other actions for successful login
                    window.location.href = "home-page.html";
                } else {
                    // Display error message for incorrect credentials
                    document.getElementById("error-message").textContent = "Invalid username or password";
                }
            })
            .catch(error => console.error("Error fetching users:", error));
    });
});