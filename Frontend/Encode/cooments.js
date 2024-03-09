document.addEventListener("DOMContentLoaded", function() {
    // Fetch comments from comments.json
    fetch('comments.json')
        .then(response => response.json())
        .then(comments => {
            const commentsContainer = document.getElementById('comments');
            comments.forEach(comment => {
                const commentElement = document.createElement('div');
                commentElement.innerHTML = `
                    <p><strong>${comment.author}</strong>: ${comment.comment}</p>
                `;
                commentsContainer.appendChild(commentElement);
            });
        })
        .catch(error => console.error('Error fetching comments:', error));
});
