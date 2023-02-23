$(document).ready(function () {
  $(".btn-chat").click(function () {
    var chatName = $(this).data("name");
    window.location.href = "/chat/" + chatName + "/";
  });

  $(".btn-delete").click(function () {
    var chatName = $(this).data("name");
    var chatCreator = $(this).data("creator");
    var csrfToken = $("input[name='csrfmiddlewaretoken']").val(); // получаем csrf_token из формы
    var confirmDelete = confirm(
      "Вы действительно хотите удалить чат, созданный пользователем " +
        chatCreator +
        "?"
    );
    if (confirmDelete) {
      $.ajax({
        url: "/chats/" + chatName + "/",
        type: "DELETE",
        beforeSend: function (xhr) {
          xhr.setRequestHeader("X-CSRFToken", csrfToken); // добавляем csrf_token в заголовок запроса
        },
        success: function () {
          alert("Чат успешно удален!");
          window.location.reload();
        },
        error: function (xhr, status, error) {
          alert("Произошла ошибка при удалении чата: " + error);
        },
      });
    }
  });
});
