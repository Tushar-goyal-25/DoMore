document.addEventListener('DOMContentLoaded', () => {

  // List of like button and like text IDs
  const buttonIds = ['like-btn-daily', 'like-btn-weekly', 'like-btn-monthly'];
  const likeTextIds = ['like-text-daily', 'like-text-weekly', 'like-text-monthly'];

  // Function to update the like count text
  const updateLikeText = (likeTextId, count, isLikedByYou) => {
    const textElement = document.getElementById(likeTextId);
    const text = isLikedByYou ? `${count} others liked this` : `You and ${count} others liked this`;
    textElement.textContent = text;
  };

  // Function to handle the like button click
  const handleLikeClick = (likeButtonId, likeTextId) => {
    const likeButton = document.getElementById(likeButtonId);
    const isLikedByYou = likeButton.classList.contains('liked');
    const currentCount = parseInt(likeButton.getAttribute('data-like-count'), 10);
    const newCount = isLikedByYou ? currentCount - 1 : currentCount + 1;

    // Optimistically update the like button and text
    likeButton.classList.toggle('liked');
    likeButton.setAttribute('data-like-count', newCount);
    updateLikeText(likeTextId, newCount, !isLikedByYou);

    // Make a request to the server to update the like count
    fetch('your/backend/endpoint', {
      method: 'POST',
      body: JSON.stringify({ postId: likeButtonId, liked: !isLikedByYou }),
      headers: {
        'Content-Type': 'application/json',
        // Include other headers as necessary, such as authorization tokens
      }
    })
    .then(response => response.json())
    .then(data => {
      // Use the response from the server to set the actual count
      // If the server responds with the total count and like status
      updateLikeText(likeTextId, data.likeCount, data.isLikedByYou);
    })
    .catch(error => {
      console.error('There was an error processing the like:', error);
      // Rollback optimistic update in case of error
      likeButton.classList.toggle('liked', isLikedByYou);
      likeButton.setAttribute('data-like-count', currentCount);
      updateLikeText(likeTextId, currentCount, isLikedByYou);
    });
  };

  // Attach event listeners to each like button
  buttonIds.forEach((buttonId, index) => {
    const likeButton = document.getElementById(buttonId);
    const likeTextId = likeTextIds[index];

    likeButton.addEventListener('click', () => handleLikeClick(buttonId, likeTextId));
  });




  // Generic function to post a comment
  const postComment = (inputSelector, sectionSelector) => {
    const inputField = document.querySelector(inputSelector);
    console.log(inputField);
    const commentText = inputField.value.trim();

    if (commentText) {
      const commentDiv = document.createElement('div');
      commentDiv.classList.add('comment');

      const usernameSpan = document.createElement('span');
      usernameSpan.classList.add('comment-username');
      // Replace 'current_user' with the actual username of the logged-in user
      usernameSpan.textContent = 'current_user';

      const textSpan = document.createElement('span');
      textSpan.classList.add('comment-text');
      textSpan.textContent = commentText;

      commentDiv.appendChild(usernameSpan);
      commentDiv.appendChild(textSpan);

      const commentSection = document.querySelector(sectionSelector);
      commentSection.appendChild(commentDiv);

      inputField.value = '';
    } else {
      alert('Please enter a comment before posting.');
    }
  };

  // Function to initialize each comment section with its own event listeners
  const initializeCommentSections = () => {
    // Assuming each comment input and button have a data attribute 'data-comment-section' with a unique value
    const commentButtons = document.querySelectorAll('.comment-btn');
    commentButtons.forEach(button => {
      button.addEventListener('click', () => {
        const sectionId = button.getAttribute('data-comment-section');
        postComment(`input[data-comment-section="${sectionId}"]`, `.comment-section[data-comment-section="${sectionId}"]`);
      });
    });

    // Optional: add keypress event for Enter to post comment
    const commentInputs = document.querySelectorAll('.comment-input');
    commentInputs.forEach(input => {
      input.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
          event.preventDefault();
          const sectionId = input.getAttribute('data-comment-section');
          postComment(`input[data-comment-section="${sectionId}"]`, `.comment-section[data-comment-section="${sectionId}"]`);
        }
      });
    });
  };

  // Initialize all comment sections
  initializeCommentSections();

    
});


  