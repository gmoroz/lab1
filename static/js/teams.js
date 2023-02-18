function confirmDelete(teamId) {
  if (confirm("Вы точно хотите удалить эту команду?")) {
    // Получаем csrf-токен из cookies
    const csrftoken = Cookies.get("csrftoken");
    // Отправляем запрос с csrf-токеном
    $.ajax({
      url: `/teams/${teamId}`,
      type: "DELETE",
      beforeSend: function (xhr) {
        xhr.setRequestHeader("X-CSRFToken", csrftoken);
      },
      success: function () {
        window.location.reload();
      },
    });
  }
}
