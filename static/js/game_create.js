document.addEventListener("DOMContentLoaded", function () {
  // Получаем форму и поля формы
  const form = document.getElementById("game-create-form");
  const dateField = document.getElementById("date-input");
  const team1Field = document.getElementById("team1-input");
  const team2Field = document.getElementById("team2-input");
  const judgeField = document.getElementById("judge-input");
  const resultField = document.getElementById("result-input");

  // Обрабатываем отправку формы
  form.addEventListener("submit", function (event) {
    // Отменяем действие по умолчанию браузера
    event.preventDefault();

    // Получаем данные из полей формы
    const date = dateField.value;
    const team1 = team1Field.value;
    const team2 = team2Field.value;
    const judge = judgeField.value;
    const result = resultField.value;

    // Отправляем POST-запрос на сервер
    fetch("/games/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        date_of_the_match: date,
        teams: [team1, team2],
        main_judge: judge,
        result: result | null,
      }),
    })
      .then((response) => {
        if (response.ok) {
          alert("Матч успешно создан!");
          // Очищаем поля формы
          form.reset();
          // Редирект на страницу /games/
          window.location.replace("/games/");
        } else {
          throw new Error("Ошибка HTTP: " + response.status);
        }
      })
      .catch((error) => {
        console.error(error);
        alert("Произошла ошибка при создании матча.");
      });
  });
});
