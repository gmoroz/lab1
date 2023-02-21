const form = $("#game-form");
const dateField = $("#date_of_the_match");
const team1Field = $("#team1");
const team2Field = $("#team2");
const judgeField = $("#main_judge");
const resultField = $("#result");

const gameId = window.location.pathname.split("/").filter(Boolean).pop();

form.submit(function (event) {
  // Отменяем действие по умолчанию браузера
  event.preventDefault();
  // Получаем данные из полей формы
  const date = dateField.val();
  const team1 = team1Field.val();
  const team2 = team2Field.val();
  const judge = judgeField.val();
  const result = resultField.val();
  // Проверяем, что команды не одинаковые
  if (team1 === team2) {
    alert("Нельзя выбрать две одинаковые команды.");
    return;
  }

  // Проверяем, что дата не в будущем и если так, то результат должен быть пустым
  const today = new Date().toISOString().slice(0, 10);
  if (date > today && result !== "") {
    alert("Нельзя поставить результат для матча в будущем!");
    return;
  }
  // Проверяем, что результат задан в формате "число-число"
  const regexResult = /^\d+-\d+$/;
  if (result !== "" && !regexResult.test(result)) {
    alert('Результат должен быть в формате "число-число".');
    return;
  }

  // Проверяем, что в имени судьи только буквы и пробелы
  const regexJudge = /^[a-zA-Zа-яА-Я ]+$/;
  if (!regexJudge.test(judge)) {
    alert("В имени судьи должны быть только буквы.");
    return;
  }

  const data = {
    date_of_the_match: dateField.val(),
    teams: [team1Field.val(), team2Field.val()],
    main_judge: judgeField.val(),
    result: resultField.val() || null,
  };
  $.ajax({
    method: "PUT",
    url: `/games/${gameId}/`,
    data: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      "X-CSRFToken": form.find('input[name="csrfmiddlewaretoken"]').val(),
    },
  })
    .done(function (data) {
      console.log("Success:", data);
      alert("Игра обновлена успешно!");
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
      console.error("Error:", textStatus, errorThrown);
      alert("Произошла ошибка при создании матча.");
    });
});
