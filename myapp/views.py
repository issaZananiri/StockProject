import pickle
import sqlite3

from django.shortcuts import render, redirect
from django.views.decorators.cache import cache_page
from django.views.decorators.csrf import csrf_protect, requires_csrf_token, csrf_exempt
from rest_framework import viewsets, status
import json

from rest_framework.decorators import api_view
from rest_framework.response import Response

from myapp import stock_api
from myapp.models import Stock, FavoriteStocks, Notifications, NotificationType , User
from django.http import JsonResponse, HttpResponseBadRequest
# from django.contrib.auth.models import User
from django.contrib.auth import logout
from django.utils import timezone
#from myapp.serializers import FavoriteStocksSerializerpi
from myapp.notifications.notifications_api import NotificationsApi
from myapp.scheduler.scheduler import KillableThread

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


@csrf_exempt
def registerData(request):
    msg = "user name allready in use"
    data = json.loads(request.body)
    users = User.objects.values('username', 'password')
    for i in users:
         if i['username'] == data['username']:
             return JsonResponse(msg, safe=False)

	#newuser = User.objects.create_user(username=data['username'],password=data['password'],email="test")
    newuser =User()
    newuser.username= data['username']
    newuser.password= data['password']
    newuser.save()

    return JsonResponse("you are registired successfully", safe=False)

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
	stocks = FavoriteStocks.objects.filter(username=username).values('username','stock','id','quantity','pricePurchased')
	print((stocks)[0]['quantity'])
    # for i in range(len(list(stocks))):
    #     string += list(stocks)[i]['stock']
	return JsonResponse( list(stocks),safe=False)

def get_all_favorite_stocks(request ):
	stocks = FavoriteStocks.objects.values('username','stock','id')
	print((stocks)[0]['stock'])
	data=list(stocks)

    # for i in range(len(list(stocks))):
    #     string += list(stocks)[i]['stock']
	return JsonResponse( data,safe=False)
def getFavoriteStocksInfo(request,username):
    data = stock_api.get_stocks_for_favorite(get_string_stocks(username))
    stocks = FavoriteStocks.objects.filter(username=username).values('username', 'stock', 'id', 'quantity','pricePurchased')
    data1=list(stocks)
    for i in range(len(data)):
        data[i]['quantity']=data1[i]['quantity']
        data[i]['pricePurchased'] = data1[i]['pricePurchased']
        data[i]['quantity'] = data1[i]['quantity']
        data[i]['id'] = data1[i]['id']

    return JsonResponse( data,safe=False)
@csrf_exempt
def buyStocks(request):
    print("111")
    data = json.loads(request.body)
    print(data['numStocks'])
    print(data['stockSymbol'])
    print(data['price'])
    newfav=FavoriteStocks()
    newfav.username=data['username']
    newfav.stock=data['stockSymbol']
    newfav.pricePurchased=data['price']
    newfav.quantity=data['numStocks']
    newfav.save()
    return JsonResponse(data,safe=False)

# @cache_page(60 * 15)
# @csrf_protect
#@requires_csrf_token
@csrf_exempt
def logindata(request):
 msg="user name or password is uncorrect"
 data=json.loads(request.body)
 users=User.objects.values('username','password')
 for i in users:
  if i['username'] == data['username']:
	  if i['password'] == data['password']:
		  print("d")
		  msg="logged in successfully"

 return JsonResponse(msg,safe=False)
 #return  HttpResponseBadRequest
def get_string_stocks(username):
    stocks_str =""
    stocks = FavoriteStocks.objects.filter(username=username).values('username', 'stock','id','quantity','pricePurchased')
    for i in range(len(list(stocks))):
        stocks_str += list(stocks)[i]['stock']
        if i != len(list(stocks)) - 1:
            stocks_str += ","
    return stocks_str

def getTop20Stocks(request):
	data = stock_api.get_top_stocks_for_grid()
	return JsonResponse(data,safe=False)
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
			data.append({"stock":n.stock,"type": n.type})

		if stock_info['change'] < 0:

		    print(str(stock['stock']) +"down")
		    n=Notifications(str(stock['stock']),"down")
		    data.append({"stock":n.stock,"type": n.type})
            # pick = pickle.dump(n)



	print(data)
	json_data=json.dumps(data)
	print(json_data)
	return JsonResponse( data,safe=False)
	#[{"username": "moham", "stock": "goog"}, {"username": "moham", "stock": "AMZN"}]

def getNotificationsApi(request,username):
	notifications = NotificationType.objects.filter(username=username).values('username', 'stock' ,'notificationType')
	return JsonResponse(list(notifications), safe=False)

@api_view(["POST"])
def CalcTest(x1):
    try:
        x=json.loads(x1.body)
        y=str(x*100)
        return JsonResponse("Result:"+y,safe=False)
    except ValueError as e:
        return Response(e.args[0],status.HTTP_400_BAD_REQUEST)