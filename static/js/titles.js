document.addEventListener("DOMContentLoaded", function () {
  var deleteButtons = document.querySelectorAll(".delete-button");

  deleteButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      var titleId = button.dataset.titleId;

      if (confirm("Вы уверены, что хотите удалить этот титул?")) {
        var xhr = new XMLHttpRequest();

        xhr.open("DELETE", "/titles/" + titleId + "/");

        xhr.onload = function () {
          if (xhr.status === 200) {
            location.reload();
          }
        };

        xhr.send();
      }
    });
  });
});
