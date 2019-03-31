// Replace the writePost() functiion with this function in your network-interface.js
// THIS CODE WILL NOT RUN FROM THIS FILE.


//                                                            //
//                                                            //
//          I hope you're having a wonderful day :)           //
//                                                            //
//                                                            //

// Look at the comment to see how the posts are written
// Make sure the match the HTML structure of your <form>
// If you're using the plugin form, all HTML is already matched

//                                                            //
//                                                            //
//                                                            //
//                                                            //


function writePost(archive, postSubmission) {
  var archive = archive;

  // when someone clicks submit:
  // If you change the "submit" class, make sure you also edit it in the HTML class in your index.html
  postSubmission.addEventListener("submit", function(e) {
    e.preventDefault(); // avoid default behavior
    var formRecieved = e.target,
      formTitle = formRecieved.elements["q1"].value.toString(),
      formContents = formRecieved.elements["q2"].value.toString(),
      formMediaSource = formRecieved.elements["q4"].value.toString(),
      timestamp = new Date().getTime();

    var formMediaType = null;
    var radios = document.getElementsByName('q3');

    for (var i = 0, length = radios.length; i < length; i++) {
      if (radios[i].checked) {
        // do whatever you want with the checked radio
        formMediaType = radios[i].value;
        // only one radio can be logically checked, don't check the rest
        break;
      }
    }

    // set up object to submit to post:
    var postContent = {
      "title": formTitle,
      "timestamp": timestamp,
      "content": formContents,
      "mediaType": formMediaType,
      "mediaSource": formMediaSource
    }

    //console.log("Post Contents: "+ JSON.stringify(postContent, null, 2));

    if (postContent.mediaType != "Unknown") {
      // use archive (the DatArchive) to write a file
      async function postFile(archive, postContent) {
        // this will write and newly organized post JSONs
        await archive.writeFile('/posts/post-' + postContent.timestamp + '.json', JSON.stringify(postContent, null, 2));
      }

      postFile(archive, postContent)
        .then(function(event) {
          console.log("post is posted!");
          // Trigger Visual Confirmation for Successful Post Submission
          //toastr.success("Posted Successfully!");
          // This will close the form once the post is submitted successfully.
          setTimeout(function() {
            // Reset Submit Buttom State
            $('.more').toggleClass("toggle");
            // Close Form View
            $('.submit').toggleClass("active");
          }, 500);
        })
        .catch(function(error) {
          console.log("error\n", error);
          // This creates an error visual feedback if the post cannot be submitted
          //
          //toastr.error("Error!", error);
        })
    } else if (postContent.mediaType == "Unknown" && postContent.mediaType != "Text" || postContent.mediaType == null && postContent.mediaType != "Text"){
      // This creates a visual feedback error if there's no media source
      //
      //console.error("Media URL is not a Direct Link!");
      //toastr.error('URL is not a Direct Link!')
    }
  });
}
