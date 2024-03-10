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
  });



  fetch('http://127.0.0.1:8000/api/getallposts')
    .then(response => response.json())
    .then(posts => {
        const usernames = posts.map(post => post.username);
        const postTexts = posts.map(post => post.post_text);
        const imageSources = posts.map(post => post.image_src);
        // Display the usernames and post texts (replace with your desired logic)
        // console.log("Usernames:", usernames);
        // console.log("Post Texts:", postTexts);
          console.log("Image Sources:", imageSources);
        const usernameElements = document.querySelectorAll(".home-page-text034 #Username");
        
        const postImageElements = document.querySelectorAll(".home-page-image #PostImage");

        const postTextElements = document.querySelectorAll(".home-page-text95 #PostText");

        // document.getElementById("Username").textContent = usernames[0];
        // document.getElementById("PostText").textContent = postTexts[0];
        postImageElements.forEach((element, index) => {
            element.src = imageSources[index];
            element.alt = "Post Image";
        });
       
        usernameElements.forEach((element, index) => {
            element.textContent = usernames[index];
        });
    
        postTextElements.forEach((element, index) => {
            element.textContent = postTexts[index];
        });
        })       
        .catch(error => console.error("Error fetching posts:", error)); 





        fetch('genAI3.json')
        .then(response => response.json())
        .then(data => {
            // Extract the weekly and monthly text
            const dailyOutput = data.outputs[0].output_daily.output;
            const weeklyOutput = data.outputs[1].output_weekly.output;
            const monthlyOutput = data.outputs[2].output_monthly.output;
    
            const dailyTaskStartIndex = dailyOutput.indexOf("**Task:**") + 9; // Index after "**Task:**"
            const dailyTaskEndIndex = dailyOutput.indexOf(".", dailyTaskStartIndex) + 1; // Index of the first full stop (.)
            const dailyTaskText = dailyOutput.substring(dailyTaskStartIndex, dailyTaskEndIndex).trim();
    
            const weeklyTaskStartIndex = weeklyOutput.indexOf("**Task:**") + 9; // Index after "**Task:**"
            const weeklyTaskEndIndex = weeklyOutput.indexOf(".", weeklyTaskStartIndex) + 1; // Index of the first full stop (.)
            const weeklyTaskText = weeklyOutput.substring(weeklyTaskStartIndex, weeklyTaskEndIndex).trim();
    
            const monthlyTaskStartIndex = monthlyOutput.indexOf("**Task:**") + 9; // Index after "**Task:**"
            const monthlyTaskEndIndex = monthlyOutput.indexOf(".", monthlyTaskStartIndex) + 1; // Index of the first full stop (.)
            const monthlyTaskText = monthlyOutput.substring(monthlyTaskStartIndex, monthlyTaskEndIndex).trim();
    
            
    
            const dailyChallengeDiv = document.getElementById('challenge-container1');
            dailyChallengeDiv.innerHTML = dailyTaskText;
            const monthlyChallengeDiv = document.getElementById('challenge-container3');
            monthlyChallengeDiv.innerHTML = monthlyTaskText;
    
            // Display the weekly text on the HTML page
            const weeklyChallengeDiv = document.getElementById('challenge-container2');
            weeklyChallengeDiv.innerHTML = weeklyTaskText;
    
        })
        .catch(error => console.error('Error fetching data:', error));
  
