$(function () {
  $(".delete-button").click(function () {
    var gameId = $(this).data("game-id");
    var csrfToken = Cookies.get("csrftoken");
    var confirmation = confirm("Вы уверены, что хотите удалить этот матч?");
    if (confirmation) {
      $.ajax({
        url: "/games/" + gameId + "/",
        method: "DELETE",
        headers: { "X-CSRFToken": csrfToken },
        success: function () {
          location.reload();
        },
        error: function () {
          alert("Не удалось удалить матч");
        },
      });
    }
  });
});
