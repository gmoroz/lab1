$(document).ready(function () {
  $(".nav-item").hover(
    function () {
      $(this).find("ul").stop(true, true).slideDown(200);
    },
    function () {
      $(this).find("ul").stop(true, true).slideUp(200);
    }
  );
});
