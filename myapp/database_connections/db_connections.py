import sqlite3


class DbConnect():
    def __init__(self):
        self.conn = sqlite3.connect('db.sqlite3')

    def insertNotifications(self,username,stock,action):
        cur = self.conn.cursor()
        cur.execute(
            'INSERT INTO myapp_notificationType (username,stock, notificationType) values (?, ?, ?)',
            (username, stock, action))
        self.conn.commit()
        self.conn.close()