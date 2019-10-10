from django.contrib import admin

# Register your models here.
from myapp.models import FavoriteStocks
from myapp.models import Notifications
admin.site.register(FavoriteStocks)
admin.site.register(Notifications)