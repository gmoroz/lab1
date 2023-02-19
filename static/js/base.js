$(document).ready(function () {
  $(".nav-item").hover(
    function () {
      $(this).find("ul").stop(true, true).slideDown(400);
    },
    function () {
      setTimeout(() => {
        $(this).find("ul").stop(true, true).slideUp(400);
      }, 100);
    }
  );
});
