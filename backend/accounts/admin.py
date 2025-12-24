from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User

class CustomUserAdmin(UserAdmin):
    # Add your custom fields (phone_number) to the admin forms
    fieldsets = UserAdmin.fieldsets + (
        (None, {'fields': ('phone_number',)}),
    )
    add_fieldsets = UserAdmin.add_fieldsets + (
        (None, {'fields': ('phone_number',)}),
    )
    list_display = ['username', 'email', 'phone_number', 'is_staff', 'is_active']

admin.site.register(User, CustomUserAdmin)