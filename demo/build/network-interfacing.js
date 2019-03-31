/* NETWORK INTERFACING
	- prebuilt functions, 1.0

	available functions:
	- loadProfile
		get profile object
	- loadPosts
		get a list of a user's posts
	- loadPostContent
		get content of each post and append

	- loadUsersCentral
		get a list of users from an external source
	- usersProfiles
		use a list of users and return their profile
	- userAndTheirPosts
		use a list of users and return their profile + all their posts

	- isOwner
		check if you are the site's owner
	- writePost
		submit a post interface

*/

/******************************************************************************/

async function loadProfile(archive) {
  var profile = await archive.readFile('/profile.json')
  profile = JSON.parse(profile)

  var userInfo = {
    "profile": profile,
    "archive": archive
  }

  return userInfo
}

/******************************************************************************/

async function loadPosts(archive) {
  var posts = await archive.readdir('/posts/', {
    stat: true
  });

  var userPosts = {
    "posts": posts,
    "archive": archive
  }

  return userPosts
}

async function loadMedia(archive) {
  var media = await archive.readdir('/media/', {
    stat: true
  });

  var userMedia = {
    "media": media
  }

  return userMedia
}

/******************************************************************************/

async function loadPostContent(archive, post) {
  var postLink = '/posts/' + post.name;
  // console.log(postLink)
  var postContent = await archive.readFile(postLink)

  var postAndArchive = {
    "post": JSON.parse(postContent),
    "archive": archive
  }

  return postAndArchive
}

async function loadMediaName(archive, mediaName) {
  var mediaLink = '/media/' + mediaName.name;

  var mediaAndName = {
    "name": mediaLink
  }
}

/******************************************************************************/

async function loadUsersCentral(archive, fileName) {
  var getUserList = await archive.readFile(fileName);
  getUserList = JSON.parse(getUserList)

  var userList = {
    "users": getUserList.users,
    "archive": archive
  }

  return userList;
}

/******************************************************************************/

async function isOwner(archive) {
  var pageInfo = await archive.getInfo();
  return pageInfo.isOwner;
}

/******************************************************************************/

// WRITE POST METHOD MOVED OVER TO MAIN.JS


/******************************************************************************/
/* RECURSIVE FUNCTIONS BELOW */
/* https://en.wikipedia.org/wiki/Recursion_(computer_science) */
/******************************************************************************/



function usersProfiles(userCounter, userList, profilesContainer) {
  // recursive function listing all users
  var userUrl = new DatArchive(userList[userCounter]),
    userAmount = userList.length;

  loadProfile(userUrl)
    .then(function(userInfo) {

      profilesContainer.insertAdjacentHTML("beforeend", `
			<div class="loadedUser" data-balloon="${userInfo.profile.username}" data-balloon-pos="up">
				<img class="loadedUserAvatar" src="http://placehold.it/60x60" width="60px" height="60px" />
			</div>
		`)

      // <li>
      // 	<hr />
      // 	<h2>
      // 		<a href="${userInfo.archive.url}" target="_blank">
      // 			${userInfo.profile.username}
      // 		</a>
      // 	</h2>
      // 	<p>${userInfo.profile.bio}</p>
      // 	<h3>${userInfo.profile.email}</h3>
      // </li>

      if (userCounter < userAmount - 1) {
        //foreach appending posts for this user is over
        userCounter++;
        usersProfiles(userCounter, userList, profilesContainer) // move to next user
      }

    })
    .catch(function(error) {
      console.log("error thrown\n", error)
    })
}

/******************************************************************************/

function userAndTheirPosts(userCounter, userList, watchingContainer) {
  // get username from dat url
  var userUrl = new DatArchive(userList[userCounter]);
  userAmount = userList.length;

  // load user profile:
  loadProfile(userUrl)
    .then(function(userInfo) {
      var userId = "user-" + userInfo.archive.url.replace("dat://", ""); // dynamically generated id to be populated later

      // watchingContainer.insertAdjacentHTML("beforeend", `
      // 	<div class="loadedUser" data-balloon="${userInfo.profile.username}" data-balloon-pos="top">
      // 		<img class="loadedUserAvatar" src="http://placehold.it/60x60" width="60px" height="60px" />
      // 	</div>
      // `)

      return userInfo.archive;

    })
    .then(function(userArchive) {
      // load posts of user:
      loadPosts(userArchive)
        .then(function(userPosts) {
          // this user's posts:
          console.log(userPosts)
          var userId = "user-" + userPosts.archive.url.replace("dat://", ""); // dynamically generated id

          var amountOfPosts = userPosts.posts.length,
            postCounter = 0;

          userPosts.posts.forEach(function(post) {

            loadPostContent(userUrl, post)
              .then(function(postAndArchive) {

                var post = postAndArchive.post;
                var thisPostContent = post.content;

                // rough image replacement:
                var userPostContainer = document.getElementById(userId); // dynamically generated id
                if (JSON.stringify(post.content).includes('src=\\"')) {
                  thisPostContent = JSON.stringify(thisPostContent).replace('src=\\"', 'src="' + postAndArchive.archive.url + "/");
                } else if (JSON.stringify(post.content).includes("src=\\'")) {
                  thisPostContent = JSON.stringify(thisPostContent).replace("src=\\'", "src='" + postAndArchive.archive.url + "/");
                }

                userPostContainer.insertAdjacentHTML("beforeend", `
					<div class="post-block">
					<div class="top-bar">
						<div class="close-btn"></div>
						<div class="minimize-btn"></div>
						<div class="maximize-btn"></div>
					</div>
					<div class="avatar">
						<img src="http://placehold.it/60x60" alt="" />
					</div>
							<h2>${post.title}</h2>
							<h4>${post.timestamp}</h4>
							<p>${thisPostContent}</p>
							</div>
					`);
                $('.post-block').draggable({
                  delay: 50
                });
                windowControls();

                postCounter++;
                // console.log(postCounter, amountOfPosts, userCounter, userAmount)
                if (postCounter >= amountOfPosts && userCounter < userAmount - 1) {
                  //foreach appending posts for this user is over
                  userCounter++;
                  userAndTheirPosts(userCounter, userList, watchingContainer) // move to next user
                }
              })
          })
        })
        .catch(function(error) {
          console.log("error thrown\n", error)
        }) //end of loadPosts.then
    })
    .catch(function(error) {
      console.log("error thrown\n", error)
    })
} // end of function
