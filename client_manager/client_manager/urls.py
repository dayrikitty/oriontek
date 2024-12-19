from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from clients.views import ClientViewSet, AddressViewSet
from authentication.views import CustomTokenObtainPairView

router = DefaultRouter()
router.register("clients", ClientViewSet)
router.register("addresses", AddressViewSet)

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/token/", CustomTokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("api/", include(router.urls)),
]
