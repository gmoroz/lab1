document.addEventListener("DOMContentLoaded", function () {
  var form = document.querySelector("#title-form");
  form.addEventListener("submit", function (event) {
    event.preventDefault();
    var titleId = document.querySelector("#title-id").value;
    var name = document.querySelector("#name").value;
    var xhr = new XMLHttpRequest();
    xhr.open("PUT", "/titles/" + titleId + "/");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onload = function () {
      if (xhr.status === 200) {
        location.reload();
      } else {
        alert("Unable to update title.");
      }
    };
    xhr.send(JSON.stringify({ name: name }));
  });
});
