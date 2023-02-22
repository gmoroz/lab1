$(document).ready(function () {
  // Находим форму и кнопку отправки
  const $titleForm = $("#title-form");
  const $saveBtn = $(".save-btn");

  // Добавляем обработчик на отправку формы
  $titleForm.on("submit", function (event) {
    event.preventDefault(); // Отменяем стандартное поведение формы

    // Получаем данные формы
    const titleId = $("#title-id").val();
    const titleName = $("#name").val();

    const regex = /^[a-zA-Zа-яА-ЯёЁ\s]+$/;
    if (!regex.test(titleName)) {
      alert("В названии титула могут быть только буквы!");
      return; // Остановить выполнение функции
    }
    // Отправляем PUT-запрос на сервер
    $.ajax({
      url: `/titles/${titleId}/`,
      type: "PUT",
      headers: {
        "X-CSRFToken": $titleForm
          .find('input[name="csrfmiddlewaretoken"]')
          .val(), // Получаем CSRF-токен из скрытого поля формы
      },
      data: {
        name: titleName,
      },
      success: function (data) {
        console.log("Данные успешно сохранены:", data);
        // Выводим сообщение об успешном сохранении
        alert("Данные успешно сохранены!");
        // Редирект на страницу со списком титулов
        window.location.href = "/titles/";
      },
      error: function (xhr, status, error) {
        console.error("Ошибка при сохранении данных:", error);
        // Выводим сообщение об ошибке
        alert("Ошибка при сохранении данных!");
      },
    });
  });
});
