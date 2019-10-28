from myapp import stock_api
from myapp.database_connections.db_connections import DbConnect
from myapp.models import NotificationType, FavoriteStocks, NotificationsRules
import sqlite3

from myapp.scheduler.scheduler import KillableThread

print("out")


def self():

    return  self
def conver_set_to_string(set):
        stocks_str = ""
        for i in range(len(set)):
            stocks_str += set[i]
            if i != len(set) - 1:
                stocks_str += ","
        return stocks_str
def getChangeOfFavariteStock():
        notis = NotificationType.objects.filter().values('username', 'stock', 'notificationType')
        print("------")
        #print(notis)
        symbols = []
        stocks = FavoriteStocks.objects.filter().values('username', 'stock')
        print(list(stocks))

        for symbol in list(stocks):
            symbols.append(symbol['stock'])
        print(symbols)
        s = set(symbols)
        print(s)
        # print(conver_set_to_string(list(s)))
        data = stock_api.get_multyble_stocks(conver_set_to_string(list(s)))
        # print(str(data[0]['symbol']) +":"+str(data[0]['change']) )
        #print(data)
        return data
class NotificationsApi():
    print("mnnmnmn")

    # def __init__(self):
    #     self=self


    def creatNotifications(self):
        stockChangeMap ={}
        favariteStocksChange = getChangeOfFavariteStock()
        for stocksChang in favariteStocksChange:
            stockChangeMap[stocksChang['symbol']] = stocksChang['change']


        nrules = NotificationsRules.objects.filter().values('username', 'stock', 'minChange', 'maxChange', 'action')
        notificationsRulse = list(nrules)

        #print(notificationsRulse)
        print("**********************************************************************")
        print(stockChangeMap)

        print("**********************************************************************")
        # match = next(d for d in favariteStocksChange if d['symbol'].casefold() == 'asd'.casefold()  )
        # print(match)
        for rule in notificationsRulse:
                print("**********************************************************************")
                print(rule['stock'])
                print("**********************************************************************")
                if rule['stock'].upper() in stockChangeMap:
                    print("nice")
                #if d['symbol'].casefold() == rule['stock'].casefold():
                    if stockChangeMap.get(rule['stock'].upper()) >= rule['maxChange'] or stockChangeMap.get(rule['stock'].upper()) <= rule['maxChange']:
                        db=DbConnect()
                        db.insertNotifications(rule['username'],rule['stock'],rule['action'])
                        print(rule['action'])
                else:
                    pass

    def notify(self):
        print("====> notify")

    def msg(self):
        print("====> msg")

    def sell(self):
        print("====> sell")



    WAIT_TIME_SECONDS = 2
    t = KillableThread(sleep_interval=WAIT_TIME_SECONDS, task=creatNotifications, args=[self])
    t.start()
    t.kill()