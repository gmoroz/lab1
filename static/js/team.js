window.onload = function () {
  const form = document.getElementById("team-form");
  const submitButton = form.querySelector('input[type="submit"]');
  submitButton.addEventListener("click", function (event) {
    event.preventDefault();
    const formData = new FormData(form);
    const teamId = window.location.pathname.split("/").filter(Boolean).pop();
    fetch(`/teams/${teamId}/`, {
      method: "PUT",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error(error));
  });
};
