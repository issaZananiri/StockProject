import pickle
import sqlite3

from django.shortcuts import render, redirect
from rest_framework import viewsets, status
import json

from rest_framework.decorators import api_view
from rest_framework.response import Response

from myapp import stock_api
from myapp.models import Stock, FavoriteStocks, Notifications, NotificationsRules, NotificationType
from django.http import JsonResponse
from django.contrib.auth.models import User
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
def conver_set_to_string(set):
	# set.remove("asd")

	stocks_str = ""
	for i in range(len(set)):
		stocks_str += set[i]
		if i != len(set) - 1:
			stocks_str += ","
	return stocks_str

def getNotificationsApi(request,username):
	notifications = NotificationType.objects.filter(username=username).values('username', 'stock' ,'notificationType')
	return JsonResponse(list(notifications), safe=False)



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

# @api_view(["POST"])
# def CalcTest(x1):
#     try:
#         x=json.loads(x1.body)
#         y=str(x*100)
#         return JsonResponse("Result:"+y,safe=False)
#     except ValueError as e:
#         return Response(e.args[0],status.HTTP_400_BAD_REQUEST)

# def getChangeOfFavariteStock():
# # 	notis = NotificationType.objects.filter().values('username', 'stock' , 'notificationType')
# # 	print("------")
# # 	print(notis)
# # 	symbols=[]
# # 	stocks = FavoriteStocks.objects.filter().values('username', 'stock')
# # 	print(list(stocks))
# #
# # 	for symbol in list(stocks):
# # 		symbols.append(symbol['stock'])
# # 	# print(symbols)
# # 	s = set(symbols)
# # 	# print(s)
# # 	# print(conver_set_to_string(list(s)))
# # 	data = stock_api.get_multyble_stocks(conver_set_to_string(list(s)))
# # 	#print(str(data[0]['symbol']) +":"+str(data[0]['change']) )
# # 	print(data)
# # 	return data
# #
# # def creatNotifications():
# # 	favariteStocksChange = getChangeOfFavariteStock()
# # 	nrules = NotificationsRules.objects.filter().values('username', 'stock','minChange','maxChange','action')
# # 	notificationsRulse = list(nrules)
# # 	print("-------------------")
# # 	print(notificationsRulse)
# # 	# match = next(d for d in favariteStocksChange if d['symbol'].casefold() == 'asd'.casefold()  )
# # 	# print(match)
# # 	for rule in notificationsRulse:
# # 		for d in favariteStocksChange:
# # 			if d['symbol'].casefold() == rule['stock'].casefold():
# # 				if d['change'] >= rule['maxChange'] or d['change']  <= rule['maxChange']:
# # 					conn = sqlite3.connect('db.sqlite3')
# # 					cur = conn.cursor()
# # 					cur.execute('INSERT INTO myapp_notificationType (username,stock, notificationType) values (?, ?, ?)', (rule['username'],rule['stock'],rule['action'] ))
# # 					conn.commit()
# #
# # 					print(rule['action'])
# # 			else:
# # 				pass
# #
# #
# #
# # 	# for stock in favariteStocks:
# # 	# 	for item in notificationsRulse:
# # 	# 		if stock['use']
# #
# #
# #
# # def notify():
# # 	print("====> notify")
# #
# # def msg():
# # 	print("====> msg")
# # def sell():
# # 	print("====> sell")
# # WAIT_TIME_SECONDS=2
# # t = KillableThread(sleep_interval=WAIT_TIME_SECONDS, task=getChangeOfFavariteStock)
# # t.start()
# # t.kill()