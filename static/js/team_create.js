$(document).ready(function () {
  $("#team-form").submit(function (event) {
    var name = $("#name").val();
    var country = $("#country").val();
    var city = $("#city").val();
    var coach = $("#coach").val();
    var points = $("#points").val();
    var gamesCount = $("#games-count").val();

    var regexLetters = /^[a-zA-Zа-яА-ЯёЁ ]+$/;
    var regexNumbers = /^[0-9]+$/;

    var titlesSelected = $("input[name='titles']:checked").length;

    if (!regexLetters.test(name)) {
      alert("В названии команды могут быть только буквы!");
      event.preventDefault();
    }
    if (!regexLetters.test(country)) {
      alert("В названии страны могут быть только буквы!");
      event.preventDefault();
    }
    if (!regexLetters.test(city)) {
      alert("В названии города могут быть только буквы!");
      event.preventDefault();
    }
    if (!regexLetters.test(coach)) {
      alert("В имени тренера могут быть только буквы!");
      event.preventDefault();
    }
    if (!regexNumbers.test(points) || points < 0) {
      alert("Очки могут быть только положительными целыми числами или нулем!");
      event.preventDefault();
    }
    if (!regexNumbers.test(gamesCount) || gamesCount < 0) {
      alert(
        "Количество игр может быть только положительным целым числом или нулем!"
      );
      event.preventDefault();
    }
    if (titlesSelected < 1) {
      alert("Выберите хотя бы один титул!");
      event.preventDefault();
    } else {
      window.location.replace("/teams/");
    }
  });
});
