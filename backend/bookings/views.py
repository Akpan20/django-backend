# views.py
from rest_framework import viewsets, status, permissions
from rest_framework.decorators import action
from rest_framework.response import Response
from django.utils import timezone
from datetime import timedelta
from .models import Room, Booking, Captcha, RoomAvailability
from .serializers import (
    RoomSerializer, BookingSerializer, BookingCreateSerializer,
    CaptchaSerializer, RoomAvailabilitySerializer
)
import random
import string
import base64
from io import BytesIO
from PIL import Image, ImageDraw, ImageFont
import os

class RoomViewSet(viewsets.ModelViewSet):
    queryset = Room.objects.all()
    serializer_class = RoomSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    
    @action(detail=False, methods=['get'])
    def available(self, request):
        check_in = request.query_params.get('check_in')
        check_out = request.query_params.get('check_out')
        guests = request.query_params.get('guests', 1)
        room_type = request.query_params.get('room_type')
        
        rooms = Room.objects.filter(status='available')
        
        if guests:
            rooms = rooms.filter(max_capacity__gte=int(guests))
        
        if room_type:
            rooms = rooms.filter(room_type=room_type)
        
        if check_in and check_out:
            booked_rooms = Booking.objects.filter(
                status__in=['pending', 'confirmed'],
                check_in__lt=check_out,
                check_out__gt=check_in
            ).values_list('room_id', flat=True)
            
            rooms = rooms.exclude(id__in=booked_rooms)
        
        serializer = self.get_serializer(rooms, many=True)
        return Response(serializer.data)
    
    @action(detail=True, methods=['get'])
    def availability(self, request, pk=None):
        room = self.get_object()
        start_date = request.query_params.get('start_date')
        end_date = request.query_params.get('end_date')
        
        if not start_date or not end_date:
            return Response(
                {'error': 'start_date and end_date required'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        bookings = Booking.objects.filter(
            room=room,
            status__in=['pending', 'confirmed'],
            check_in__lte=end_date,
            check_out__gte=start_date
        ).values('check_in', 'check_out')
        
        return Response({
            'room': room.room_number,
            'bookings': list(bookings)
        })

class BookingViewSet(viewsets.ModelViewSet):
    queryset = Booking.objects.all()
    serializer_class = BookingSerializer
    permission_classes = [permissions.AllowAny]
    
    def get_serializer_class(self):
        if self.action == 'create':
            return BookingCreateSerializer
        return BookingSerializer
    
    def get_queryset(self):
        queryset = Booking.objects.all()
        
        if self.request.user.is_authenticated:
            if not self.request.user.is_staff:
                queryset = queryset.filter(user=self.request.user)
        else:
            email = self.request.query_params.get('email')
            booking_ref = self.request.query_params.get('booking_reference')
            
            if email and booking_ref:
                queryset = queryset.filter(
                    guest_email=email,
                    booking_reference=booking_ref
                )
            else:
                queryset = queryset.none()
        
        return queryset
    
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        
        booking = serializer.instance
        response_serializer = BookingSerializer(booking)
        
        return Response(
            response_serializer.data,
            status=status.HTTP_201_CREATED
        )
    
    @action(detail=True, methods=['post'])
    def cancel(self, request, pk=None):
        booking = self.get_object()
        
        if booking.status == 'cancelled':
            return Response(
                {'error': 'Booking already cancelled'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        if booking.status == 'completed':
            return Response(
                {'error': 'Cannot cancel completed booking'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        booking.status = 'cancelled'
        booking.save()
        
        serializer = self.get_serializer(booking)
        return Response(serializer.data)
    
    @action(detail=True, methods=['post'])
    def confirm(self, request, pk=None):
        if not request.user.is_staff:
            return Response(
                {'error': 'Permission denied'},
                status=status.HTTP_403_FORBIDDEN
            )
        
        booking = self.get_object()
        booking.status = 'confirmed'
        booking.save()
        
        serializer = self.get_serializer(booking)
        return Response(serializer.data)
    
    @action(detail=False, methods=['get'])
    def my_bookings(self, request):
        if not request.user.is_authenticated:
            return Response(
                {'error': 'Authentication required'},
                status=status.HTTP_401_UNAUTHORIZED
            )
        
        bookings = Booking.objects.filter(user=request.user)
        serializer = self.get_serializer(bookings, many=True)
        return Response(serializer.data)

class CaptchaViewSet(viewsets.ViewSet):
    permission_classes = [permissions.AllowAny]
    
    def _generate_captcha_image(self, text):
        """Generate a CAPTCHA image using Pillow"""
        width, height = 280, 90
        image = Image.new('RGB', (width, height), color='white')
        draw = ImageDraw.Draw(image)
        
        # Try to load fonts, fall back to default if not available
        font_paths = [
            '/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf',
            '/usr/share/fonts/truetype/liberation/LiberationSans-Bold.ttf',
            '/usr/share/fonts/truetype/ubuntu/Ubuntu-B.ttf',
            'arial.ttf'
        ]
        
        font = None
        font_size = 40
        
        for font_path in font_paths:
            try:
                if os.path.exists(font_path):
                    font = ImageFont.truetype(font_path, font_size)
                    break
            except:
                continue
        
        if font is None:
            # Use default font
            font = ImageFont.load_default()
            # Adjust for default font size
            font_size = 20
        
        # Calculate text size and position
        try:
            # Try to get text bbox (works with most fonts)
            bbox = draw.textbbox((0, 0), text, font=font)
            text_width = bbox[2] - bbox[0]
            text_height = bbox[3] - bbox[1]
        except:
            # Fallback
            text_width = len(text) * font_size
            text_height = font_size
        
        x = (width - text_width) // 2
        y = (height - text_height) // 2
        
        # Draw the text
        draw.text((x, y), text, fill='black', font=font)
        
        # Add noise (random lines and dots)
        for _ in range(10):
            # Add random lines
            x1 = random.randint(0, width)
            y1 = random.randint(0, height)
            x2 = random.randint(0, width)
            y2 = random.randint(0, height)
            draw.line([(x1, y1), (x2, y2)], fill='gray', width=1)
            
            # Add random dots
            for _ in range(5):
                x_dot = random.randint(0, width)
                y_dot = random.randint(0, height)
                draw.point((x_dot, y_dot), fill='lightgray')
        
        # Add random arcs
        for _ in range(3):
            x1 = random.randint(0, width // 2)
            y1 = random.randint(0, height // 2)
            x2 = random.randint(width // 2, width)
            y2 = random.randint(height // 2, height)
            draw.arc([x1, y1, x2, y2], 0, 360, fill='lightblue', width=1)
        
        # Save to bytes
        buffer = BytesIO()
        image.save(buffer, format='PNG')
        return base64.b64encode(buffer.getvalue()).decode('utf-8')
    
    def create(self, request):
        """Generate a new CAPTCHA"""
        # Generate random CAPTCHA text (avoid confusing characters like 0/O, 1/l/I)
        chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
        solution = ''.join(random.choices(chars, k=6))
        
        # Generate a unique key
        key = ''.join(random.choices(string.ascii_lowercase + string.digits, k=32))
        
        # Generate CAPTCHA image
        image_base64 = self._generate_captcha_image(solution)
        
        # Set expiration (10 minutes from now)
        expires_at = timezone.now() + timedelta(minutes=10)
        
        # Create CAPTCHA record
        captcha = Captcha.objects.create(
            key=key,
            image_base64=image_base64,
            solution=solution,
            expires_at=expires_at
        )
        
        serializer = CaptchaSerializer(captcha)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
    @action(detail=False, methods=['post'])
    def verify(self, request):
        """Verify a CAPTCHA response"""
        key = request.data.get('key')
        solution = request.data.get('solution')
        
        if not key or not solution:
            return Response(
                {'error': 'Key and solution required'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        try:
            captcha = Captcha.objects.get(key=key)
            
            # Check if CAPTCHA is still valid
            if timezone.now() > captcha.expires_at:
                captcha.delete()  # Clean up expired CAPTCHA
                return Response(
                    {'valid': False, 'error': 'CAPTCHA has expired'},
                    status=status.HTTP_400_BAD_REQUEST
                )
            
            if captcha.is_used:
                return Response(
                    {'valid': False, 'error': 'CAPTCHA has already been used'},
                    status=status.HTTP_400_BAD_REQUEST
                )
            
            # Verify solution (case insensitive)
            if captcha.solution.lower() == solution.strip().lower():
                # Mark as used
                captcha.is_used = True
                captcha.save()
                
                return Response({'valid': True})
            else:
                return Response(
                    {'valid': False, 'error': 'Invalid CAPTCHA solution'},
                    status=status.HTTP_400_BAD_REQUEST
                )
        
        except Captcha.DoesNotExist:
            return Response(
                {'valid': False, 'error': 'Invalid CAPTCHA key'},
                status=status.HTTP_400_BAD_REQUEST
            )
    
    @action(detail=False, methods=['post'])
    def refresh(self, request):
        """Refresh/regenerate a CAPTCHA"""
        old_key = request.data.get('key')
        
        # If old key provided, mark it as used
        if old_key:
            try:
                old_captcha = Captcha.objects.get(key=old_key)
                old_captcha.is_used = True
                old_captcha.save()
            except Captcha.DoesNotExist:
                pass  # Ignore if old key doesn't exist
        
        # Generate new CAPTCHA
        return self.create(request)

class RoomAvailabilityViewSet(viewsets.ModelViewSet):
    queryset = RoomAvailability.objects.all()
    serializer_class = RoomAvailabilitySerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    
    @action(detail=False, methods=['post'])
    def bulk_update(self, request):
        """Bulk update room availability for a date range"""
        room_ids = request.data.get('room_ids', [])
        start_date = request.data.get('start_date')
        end_date = request.data.get('end_date')
        is_available = request.data.get('is_available', True)
        
        if not room_ids or not start_date or not end_date:
            return Response(
                {'error': 'room_ids, start_date, and end_date required'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # Convert string dates to date objects
        from datetime import datetime
        start = datetime.strptime(start_date, '%Y-%m-%d').date()
        end = datetime.strptime(end_date, '%Y-%m-%d').date()
        
        # Get all dates in range
        date_range = []
        current = start
        while current <= end:
            date_range.append(current)
            current += timedelta(days=1)
        
        # Create or update availability records
        created_count = 0
        updated_count = 0
        
        for room_id in room_ids:
            for date in date_range:
                obj, created = RoomAvailability.objects.update_or_create(
                    room_id=room_id,
                    date=date,
                    defaults={'is_available': is_available}
                )
                
                if created:
                    created_count += 1
                else:
                    updated_count += 1
        
        return Response({
            'message': f'Updated availability for {len(room_ids)} rooms',
            'dates_updated': len(date_range),
            'records_created': created_count,
            'records_updated': updated_count
        })