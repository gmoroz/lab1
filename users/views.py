from django.contrib.auth import authenticate, login
from django.urls import reverse_lazy
from django.views.generic import FormView

from .forms import LoginForm, RegistrationForm


class LoginView(FormView):
    form_class = LoginForm
    template_name = "auth.html"
    success_url = reverse_lazy("main")

    def form_valid(self, form):
        username = form.cleaned_data["username"]
        password = form.cleaned_data["password"]
        user = authenticate(self.request, username=username, password=password)
        if user is not None:
            login(self.request, user)
            return super().form_valid(form)
        else:
            form.add_error(None, "Invalid username or password")
            return super().form_invalid(form)


class RegisterView(FormView):
    form_class = RegistrationForm
    template_name = "auth.html"
    success_url = reverse_lazy("main")

    def form_valid(self, form):
        form.save()
        username = form.cleaned_data["username"]
        password = form.cleaned_data["password1"]
        user = authenticate(self.request, username=username, password=password)
        if user is not None:
            login(self.request, user)
            return super().form_valid(form)
        else:
            form.add_error(None, "Invalid username or password")
            return super().form_invalid(form)
