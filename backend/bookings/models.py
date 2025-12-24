from django.db import models
from django.conf import settings
from django.core.validators import MinValueValidator, MaxValueValidator
import uuid
from django.utils import timezone

class Room(models.Model):
    ROOM_TYPES = [
        ('classic', 'Classic'),
        ('deluxe', 'Deluxe'),
        ('executive', 'Executive'),
        ('studio', 'Studio'),
        ('suite', 'Suite'), 
    ]
    
    ROOM_STATUS = [
        ('available', 'Available'),
        ('booked', 'Booked'),
        ('maintenance', 'Maintenance'),
    ]
    
    room_number = models.CharField(max_length=10, unique=True)
    room_type = models.CharField(max_length=50, choices=ROOM_TYPES)
    theme = models.CharField(max_length=100, blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    price_per_night = models.DecimalField(max_digits=10, decimal_places=2)
    max_capacity = models.IntegerField(default=2)
    status = models.CharField(max_length=20, choices=ROOM_STATUS, default='available')
    image = models.ImageField(upload_to='room_images/', blank=True, null=True)
    amenities = models.JSONField(default=list, blank=True)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['room_number']
    
    def __str__(self):
        return f"Room {self.room_number} - {self.get_room_type_display()}"
    
    def get_current_status(self):
        """
        Get the actual current status based on bookings.
        Priority: maintenance > active booking > available
        """
        # If manually set to maintenance, that overrides everything
        if self.status == 'maintenance':
            return 'maintenance'
        
        today = timezone.now().date()
        
        # Check if room has active bookings (guest is currently checked in)
        active_booking = self.bookings.filter(
            status__in=['pending', 'confirmed'],
            check_in__lte=today,
            check_out__gt=today
        ).exists()
        
        if active_booking:
            return 'booked'
        
        return 'available'
    
    def is_available_for_dates(self, check_in, check_out):
        """Check if room is available for specific date range"""
        if self.status == 'maintenance':
            return False
        
        # Check for overlapping bookings
        overlapping = self.bookings.filter(
            status__in=['pending', 'confirmed'],
            check_in__lt=check_out,
            check_out__gt=check_in
        ).exists()
        
        return not overlapping
    
    def get_next_available_date(self):
        """Get the next date this room becomes available"""
        if self.status == 'maintenance':
            return None
        
        today = timezone.now().date()
        
        # Get the latest checkout date from confirmed/pending bookings
        latest_booking = self.bookings.filter(
            status__in=['pending', 'confirmed'],
            check_out__gte=today
        ).order_by('-check_out').first()
        
        if latest_booking:
            return latest_booking.check_out
        
        return today


class Booking(models.Model):
    BOOKING_STATUS = [
        ('pending', 'Pending'),
        ('confirmed', 'Confirmed'),
        ('cancelled', 'Cancelled'),
        ('completed', 'Completed'),
    ]
    
    booking_reference = models.CharField(max_length=100, unique=True, default=uuid.uuid4)
    room = models.ForeignKey(Room, on_delete=models.CASCADE, related_name='bookings')
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, blank=True, related_name='bookings')
    
    guest_name = models.CharField(max_length=255)
    guest_email = models.EmailField()
    guest_phone = models.CharField(max_length=20)
    
    check_in = models.DateField()
    check_out = models.DateField()
    number_of_guests = models.IntegerField(
        default=1,
        validators=[MinValueValidator(1), MaxValueValidator(10)]
    )
    
    special_requests = models.TextField(blank=True, null=True)
    
    status = models.CharField(max_length=50, choices=BOOKING_STATUS, default='pending')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    total_amount = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    payment_status = models.CharField(max_length=20, default='pending')
    
    captcha_key = models.CharField(max_length=100, blank=True, null=True)
    
    class Meta:
        ordering = ['-created_at']
        indexes = [
            models.Index(fields=['guest_email']),
            models.Index(fields=['check_in', 'check_out']),
            models.Index(fields=['status']),
        ]
    
    def __str__(self):
        return f"Booking {self.booking_reference} - {self.guest_name}"
    
    def save(self, *args, **kwargs):
        if not self.booking_reference:
            self.booking_reference = str(uuid.uuid4())[:8].upper()
        
        if not self.total_amount and self.room:
            nights = (self.check_out - self.check_in).days
            self.total_amount = nights * self.room.price_per_night
        
        super().save(*args, **kwargs)
    
    @property
    def number_of_nights(self):
        return (self.check_out - self.check_in).days
    
    @property
    def is_active(self):
        today = timezone.now().date()
        return self.check_in <= today <= self.check_out and self.status == 'confirmed'
    
    @property
    def is_upcoming(self):
        today = timezone.now().date()
        return self.check_in > today and self.status == 'confirmed'
    
    @property
    def is_past(self):
        today = timezone.now().date()
        return self.check_out < today


class Captcha(models.Model):
    key = models.CharField(max_length=100, unique=True)
    image_base64 = models.TextField()
    solution = models.CharField(max_length=10)
    created_at = models.DateTimeField(auto_now_add=True)
    expires_at = models.DateTimeField()
    is_used = models.BooleanField(default=False)
    
    class Meta:
        ordering = ['-created_at']
    
    def __str__(self):
        return f"CAPTCHA {self.key}"
    
    def is_valid(self):
        return timezone.now() < self.expires_at and not self.is_used


class RoomAvailability(models.Model):
    room = models.ForeignKey(Room, on_delete=models.CASCADE, related_name='availabilities')
    date = models.DateField()
    is_available = models.BooleanField(default=True)
    price = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    
    class Meta:
        unique_together = ['room', 'date']
        ordering = ['date']
    
    def __str__(self):
        return f"{self.room.room_number} - {self.date}: {'Available' if self.is_available else 'Booked'}"