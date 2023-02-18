const form = $("#game-form");
const dateField = $("#date_of_the_match");
const team1Field = $("#team1");
const team2Field = $("#team2");
const judgeField = $("#main_judge");
const resultField = $("#result");

const gameId = window.location.pathname.split("/").filter(Boolean).pop();

form.submit(function (event) {
  event.preventDefault();
  const data = {
    date_of_the_match: dateField.val(),
    teams: [team1Field.val(), team2Field.val()],
    main_judge: judgeField.val(),
    result: resultField.val() || null,
  };
  $.ajax({
    method: "PUT",
    url: `/games/${gameId}/`,
    data: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      "X-CSRFToken": form.find('input[name="csrfmiddlewaretoken"]').val(),
    },
  })
    .done(function (data) {
      console.log("Success:", data);
      alert("Game updated successfully!");
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
      console.error("Error:", textStatus, errorThrown);
      alert("An error occurred while updating the game.");
    });
});
