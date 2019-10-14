from django.conf.urls import url, include
from django.contrib.auth.models import User
from rest_framework import routers, serializers, viewsets

# Serializers define the API representation.
from myapp.models import FavoriteStocks


class FavoriteStocksSerializer(serializers.ModelSerializer):
    class Meta:
        model = FavoriteStocks
        fields = ['id', 'username', 'stock']