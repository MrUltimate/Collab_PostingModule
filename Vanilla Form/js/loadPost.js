// Replace the loadposts() function with this function in your index.html
// THIS CODE WILL NOT RUN FROM THIS FILE.


//                                                            //
//                                                            //
//                          Hi :)                             //
//                                                            //
//                                                            //

// Look at the comment to see how the posts are loaded
// Make sure the match the HTML structure of your posts

// Use `${postAndArchive.post.title}` for the Title of the Post
// Use `${postAndArchive.post.timestamp}` for the Timestamp of the Post
// Use `${postAndArchive.post.content}` for the Content of the Post
// Use `${postAndArchive.post.mediaType}` for the Media Type of the Post
// Use `${postAndArchive.post.mediaSource}` for the Source URL of the Post's Media

//                                                            //
//                                                            //
//                                                            //
//                                                            //
//                                                            //

loadPosts(archive)
  .then(function(userPosts) {
    userPosts.posts.forEach(function(post) {
      loadPostContent(archive, post)
        .then(function(postAndArchive) {
          console.log("post", postAndArchive.post)
          //
          // This condition inserts the video post code
          if (postAndArchive.post.mediaType == "Video") {
            postContainer.insertAdjacentHTML("beforeend",
              `
      <div class="post">
        <h2>${postAndArchive.post.title}</h2>
        <h4>${postAndArchive.post.timestamp}</h4>
        <p>${postAndArchive.post.content}</p>
        <video width="320" height="240" controls>
          <source src="${postAndArchive.post.mediaSource}" type="video/mp4">
          Your browser does not support the video tag.
        </video>
      </div>
      `
            )
            // This condition inserts the audio post code
          } else if (postAndArchive.post.mediaType == "Audio") {
            postContainer.insertAdjacentHTML("beforeend",
              `
      <div class="post">
        <h2>${postAndArchive.post.title}</h2>
        <h4>${postAndArchive.post.timestamp}</h4>
        <p>${postAndArchive.post.content}</p>
        <audio controls>
          <source src="${postAndArchive.post.mediaSource}" type="audio/mpeg">
          Your browser does not support the audio element.
        </audio>
      </div>
      `
            )
            //This condidion insertst the plain text post code
          } else if (postAndArchive.post.mediaType == "Text") {
            postContainer.insertAdjacentHTML("beforeend",
              `
      <div class="post">
        <h2>${postAndArchive.post.title}</h2>
        <h4>${postAndArchive.post.timestamp}</h4>
        <p>${postAndArchive.post.content}</p>
      </div>
      `
            )
            // This condition inserts the Image Post Code
          } else if (postAndArchive.post.mediaType == "Image") {
            postContainer.insertAdjacentHTML("beforeend",
              `
      <div class="post">
        <h2>${postAndArchive.post.title}</h2>
        <h4>${postAndArchive.post.timestamp}</h4>
        <p>${postAndArchive.post.content}</p>
        <img src="${postAndArchive.post.mediaSource}" class="postImage"/>
      </div>
      `
            )
            //
            // This condition controls how posts with no Media Type is handed
            // You can change the structure in this condition to create a simple text post if you wish
            // Currently this throws a console error with the user and the post which does not contain a Media Type
            //
          } else if (postAndArchive.post.mediaType == null || !postAndArchive.has("mediaType") || !postAndArchive.isNull("mediaType")) {
						console.error("Post ID: " + postAndArchive.post.timestamp + " does not have a Media Type!");
						console.log("This post has no media type.");
						postContainer.insertAdjacentHTML("beforeend",
							`
							<div class="post">
				        <h2>${postAndArchive.post.title}</h2>
				        <h4>${postAndArchive.post.timestamp}</h4>
				        <p>${postAndArchive.post.content}</p>
				      </div>
				      `)
					}
        })
    })
  });
