from django.urls import path
from django.contrib.auth import views as auth_views
from rest_framework import routers
from rest_framework import viewsets
from django.conf.urls import url, include


from . import views


# Routers provide an easy way of automatically determining the URL conf.
router = routers.DefaultRouter()
router.register(r'favoritestocks',views.FavoriteStocksViewSet)

# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.

urlpatterns = [
	path('', views.index, name='index'),
	url(r'^login/$', views.index, name='ui'),
	url(r'^favStocks/$', views.index, name='ui'),
	path('favStocksInfo/<str:username>/', views.getFavoriteStocksInfo, name='getFavoriteStocksInfo'),
	path('top20stocks/', views.getTop20Stocks, name='getTop20Stocks'),
	path('favStock/<str:username>/', views.get_favorite_stocks, name='get_favorite_stocks'),
	path('stock/<str:symbol>/', views.single_stock, name='single_stock'),
	path('historic/<str:symbol>/', views.single_stock_historic, name='single_stock_historic'),
	path('accounts/login/', auth_views.LoginView.as_view(template_name='login.html'), name='login'),
	path('accounts/logout/', views.logout_view, name='logout'),
	path('accounts/register/', views.register, name='register'),
    path('multyStocks/<str:username>/', views.multible_stock, name='multible_stock'),
	path('notifications/<str:username>/', views.getNotifications, name='getNotifications'),
	path('notificationstype/<str:username>/', views.getNotificationsApi, name='getNotifications'),
	url(r'^', include(router.urls)),
	url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework')),
]