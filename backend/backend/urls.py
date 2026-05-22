from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import (
    TokenObtainPairView, # gera um token de autenticação quando faz login
    TokenRefreshView, # gera um novo token de acesso quando o antecessor é expirado
)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/token/', TokenObtainPairView.as_view()), # rota de login
    path('api/token/refresh', TokenRefreshView.as_view()), # rota de renovação
    path('api/users/', include('users.urls')),
]
