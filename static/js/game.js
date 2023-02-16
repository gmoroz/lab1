document
  .getElementById("game-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    var xhr = new XMLHttpRequest();
    var gameId = window.location.pathname.split("/").filter(Boolean).pop();
    xhr.open("PUT", "/games/" + gameId + "/");
    xhr.setRequestHeader("Content-Type", "application/json");

    var formData = new FormData(document.getElementById("game-form"));
    var formDataObj = Object.fromEntries(formData.entries());
    var teams = [formDataObj["team1"], formDataObj["team2"]];
    var gameData = {
      date_of_the_match: formDataObj["date_of_the_match"],
      teams: teams,
      main_judge: formDataObj["main_judge"],
      result: formDataObj["result"],
    };
    var data = JSON.stringify(gameData);

    xhr.onload = function () {
      if (xhr.status === 200) {
        alert("Изменения успешно сохранены");
      } else {
        alert("Произошла ошибка при сохранении");
      }
    };

    xhr.send(data);
  });
