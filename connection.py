import sys,os
from sqlalchemy import create_engine


class DBconn:
    def __init__(self):
        engine = create_engine('postgresql://postgres:margaret@localhost:5432/Amoree', echo=False)
        self.conn = engine.connect()
        self.trans = self.conn.begin()

    def getcursor(self):
        cursor = self.conn.connection.cursor()
        return cursor

    def dbcommit(self):
        self.trans.commit()

def spcall(qry, param, commit=False):
    try:
        dbo = DBconn()
        cursor = dbo.getcursor()
        cursor.callproc(qry, param)
        res = cursor.fetchall()
        if commit:
            dbo.dbcommit()
        return res
    except:
        res = [("Error: " + str(sys.exc_info()[0]) + " " + str(sys.exc_info()[1]),)]
        return res


# print(spcall("login", ("amoree",)))
# print(spcall("add_order", ('2021-12-25', '3 socks, 2 Christmas hat', '5', 'Freny', 'Tibanga','09647290124', '500','pending')))
# print(spcall("view_orders", ()))
# print(spcall("track_order", ("5","cancelled",)))
# print(spcall("update_order", ('1', '2021-12-21', '2 denim shorts, 1 red sexy top', '3', 'Marga', 'Polanco','09123456789', '300', 'pending')))
# print(spcall("search_order", ("2021-12-21",)))
