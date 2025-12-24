# urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import RoomViewSet, BookingViewSet, CaptchaViewSet, RoomAvailabilityViewSet

router = DefaultRouter()
router.register(r'rooms', RoomViewSet, basename='room')
router.register(r'captcha', CaptchaViewSet, basename='captcha')
router.register(r'availability', RoomAvailabilityViewSet, basename='availability')
router.register(r'', BookingViewSet, basename='booking')

urlpatterns = [
    path('', include(router.urls)),
]