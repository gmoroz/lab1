$saveBtn.on("click", function (e) {
  e.preventDefault(); // Отменяем стандартное действие кнопки

  // Получаем данные формы
  const titleId = $("#title-id").val();
  const titleName = $("#name").val();

  // Проверяем наличие только букв в названии титула
  const regex = /^[a-zA-Zа-яА-ЯёЁ\s]+$/;
  if (!regex.test(titleName)) {
    alert("В названии титула могут быть только буквы!");
    return; // Остановить выполнение функции
  }

  // Отправляем PUT-запрос на сервер
  $.ajax({
    url: `/titles/${titleId}/`,
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "X-CSRFToken": $titleForm.find('input[name="csrfmiddlewaretoken"]').val(), // Получаем CSRF-токен из скрытого поля формы
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
