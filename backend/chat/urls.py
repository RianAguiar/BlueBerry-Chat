from django.urls import path
from .views import SalaAPIView
from .views import MensagensAPIView

urlpatterns = [
    path("", SalaAPIView.as_view(), name="Index"),
    path("sala/<int:chat_id>/", MensagensAPIView.as_view(), name="Sala"),
]
