// Получаем форму и кнопку сохранения
const titleForm = document.getElementById("title-form");
const saveBtn = document.getElementById("save-btn");

// Обработчик события нажатия на кнопку сохранения
saveBtn.addEventListener("click", function (e) {
  e.preventDefault(); // Отменяем стандартное действие кнопки

  // Получаем данные формы
  const titleId = document.getElementById("title-id").value;
  const titleName = document.getElementById("name").value;

  // Отправляем PUT-запрос на сервер
  fetch(`/titles/${titleId}/`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "X-CSRFToken": "{{ csrf_token }}", // Передаем CSRF-токен для защиты от CSRF-атак
    },
    body: JSON.stringify({ name: titleName }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      console.log("Data saved:", data);
      // Дополнительные действия после успешного сохранения
    })
    .catch((error) => {
      console.error("Error saving data:", error);
      // Дополнительные действия при ошибке сохранения
    });
});
