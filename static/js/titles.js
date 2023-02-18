document.addEventListener("DOMContentLoaded", function () {
  var deleteButtons = document.querySelectorAll(".delete-button");

  deleteButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      var titleId = button.dataset.titleId;

      if (confirm("Вы уверены, что хотите удалить этот титул?")) {
        var xhr = new XMLHttpRequest();
        var csrfToken = document.getElementsByName("csrfmiddlewaretoken")[0]
          .value;
        xhr.open("DELETE", "/titles/" + titleId + "/");

        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.setRequestHeader("X-CSRFToken", csrfToken);
        xhr.onload = function () {
          if (xhr.status === 204) {
            location.reload();
          }
        };

        xhr.send();
      }
    });
  });
});
