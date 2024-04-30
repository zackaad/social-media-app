from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path("admin/", admin.site.urls),
    path("auth/", include('social_auth.urls')),
    path("feed/", include('social_co.urls'))
]
