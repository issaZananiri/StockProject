from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Stock(models.Model):
	symbol = models.CharField(max_length=12, primary_key=True)
	name = models.CharField(max_length=64)
	top_rank = models.IntegerField(null=True)
	price = models.FloatField()
	change = models.FloatField(null=True)
	change_percent = models.FloatField()
	market_cap = models.FloatField(null=True)
	primary_exchange = models.CharField(null=True, max_length=32)


class FavoriteStocks(models.Model):
	username = models.CharField(max_length=300)
	stock = models.CharField(max_length=10)

	def __init__(self, username,stock):
		self.stock=stock
		self.username=username

class Notifications(models.Model):
    stock = models.CharField(max_length=10)
    type = models.CharField(max_length=10)
    def __init__(self,stock,type):
		   self.stock = stock
		   self.type =  type

