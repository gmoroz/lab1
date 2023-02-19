$(document).ready(function () {
  // Отслеживаем наведение мыши на навигационное меню
  $('.navbar-nav .dropdown').hover(
    function () {
      // Показываем выпадающее меню
      $(this).find('.dropdown-menu').first().stop(true, true).delay(150).slideDown();

    },
    function () {
      // Скрываем выпадающее меню
      $(this).find('.dropdown-menu').first().stop(true, true).delay(100).slideUp();

    }
  );

  // Запрещаем закрытие меню при щелчке на элементах выпадающего списка
  $('.navbar-nav .dropdown-menu').click(function (e) {
    e.stopPropagation();
  });
});
