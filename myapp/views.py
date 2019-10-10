import pickle
import sqlite3

from django.shortcuts import render, redirect
from rest_framework import viewsets
import json
from myapp import stock_api
from myapp.models import Stock, FavoriteStocks ,Notifications
from django.http import JsonResponse
from django.contrib.auth.models import User
from django.contrib.auth import logout
from django.utils import timezone
#from myapp.serializers import FavoriteStocksSerializerpi
from myapp.serializers import FavoriteStocksSerializer


class FavoriteStocksViewSet(viewsets.ModelViewSet):
    queryset = FavoriteStocks.objects.all()
    serializer_class = FavoriteStocksSerializer


# View for the home page - a list of 20 of the most active stocks
def index(request):
	# Query the stock table, filter for top ranked stocks and order by their rank.
	data = Stock.objects.filter(top_rank__isnull=False).order_by('top_rank')
	return render(request, 'index.html', {'page_title': 'Main', 'data': data })


# View for the single stock page
# symbol is the requested stock's symbol ('AAPL' for Apple)
def single_stock(request, symbol):
	data = stock_api.get_stock_info(symbol)
	print(data[ 'change'])
	return render(request, 'single_stock.html', {'page_title': 'Stock Page - %s' % symbol, 'data': data})


def register(request):
	# If post -> register the user and redirect to main page
	if request.method == 'POST':
		firstname = request.POST.get('firstname')
		lastname = request.POST.get('lastname')
		email = request.POST.get('email')
		password = request.POST.get('password')

		newuser = User.objects.create_user(username=email, email=email, password=password)
		newuser.first_name = firstname
		newuser.last_name = lastname
		newuser.save()
		return redirect('index')
	else:
		# If not post (regular request) -> render register page
		return render(request, 'register.html', {'page_title': 'Register'})


def logout_view(request):
	logout(request)
	return redirect('index')


# API for a stock's price over time
# symbol is the requested stock's symbol ('AAPL' for Apple)
# The response is JSON data of an array composed of "snapshot" objects (date + stock info + ...), usually one per day
def single_stock_historic(request, symbol):
	data = stock_api.get_stock_historic_prices(symbol, time_range='1m')
	return JsonResponse({'data': data})


def get_favorite_stocks(request ,username):
	stocks = FavoriteStocks.objects.filter(username=username).values('username','stock')
	print((stocks)[0]['stock'])
    # for i in range(len(list(stocks))):
    #     string += list(stocks)[i]['stock']
	return JsonResponse( list(stocks),safe=False)

def get_string_stocks(username):
    stocks_str =""
    stocks = FavoriteStocks.objects.filter(username=username).values('username', 'stock')
    for i in range(len(list(stocks))):
        stocks_str += list(stocks)[i]['stock']
        if i != len(list(stocks)) - 1:
            stocks_str += ","
    return stocks_str


def multible_stock(request, username):

	data = stock_api.get_multyble_stocks(get_string_stocks(username))
	return JsonResponse({'data':data})

def getNotifications(request,username):
	stocks = FavoriteStocks.objects.filter(username=username).values('username', 'stock')


    #Notifications.objects.create(stock="goog", type="down")
	# notificatins_list=[]
	# data_notification = {}
	data = []




    # json_data = json.dumps(data_notification)



	for stock in list(stocks):

		stock_info = stock_api.get_stock_info(stock['stock'])
		if stock_info[ 'change'] > 0:
			n = Notifications(str(stock['stock']), "up")

			# new1=Notifications(stock="asd",type="up")
			# new1.save(force_insert=False,force_update=False,using=None,update_fields=None)

			print(str(stock['stock']) +"up")

			conn = sqlite3.connect('db.sqlite3')
			cur = conn.cursor()
			cur.execute('INSERT INTO myapp_notifications (stock, type) values (?, ?)', (n.stock, n.type))
			conn.commit()
            #n.save(force_insert=False,force_update=False,using=None,update_fields=None)
			data.append({"type": n.type, "stock": n.stock})

		if stock_info['change'] < 0:

		    print(str(stock['stock']) +"down")
		    n=Notifications(str(stock['stock']),"down")
		    data.append({"type": n.type,"stock":n.stock})
            # pick = pickle.dump(n)



	print(data)
	json_data=json.dumps(data)
	print(json_data)
	return JsonResponse( data,safe=False)
	#[{"username": "moham", "stock": "goog"}, {"username": "moham", "stock": "AMZN"}]
