# serializers.py
from rest_framework import serializers
from .models import Room, Booking, Captcha, RoomAvailability
from django.utils import timezone

class RoomSerializer(serializers.ModelSerializer):
    current_status = serializers.SerializerMethodField()
    next_available_date = serializers.SerializerMethodField()
    
    class Meta:
        model = Room
        fields = '__all__'
        read_only_fields = ['created_at', 'updated_at']
    
    def get_current_status(self, obj):
        """Return the dynamic status based on actual bookings"""
        return obj.get_current_status()
    
    def get_next_available_date(self, obj):
        """Return the next available date for this room"""
        next_date = obj.get_next_available_date()
        return next_date.isoformat() if next_date else None


class RoomAvailabilitySerializer(serializers.ModelSerializer):
    class Meta:
        model = RoomAvailability
        fields = '__all__'


class BookingSerializer(serializers.ModelSerializer):
    room_details = RoomSerializer(source='room', read_only=True)
    number_of_nights = serializers.ReadOnlyField()
    is_active = serializers.ReadOnlyField()
    is_upcoming = serializers.ReadOnlyField()
    is_past = serializers.ReadOnlyField()
    
    class Meta:
        model = Booking
        fields = '__all__'
        read_only_fields = ['booking_reference', 'created_at', 'updated_at', 'total_amount']
    
    def validate(self, data):
        if data['check_in'] >= data['check_out']:
            raise serializers.ValidationError("Check-out must be after check-in")
        
        if data['check_in'] < timezone.now().date():
            raise serializers.ValidationError("Check-in date cannot be in the past")
        
        if data['number_of_guests'] > data['room'].max_capacity:
            raise serializers.ValidationError(f"Room capacity is {data['room'].max_capacity} guests")
        
        # Check if room is available for the dates
        if not data['room'].is_available_for_dates(data['check_in'], data['check_out']):
            raise serializers.ValidationError("Room is not available for selected dates")
        
        return data


class BookingCreateSerializer(serializers.ModelSerializer):
    captcha_key = serializers.CharField(write_only=True, required=False)
    captcha_solution = serializers.CharField(write_only=True, required=False)
    
    class Meta:
        model = Booking
        fields = ['room', 'user', 'guest_name', 'guest_email', 'guest_phone', 
                  'check_in', 'check_out', 'number_of_guests', 'special_requests',
                  'captcha_key', 'captcha_solution']
    
    def validate(self, data):
        if not data.get('user'):
            if not data.get('captcha_key') or not data.get('captcha_solution'):
                raise serializers.ValidationError("CAPTCHA verification required for guest bookings")
            
            try:
                captcha = Captcha.objects.get(key=data['captcha_key'])
                if not captcha.is_valid():
                    raise serializers.ValidationError("CAPTCHA expired or already used")
                if captcha.solution.lower() != data['captcha_solution'].lower():
                    raise serializers.ValidationError("Invalid CAPTCHA solution")
                captcha.is_used = True
                captcha.save()
            except Captcha.DoesNotExist:
                raise serializers.ValidationError("Invalid CAPTCHA key")
        
        if data['check_in'] >= data['check_out']:
            raise serializers.ValidationError("Check-out must be after check-in")
        
        if data['check_in'] < timezone.now().date():
            raise serializers.ValidationError("Check-in date cannot be in the past")
        
        if data['number_of_guests'] > data['room'].max_capacity:
            raise serializers.ValidationError(f"Room capacity is {data['room'].max_capacity} guests")
        
        # Check if room is available for the dates
        if not data['room'].is_available_for_dates(data['check_in'], data['check_out']):
            raise serializers.ValidationError("Room is not available for selected dates")
        
        return data


class CaptchaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Captcha
        fields = ['key', 'image_base64', 'expires_at']
        read_only_fields = ['key', 'image_base64', 'expires_at']