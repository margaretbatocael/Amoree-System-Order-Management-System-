from flask import Flask, jsonify, request
from connection import spcall
from flask_httpauth import HTTPBasicAuth
import flask

app = Flask(__name__)
auth = HTTPBasicAuth()

@auth.get_password
def enter(user_id):
    return spcall("login", (user_id,))[0][0]

@app.route('/')
def index():
    return "THE AMOREE SYSTEM"

@app.route('/orders', methods=["GET"])
@auth.login_required
def getOrders():
    orders = spcall("view_orders", ())[0][0]
    return jsonify(orders)

@app.route('/orders/<string:order_date>', methods=["GET"])
@auth.login_required
def getOrdersDate(order_date):
    orders = spcall("search_order", (order_date,))[0][0]
    return jsonify(orders)

@app.route('/orders', methods=["POST"])
@auth.login_required
def postOrders():
    params  = request.get_json()
    order_date = params["order_date"]
    order_details = params["order_details"]
    quantity = params["quantity"]
    customer_name = params["customer_name"]
    customer_address = params["customer_address"]
    customer_contactnum = params["customer_contactnum"]
    total_amount = params["total_amount"]
    order_status = params["order_status"]
    result = spcall("add_order", (order_date, order_details, quantity, customer_name, customer_address, customer_contactnum, total_amount, order_status), True)[0][0]
    return jsonify(result)

@app.route('/orders', methods=["PUT"])
@auth.login_required
def putOrders():
    params  = request.get_json()
    order_id = params["order_id"]
    order_date = params["order_date"]
    order_details = params["order_details"]
    quantity = params["quantity"]
    customer_name = params["customer_name"]
    customer_address = params["customer_address"]
    customer_contactnum = params["customer_contactnum"]
    total_amount = params["total_amount"]
    order_status = params["order_status"]
    result = spcall("update_order", (order_id, order_date, order_details, quantity, customer_name, customer_address, customer_contactnum, total_amount, order_status), True)[0][0]
    return jsonify(result)

@app.route('/status', methods=["PUT"])
@auth.login_required
def putOrdersTrack():
    params  = request.get_json()
    order_id = params["order_id"]
    order_status = params["order_status"]
    result = spcall("track_order", (order_id, order_status), True)[0][0]
    return jsonify(result)

@app.after_request
def add_cors(resp):
    resp.headers['Access-Control-Allow-Origin'] = flask.request.headers.get('Origin', '*')
    resp.headers['Access-Control-Allow-Credentials'] = True
    resp.headers['Access-Control-Allow-Methods'] = 'POST, OPTIONS, GET, PUT, DELETE'
    resp.headers['Access-Control-Allow-Headers'] = flask.request.headers.get('Access-Control-Request-Headers',
                                                                             'Authorization')
    
    if app.debug:
        resp.headers["Access-Control-Max-Age"] = '1'
    return resp

if __name__ == '__main__':
    app.debug=True
    port = 8000
    app.run(host='localhost', port=port)

    
