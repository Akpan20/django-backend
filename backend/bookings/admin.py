from django.contrib import admin
from .models import Room

@admin.register(Room)
class BookingsAdmin(admin.ModelAdmin):
    list_display = ('theme', 'price_per_night')
