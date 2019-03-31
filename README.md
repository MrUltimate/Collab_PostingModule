# Posting and Media Type Module

A Custom Posting and Media Type Management Module built with DatArchive API for Parson's Network Interfacing Collaboration.

## Getting Started

To get started, you need to choose whether you want to use the posting module provided (see demo), or use the vanilla form files and create a custom submission form that's more aptly suited for your website.

If you want to use the interactive form provided, use the files from the `Plugin Form` folder, alternatively, use the `Vanilla Form` folder to create and customize your own form.

### Prerequisites

Regardless of using the `Plugin Form` or the `Vanilla Form`, the JS code requires jQuery. If you're not already calling jQuery in your `index.html`, use the following code to call jQuery. Place this **before** any other script in the `<head>` tag.

```
<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js"></script>
```

### Installing the Plugin Form

If you're using the Plugin Form, follow the following steps to install the form and get it working:

* Copy all files from the CSS Folder and place them in the appropriate folder. Then call them in your `index.html` file like so:

```
<link rel="stylesheet" type="text/css" href="build/normalize.css" />
<link rel="stylesheet" type="text/css" href="build/demo.css" />
<link rel="stylesheet" type="text/css" href="build/component.css" />
<link rel="stylesheet" type="text/css" href="build/cs-select.css" />
<link rel="stylesheet" type="text/css" href="build/cs-skin-boxes.css" />
```

* Add the form HTML from the `form.html` file under the `post_interface` div in your `index.html` file.
* Then start adding the Javascript from the JS Folder. Copy the following Files in your build folder:
   * classie.js
   * fullscreenForm.js
   * modernizr.custom.js
   * selectFx.js
* Then call them in your `index.html` file like so:

```
<script src="build/classie.js"></script>
<script src="build/selectFx.js"></script>
<script src="build/fullscreenForm.js"></script>
<script>
  (function() {
    var formWrap = document.getElementById('fs-form-wrap');

    [].slice.call(document.querySelectorAll('select.cs-select')).forEach(function(el) {
      new SelectFx(el, {
        stickyPlaceholder: false,
        onChange: function(val) {
          document.querySelector('span.cs-placeholder').style.backgroundColor = val;
        }
      });
    });

    new FForm(formWrap, {
      onReview: function() {
        classie.add(document.body, 'overview'); // for demo purposes only
      }
    });
  })();
</script>
```
* Finally, start modifying your JS files to read and write posts.
   * Copy the `loadPosts()` function from the `loadPost.js` file and replace it in your `index.html` file
   * Copy the `writePost()` function from the `writePost.js` file and replace it in your `network-interface.js` file.

### Installing the Vanilla Form

A step by step series of examples that tell you how to get a development env running

Say what the step will be

```
Give the example
```

And repeat

```
until finished
```

End with an example of getting some data out of the system or using it for a little demo



## Deployment

Add additional notes about how to deploy this on a live system

## Built With

* [Dropwizard](http://www.dropwizard.io/1.0.2/docs/) - The web framework used
* [Maven](https://maven.apache.org/) - Dependency Management
* [ROME](https://rometools.github.io/rome/) - Used to generate RSS Feeds

## Contributing

Please read [CONTRIBUTING.md](https://gist.github.com/PurpleBooth/b24679402957c63ec426) for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags).

## Authors

* **Billie Thompson** - *Initial work* - [PurpleBooth](https://github.com/PurpleBooth)

See also the list of [contributors](https://github.com/your/project/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* Hat tip to anyone whose code was used
* Inspiration
* etc
