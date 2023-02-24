$(document).ready(function () {
  var error = $("#error").val();
  if (error !== null && error !== "") {
    alert(error);
  }

  $("form").submit(function (event) {
    var username = $("#username").val();
    var password = $("#password").val();
    var confirm_password = $("#confirm_password").val();

    var username_regex = /^[a-zA-Z_]+$/;
    var password_regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d_]{8,}$/;

    if (!username_regex.test(username)) {
      alert(
        "Имя пользователя может состоять только из латинских букв и символа нижнего подчеркивания."
      );
      event.preventDefault();
    }

    if (!password_regex.test(password)) {
      alert(
        "Пароль должен состоять минимум из 8 символов, содержать хотя бы одну заглавную букву и состоять только из латинских букв, цифр и символа нижнего подчеркивания."
      );
      event.preventDefault();
    }

    if (password != confirm_password) {
      alert("Пароли не совпадают.");
      event.preventDefault();
    }
  });
});
