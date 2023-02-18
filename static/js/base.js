// Скрипт для выпадающего меню
$(document).ready(function () {
  $(".nav-item").hover(
    function () {
      $("ul", this).stop().slideDown(200);
    },
    function () {
      $("ul", this).stop().slideUp(200);
    }
  );
});
