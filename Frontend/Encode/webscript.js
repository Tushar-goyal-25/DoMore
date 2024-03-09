// Wait for the DOM to be fully loaded before executing JavaScript
document.addEventListener("DOMContentLoaded", function() {
    // Get all like buttons and add event listener for each
    var likeButtons = document.querySelectorAll('.like-btn');
    likeButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            // Here you can implement the logic to handle liking a post
            var likeCount = this.parentElement.querySelector('.like-count');
            var currentLikes = parseInt(likeCount.textContent);
            if (!this.classList.contains('liked')) {
                likeCount.textContent = currentLikes + 1;
                this.classList.add('liked');
            } else {
                likeCount.textContent = currentLikes - 1;
                this.classList.remove('liked');
            }
        });
    });

    // Get the initial number of likes from likes.json
    fetch('likes.json')
        .then(response => response.json())
        .then(data => {
            // Update the like counts with the value from likes.json
            var likeCounts = document.querySelectorAll('.like-count');
            likeCounts.forEach(function(count) {
                count.textContent = data.likes;
            });
        })
        .catch(error => console.error('Error fetching likes:', error));
    // Get all comment buttons and add event listener for each
    var commentButtons = document.querySelectorAll('.comment-btn');
    commentButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            // Here you can implement the logic to handle commenting on a post
            var form = this.parentElement.querySelector('#form');
            form.classList.toggle('comments');
        });
    });

    // Get all share buttons and add event listener for each
    var shareButtons = document.querySelectorAll('.share-btn');
    shareButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            // Here you can implement the logic to handle sharing a post
            alert('Shared post: ' + this.parentElement.querySelector('h3').textContent);
        });
    });

    // Fetch comments from comments.json and append them to the comments section
    fetch('comments.json')
        .then(response => response.json())
        .then(comments => {
            const commentsSection = document.querySelector('.comments-section');
            comments.forEach(comment => {
                const listItem = document.createElement('li');
                listItem.innerHTML = `<strong>${comment.username}</strong>: ${comment.comment}`;
                commentsSection.appendChild(listItem);
            });
        })
        .catch(error => console.error('Error fetching comments:', error));

    // Listen for form submission
    const form = document.getElementById('form');
    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the default form submission behavior

        // Get the input value
        const input = document.getElementById('input').value.trim();
        if (input === '') {
            // Handle empty input
            alert('Please enter a comment.');
            return;
        }

        // Create a new comment object
        const newComment = {
            username: 'Current User', // You can replace this with the actual username of the current user
            comment: input
        };

        // Add the new comment to the UI
        const commentsSection = document.querySelector('.comments-section');
        const listItem = document.createElement('li');
        listItem.innerHTML = `<strong>${newComment.username}</strong>: ${newComment.comment}`;
        commentsSection.appendChild(listItem);

        // Update the comments.json file with the new comment
        fetch('comments.json', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newComment)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to add comment');
            }
            return response.json();
        })
        .then(data => {
            console.log('Comment added successfully:', data);
        })
        .catch(error => {
            console.error('Error adding comment:', error);
        });

        // Clear the input field after submission
        document.getElementById('input').value = '';
    });
});

function openMessagePage() {
    window.location.href = "message.html";
}// Fetch images from the JSON file
fetch('photos.json')
.then(response => response.json())
.then(images => {
    const topPosts = document.getElementById('topPosts');
    images.forEach((image, index) => {
        // Create a new trending post container
        const trendingPost = document.createElement('div');
        trendingPost.classList.add('TrendingPost');

        // Create a heading element
        const heading = document.createElement('h3');
        heading.textContent = index === 0 ? 'Today:' : index === 1 ? 'This Week:' : 'This Month:';

        // Create an image element
        const img = document.createElement('img');
        img.src = image.src;
        img.alt = 'Post Image';

        // Create a paragraph element for likes
        const likes = document.createElement('p');
        likes.textContent = 'Likes'; // You can replace this with the actual number of likes

        // Append elements to the trending post container
        trendingPost.appendChild(heading);
        trendingPost.appendChild(img);
        trendingPost.appendChild(likes);

        // Append the trending post container to the top posts section
        topPosts.appendChild(trendingPost);
    });
})
.catch(error => console.error('Error fetching images:', error));
