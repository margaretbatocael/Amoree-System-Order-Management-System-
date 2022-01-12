# Amoree-Finds-Order-Management-System

The Amoree System

CSC 181 Project by The Best-Teas

Software Engineering

Amoree Finds is an online clothing shop and The Amoree System is designed for easier managing of the orders.
The Amoree System is an application that can add, edit, and search orders and update its order status(pending, completed, or cancelled).

1. Clone this repo. Create a database on POSTGRESQL, the database name is __"Amoree"__. Create tables and functions on __"Amoree"__ database, copy the code from the __amoree.sql__ file.
    ```bash
    $ git clone https://github.com/margaretbatocael/Amoree-System-Order-Management-System-.git
    $ cd Amoree-System-Order-Management-System-
    ```

#

2. Connect your database to __connection.py__ file, then install packages needed. In this project, we're using __SQLAlchemy__, __psycopg2__, and __Flask__ packages:
    ```bash
    $ pip install SQLAlchemy psycopg2 Flask
    ```
    
#

3. Run the server file. Your application server will run locally at __*http://localhost:8000/*__ :
    ```bash
    $ python app.py
    ```
    
#

4. Give a request to the server. You can use any web browsers available on your computer:
    
    __See the opening screen (*index.html*)__
    ```bash
    POST /users
    body request: {password: "amoree143"}
    ```

    __Get all orders:__
    ```bash
    GET /orders
    ```

    __Post an order to database:__ 
    ```bash
    POST /orders
    body request: {Order date: "2021-12-22", Products: "2 green jackets, 1 red tank top, 1 denim skirt", Quantity: "4", Customer: "Emily Cooper", Address: "Paris", Contact     
    number: "09123456789", Amount: "789.00", Status: "pending"}
    ```
        
    __Update an order:__
    ```bash
    PUT /orders
    body request: {Order date: "2021-12-22", Products: "1 white jacket, 1 red tank top, 1 denim skirt", Quantity: "3", Customer: "Emily Copper", Address: "Purok Paris, San Pedro", Contact number: "09123456789", Amount: "789.00", Status: "pending"}
    ```
    
    __Get all orders & specific order by date:__
    ```bash
    GET /orders
    GET /orders/{:order_date}
    body request: {Order date: "2021-12-22"}
    ```
    
    __Update an order by status:__
    ```bash
    PUT /status
    body request: {Status: "completed"}

#

7. Enjoy!
