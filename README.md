# Posting and Media Type Module

A Custom Posting and Media Type Management Module built with DatArchive API for Parson's Network Interfacing Collaboration.

![alt text](https://github.com/MrUltimate/Collab_PostingModule/blob/master/form-demo.gif "Form Demo GIF")

## Demo

[Click Here](https://mrultimate.github.io/Collab_PostingModule/) to See the Plugin Form in action.

## Getting Started

To get started, you need to choose whether you want to use the posting module provided (see [demo](#demo)), or use the vanilla form files and create a custom submission form that's more aptly suited for your website.

If you want to use the interactive form provided, use the files from the `Plugin Form` folder, alternatively, use the `Vanilla Form` folder to create and customize your own form.

### Prerequisites

Regardless of using the `Plugin Form` or the `Vanilla Form`, the JS code requires jQuery. If you're not already calling jQuery in your `index.html`, use the following code to call jQuery. Place this **before** any other script in the `<head>` tag.

```
<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js"></script>
```

## Installing the Plugin Form

If you're using the Plugin Form, follow the following steps to install the form and get it working:

* Copy all files from the CSS Folder and place them in the `build` folder. Then call them in your `index.html` file like so:

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
        classie.add(document.body, 'overview');
      }
    });
  })();
</script>
```
* Finally, start modifying your JS files to read and write posts.
   * Copy the `loadPosts()` function from the `loadPost.js` file and replace it in your `index.html` file
   * Copy the `writePost()` function from the `writePost.js` file and replace it in your `network-interface.js` file.

* `NOTE:` In order for your posts to fully and correctly be displayed, a `mediaType` and `mediaSource` key needs to be added within the JSON. If you don't have a `mediaSource` URL, set it to null, like so: `mediaSource: null`. This will ensure that your posts are correctly rendered.

## Installing the Vanilla Form

To install the Vanilla Form, follow the steps below:

* Make sure you're calling jQuery as dictated in the [Prerequisites](#prerequisites) section.
* Start my adding your JS files. We do this first as this is the part that **requires the least amount of editing**
* Start modifying your JS files to read and write posts.
   * Copy the `loadPosts()` function from the `loadPost.js` file and replace it in your `index.html` file
   * Copy the `writePost()` function from the `writePost.js` file and replace it in your `network-interface.js` file.
* Then add the form HTML template code from the `form.html` file under the HTML folder. Place this in your `post_interface` <div> or alternatively, in the `is_Owner()` function.
   * Customize the HTML structure to your liking.
* Finally add your custom CSS code. An empty `form.css` file is provided in the CSS folder. Alternatively, you can also use your current `style.css` file.


### Considerations:

* If your posting interface is not hidden out of the viewport, you can ignore the code from the `main.js` file. If your form interface is out of the viewport and you want to trigger it in view on click, you can use the jQuery code template from the `main.js` file to make that happen.
* Another consideration is to make sure you're using the right class names and IDs in your `index.html` file and your `loadPost()` and `writePost()` functions.
* If you want to use the submit button trigger from the `main.js` code, make sure you have the right CSS classes in place for that.



## Deployment

Deployment of this on a Live site depends on the [DataArchive API](https://beakerbrowser.com/docs/apis/dat). Obviously you already have this in place through the [Boilerplate](https://github.com/leigler/ni-boilerplate).

## Built With

* [Lukas's BoilerPlate](https://github.com/leigler/ni-boilerplate)
* [Classie.js](https://github.com/desandro/classie)
* [selectFix.js](http://static.qa.dealer.com/v8/global/js/jquery/selectfix/)
* [fullscreenForm](https://github.com/codrops/FullscreenForm/blob/master/js/fullscreenForm.js)

## Contributing

Please read [CONTRIBUTING.md](https://github.com/MrUltimate/Collab_PostingModule/tree/master) for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning

Current Version – 1.0.0

## Authors

* [ShivamSinha](https://github.com/MrUltimate)

See also the list of [contributors](https://github.com/MrUltimate/Collab_PostingModule/graphs/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* Hat tip to anyone whose code was used
