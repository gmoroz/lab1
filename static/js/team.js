$(document).ready(function () {
  const teamId = window.location.pathname.split("/").filter(Boolean).pop();

  $("#team-form").on("submit", function (event) {
    event.preventDefault();
    const formData = $(this).serialize();

    $.ajax({
      type: "PUT",
      url: `/teams/${teamId}/`,
      data: formData,
      beforeSend: function (xhr, settings) {
        const csrftoken = $('input[name="csrfmiddlewaretoken"]').val();
        xhr.setRequestHeader("X-CSRFToken", csrftoken);
      },
      success: function (response) {
        alert("Команда успешно сохранена!");
      },
      error: function (response) {
        alert("Произошла ошибка при сохранении команды");
      },
    });
  });
});
