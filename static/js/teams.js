function confirmDelete(teamId) {
  if (confirm("Вы точно хотите удалить эту команду?")) {
    fetch(`/teams/${teamId}`, {
      method: "DELETE",
    }).then((response) => {
      if (response.ok) {
        window.location.reload();
      }
    });
  }
}
