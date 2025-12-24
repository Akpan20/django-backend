from django.core.management.base import BaseCommand
from decimal import Decimal
from bookings.models import Room

class Command(BaseCommand):
    help = 'Seeds the database with football-themed rooms'

    def add_arguments(self, parser):
        parser.add_argument(
            '--keep-existing',
            action='store_true',
            help='Keep existing rooms and only update/create new ones',
        )

    def handle(self, *args, **kwargs):
        keep_existing = kwargs.get('keep_existing', False)
        
        rooms_data = [
            {
                "room_number": "101",
                "name": "Studio 101",
                "room_type": "studio",
                "theme": "Arsenal",
                "description": "Experience the passion of Arsenal FC in this modern studio with red and white themed decor, Arsenal memorabilia, and a comfortable living space.",
                "price_per_night": Decimal("150.00"),
                "max_capacity": 2,
                "status": "available",
                "amenities": ["WiFi", "TV", "Air Conditioning", "Mini Bar", "Arsenal Memorabilia", "En-suite Bathroom"]
            },
            {
                "room_number": "102",
                "name": "Room 102",
                "room_type": "executive",
                "theme": "Barcelona",
                "description": "A luxurious executive twin room inspired by FC Barcelona's rich history. Features Blaugrana colors, premium bedding, and exclusive club artwork.",
                "price_per_night": Decimal("200.00"),
                "max_capacity": 4,
                "status": "available",
                "amenities": ["WiFi", "Smart TV", "Air Conditioning", "Mini Bar", "Work Desk", "Barcelona Memorabilia", "Premium Bathroom"]
            },
            {
                "room_number": "103",
                "name": "Room 103",
                "room_type": "classic",
                "theme": "Bayern Munich",
                "description": "Classic room showcasing Bayern Munich's championship legacy with deep red decor and German-inspired design elements.",
                "price_per_night": Decimal("120.00"),
                "max_capacity": 2,
                "status": "available",
                "amenities": ["WiFi", "TV", "Air Conditioning", "Bayern Munich Artwork", "En-suite Bathroom"]
            },
            {
                "room_number": "104",
                "name": "Suite 104",
                "room_type": "suite",
                "theme": "Chelsea",
                "description": "Premium suite with Chelsea FC theming, featuring separate living area, luxury amenities, and stunning blue decor throughout.",
                "price_per_night": Decimal("300.00"),
                "max_capacity": 2,
                "status": "available",
                "amenities": ["WiFi", "Smart TV", "Air Conditioning", "Mini Bar", "Living Area", "Work Desk", "Chelsea Memorabilia", "Jacuzzi", "Premium Bathroom"]
            },
            {
                "room_number": "105",
                "name": "Room 105",
                "room_type": "classic",
                "theme": "Inter Milan",
                "description": "Classic room celebrating Inter Milan with striking black and blue design, featuring club history and Italian style.",
                "price_per_night": Decimal("120.00"),
                "max_capacity": 2,
                "status": "available",
                "amenities": ["WiFi", "TV", "Air Conditioning", "Inter Milan Decor", "En-suite Bathroom"]
            },
            {
                "room_number": "106",
                "name": "Room 106",
                "room_type": "executive",
                "theme": "Liverpool",
                "description": "Executive room honoring Liverpool FC's legendary status with red-themed luxury decor and 'You'll Never Walk Alone' inspiration.",
                "price_per_night": Decimal("180.00"),
                "max_capacity": 2,
                "status": "available",
                "amenities": ["WiFi", "Smart TV", "Air Conditioning", "Mini Bar", "Work Desk", "Liverpool Memorabilia", "Premium Bathroom"]
            },
            {
                "room_number": "107",
                "name": "Room 107",
                "room_type": "classic",
                "theme": "Manchester City",
                "description": "Classic room featuring Manchester City's sky blue colors and modern design reflecting the club's contemporary success.",
                "price_per_night": Decimal("130.00"),
                "max_capacity": 2,
                "status": "available",
                "amenities": ["WiFi", "TV", "Air Conditioning", "City Artwork", "En-suite Bathroom"]
            },
            {
                "room_number": "108",
                "name": "Studio 108",
                "room_type": "studio",
                "theme": "Manchester United",
                "description": "Studio apartment celebrating Manchester United's rich heritage with red devil themed decor and championship memorabilia.",
                "price_per_night": Decimal("160.00"),
                "max_capacity": 2,
                "status": "available",
                "amenities": ["WiFi", "TV", "Air Conditioning", "Kitchenette", "United Memorabilia", "En-suite Bathroom"]
            },
            {
                "room_number": "109",
                "name": "Deluxe 109",
                "room_type": "deluxe",
                "theme": "Napoli",
                "description": "Deluxe room inspired by SSC Napoli with elegant sky blue decor, Italian craftsmanship, and southern Italian charm.",
                "price_per_night": Decimal("170.00"),
                "max_capacity": 2,
                "status": "available",
                "amenities": ["WiFi", "Smart TV", "Air Conditioning", "Mini Bar", "Balcony", "Napoli Artwork", "Premium Bathroom"]
            },
            {
                "room_number": "110",
                "name": "Executive 110",
                "room_type": "executive",
                "theme": "Real Madrid",
                "description": "Executive room embodying Real Madrid's royal elegance with pristine white and gold accents, luxury amenities, and club trophies display.",
                "price_per_night": Decimal("220.00"),
                "max_capacity": 2,
                "status": "available",
                "amenities": ["WiFi", "Smart TV", "Air Conditioning", "Mini Bar", "Work Desk", "Real Madrid Memorabilia", "Premium Bathroom", "Balcony"]
            },
        ]
        
        self.stdout.write(self.style.HTTP_INFO("\nStarting room seeding...\n"))
        
        # Delete existing rooms unless --keep-existing flag is used
        if not keep_existing:
            existing_count = Room.objects.count()
            if existing_count > 0:
                self.stdout.write(self.style.WARNING(f"🗑️  Deleting {existing_count} existing room(s)..."))
                Room.objects.all().delete()
                self.stdout.write(self.style.SUCCESS("✓ All existing rooms deleted\n"))
            else:
                self.stdout.write(self.style.NOTICE("No existing rooms to delete\n"))
        else:
            self.stdout.write(self.style.NOTICE("Keeping existing rooms (--keep-existing flag set)\n"))
        
        created_count = 0
        updated_count = 0
        
        for room_data in rooms_data:
            room, created = Room.objects.update_or_create(
                room_number=room_data['room_number'],
                defaults={
                    'room_type': room_data['room_type'],
                    'theme': room_data['theme'],
                    'description': room_data['description'],
                    'price_per_night': room_data['price_per_night'],
                    'max_capacity': room_data['max_capacity'],
                    'status': room_data['status'],
                    'amenities': room_data['amenities'],
                }
            )
            
            # Format output: Studio 101 | Theme: Arsenal | Type: Studio | Capacity: 2 guests
            room_type_display = room.get_room_type_display()
            output_line = f"{room_data['name']} | Theme: {room.theme} | Type: {room_type_display} | Capacity: {room.max_capacity} guest{'s' if room.max_capacity > 1 else ''}"
            
            if created:
                created_count += 1
                self.stdout.write(self.style.SUCCESS(f"✓ Created: {output_line}"))
            else:
                updated_count += 1
                self.stdout.write(self.style.WARNING(f"↻ Updated: {output_line}"))
        
        self.stdout.write("\n" + "="*70)
        self.stdout.write(self.style.SUCCESS(f"Seeding complete!"))
        self.stdout.write(f"Created: {created_count} rooms")
        self.stdout.write(f"Updated: {updated_count} rooms")
        self.stdout.write(f"Total rooms in database: {Room.objects.count()}")
        self.stdout.write("="*70 + "\n")