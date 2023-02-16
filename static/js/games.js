document.addEventListener("DOMContentLoaded", function () {
  const detailsButtons = document.querySelectorAll(".details-button");
  const deleteButtons = document.querySelectorAll(".delete-button");

  detailsButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      const gameId = button.dataset.gameId;
      window.location.href = `/games/${gameId}/`;
    });
  });

  deleteButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      const gameId = button.dataset.gameId;
      if (confirm("Вы уверены, что хотите удалить этот матч?")) {
        fetch(`/games/${gameId}/`, {
          method: "DELETE",
        })
          .then(function () {
            location.reload();
          })
          .catch(function (error) {
            console.error("Error:", error);
          });
      }
    });
  });
});
