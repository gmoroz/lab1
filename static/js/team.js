$(document).ready(function () {
  const teamId = window.location.pathname.split("/").filter(Boolean).pop();

  $("#team-form").on("submit", function (event) {
    event.preventDefault();

    // Validate the team name field
    const teamNameField = $("#name");
    const teamNameValue = teamNameField.val();
    if (!/^[a-zA-Zа-яА-ЯёЁ\s]+$/.test(teamNameValue)) {
      alert("В названии команды могут быть только буквы!");
      return false;
    }

    // Validate the country field
    const countryField = $("#country");
    const countryValue = countryField.val();
    if (!/^[a-zA-Zа-яА-ЯёЁ\s]+$/.test(countryValue)) {
      alert("В названии страны могут быть только буквы!");
      return false;
    }

    // Validate the city field
    const cityField = $("#city");
    const cityValue = cityField.val();
    if (!/^[a-zA-Zа-яА-ЯёЁ\s]+$/.test(cityValue)) {
      alert("В названии города могут быть только буквы!");
      return false;
    }

    // Validate the coach field
    const coachField = $("#coach");
    const coachValue = coachField.val();
    if (!/^[a-zA-Zа-яА-ЯёЁ\s]+$/.test(coachValue)) {
      alert("В имени тренера могут быть только буквы!");
      return false;
    }

    // Validate the points field
    const pointsField = $("#points");
    const pointsValue = pointsField.val();
    if (pointsValue < 0) {
      alert("Очки могут быть только положительными целыми числами или нулем!");
      return false;
    }

    // Validate the games count field
    const gamesCountField = $("#games-count");
    const gamesCountValue = gamesCountField.val();
    if (gamesCountValue < 0) {
      alert(
        "Количество игр может быть только положительным целым числом или нулем!"
      );
      return false;
    }

    const formData = $(this).serialize();

    $.ajax({
      type: "PUT",
      url: `/teams/${teamId}/`,
      data: formData,
      beforeSend: function (xhr, settings) {
        const csrftoken = $('input[name="csrfmiddlewaretoken"]').val();
        xhr.setRequestHeader("X-CSRFToken", csrftoken);
      },
      success: function (response) {
        alert("Команда успешно сохранена!");
      },
      error: function (response) {
        alert("Произошла ошибка при сохранении команды");
      },
    });
  });
});
