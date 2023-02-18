$(document).ready(function () {
  // Получаем форму и кнопку сохранения
  const $titleForm = $("#title-form");
  const $saveBtn = $(".save-btn");

  // Обработчик события нажатия на кнопку сохранения
  $saveBtn.on("click", function (e) {
    e.preventDefault(); // Отменяем стандартное действие кнопки

    // Получаем данные формы
    const titleId = $("#title-id").val();
    const titleName = $("#name").val();

    // Отправляем PUT-запрос на сервер
    $.ajax({
      url: `/titles/${titleId}/`,
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": $titleForm
          .find('input[name="csrfmiddlewaretoken"]')
          .val(), // Получаем CSRF-токен из скрытого поля формы
      },
      data: JSON.stringify({ name: titleName }),
      success: function (data) {
        console.log("Data saved:", data);
        // Дополнительные действия после успешного сохранения
      },
      error: function (xhr, status, error) {
        console.error("Error saving data:", error);
        // Дополнительные действия при ошибке сохранения
      },
    });
  });
});
