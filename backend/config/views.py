# config/views.py
from datetime import timezone
from django.db import connection
from django.views import View
from django.http import JsonResponse

def home(request):
    return JsonResponse({"message": "Welcome to Sample Hotel API"})

class HealthCheckView(View):
    def get(self, request):
        # Check database connection
        try:
            with connection.cursor() as cursor:
                cursor.execute("SELECT 1")
            db_status = "healthy"
        except Exception as e:
            db_status = f"unhealthy: {str(e)}"
        
        return JsonResponse({
            "status": "ok",
            "timestamp": timezone.now().isoformat(),
            "database": db_status,
            "service": "django-backend"
        })
