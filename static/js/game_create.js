$(document).ready(function () {
  // Получаем форму и поля формы
  const form = $("#game-create-form");
  const dateField = $("#date-input");
  const team1Field = $("#team1-input");
  const team2Field = $("#team2-input");
  const judgeField = $("#judge-input");
  const resultField = $("#result-input");

  // Обрабатываем отправку формы
  form.submit(function (event) {
    // Отменяем действие по умолчанию браузера
    event.preventDefault();

    // Получаем данные из полей формы
    const date = dateField.val();
    const team1 = team1Field.val();
    const team2 = team2Field.val();
    const judge = judgeField.val();
    const result = resultField.val();

    // Получаем токен
    const csrfToken = $("[name=csrfmiddlewaretoken]").val();

    // Отправляем POST-запрос на сервер
    $.ajax({
      url: "/games/",
      type: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": csrfToken, // добавляем токен в заголовок запроса
      },
      data: JSON.stringify({
        date_of_the_match: date,
        teams: [team1, team2],
        main_judge: judge,
        result: result | null,
      }),
      success: function () {
        alert("Матч успешно создан!");
        // Очищаем поля формы
        form[0].reset();
        // Редирект на страницу /games/
        window.location.replace("/games/");
      },
      error: function (error) {
        console.error(error);
        alert("Произошла ошибка при создании матча.");
      },
    });
  });
});
