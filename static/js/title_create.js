$(document).ready(function () {
  // Получаем форму и кнопку сохранения
  const $titleForm = $("#title-form");
  const $saveBtn = $(".save-btn");

  // Обработчик события нажатия на кнопку сохранения
  $saveBtn.on("click", function (e) {
    e.preventDefault(); // Отменяем стандартное действие кнопки// Получаем данные формы
    const titleName = $("#name").val();

    // Проверяем, что titleName состоит только из букв и пробелов
    if (/^[a-zA-Zа-яА-ЯёЁ\s]+$/.test(titleName)) {
      // Отправляем POST-запрос на сервер
      $.ajax({
        url: "/titles/",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": $titleForm
            .find('input[name="csrfmiddlewaretoken"]')
            .val(), // Получаем CSRF-токен из скрытого поля формы
        },
        data: JSON.stringify({ name: titleName }),
        success: function (data, status, xhr) {
          console.log("Data saved:", data);
          // Проверяем код статуса ответа
          if (xhr.status === 201) {
            alert("Титул успешно создан");
            window.location.href = "/titles/"; // Перенаправляем пользователя на /titles/
          }
        },
        error: function (xhr, status, error) {
          console.error("Error saving data:", error);
          // Дополнительные действия при ошибке сохранения
        },
      });
    } else {
      // Выводим сообщение об ошибке, если в названии титула содержатся недопустимые символы
      alert("В названии титула могут быть только буквы!");
    }
  });
});
