$(document).ready(function() {

  //submit botton
  $(".more").click(function() {
    $(this).toggleClass("toggle");
    $('.submit').toggleClass("active");
  });

  toastr.options = {
    "closeButton": false,
    "debug": false,
    "newestOnTop": true,
    "progressBar": true,
    "positionClass": "toast-top-center",
    "preventDuplicates": true,
    "onclick": null,
    "showDuration": "50",
    "hideDuration": "50",
    "timeOut": "3000",
    "extendedTimeOut": "1000",
    "showEasing": "swing",
    "hideEasing": "swing",
    "showMethod": "slideDown",
    "hideMethod": "slideUp"
  }

  $("#myform").submit(function(e) {
    e.preventDefault();
  });

  function demo() {
    $('fs-submit').click(function() {
      console.log("post is posted!");
      toastr.success("Demo - Posted Successfully!");
      setTimeout(function() {
        $('.more').toggleClass("toggle");
        $('.submit').toggleClass("active");
      }, 500);
    });
  }

});
