
function row_orders(order_id, order_date, order_details, quantity, customer_name, customer_address, customer_contactnum, total_amount, order_status)
{
   return '<div class="col-lg-12">' +
          '<p>'+ ' </br> ID: ' + order_id + ' </br> Date: ' + order_date + ' </br> products: ' + order_details + ' </br> Quantity: ' +  quantity + 
          ' </br> Customer: ' + customer_name + ' </br> Address: ' + customer_address + ' </br> Contact Number: ' + customer_contactnum + 
          ' </br> Amount: ' + total_amount + ' </br> Status: ' + order_status +'</p> </div>';  
}


function view_orders()
{

$.ajax({
    		url: 'http://localhost:8000/orders',
    		type:"GET",
    		dataType: "json",
    		success: function(resp) {
				$("#view").html("");
				if (resp.status  == 'OK') {
				   for (i = 0; i < resp.size; i++)
                                  {
                                       order_id = resp.orders[i].order_id;
                                       order_date = resp.orders[i].order_date;
                                       order_details = resp.orders[i].order_details;
                                       quantity = resp.orders[i].quantity;
                                       customer_name = resp.orders[i].customer_name;
                                       customer_address = resp.orders[i].customer_address;
                                       customer_contactnum = resp.orders[i].customer_contactnum;
                                       total_amount = resp.orders[i].total_amount;
                                       order_status = resp.orders[i].order_status;
                                       $("#view").append(row_orders(order_id, order_date, order_details, quantity, customer_name, customer_address, customer_contactnum, total_amount, order_status));
                                       
	                          }
				} else
				{
					$("#view").html("");
					alert(resp.status);
				}
    		},
    		error: function (e) {
        		alert("danger");
   			},
                beforeSend: function (xhrObj){
          		xhrObj.setRequestHeader("Authorization",
                        "Basic " + btoa("amoree:amoree143"));
   			}
		}); 
}

var Add = document.getElementById("Add");
var Edit = document.getElementById("Edit");
var Track = document.getElementById("Track");
var Search = document.getElementById("Search");

Add.addEventListener('click', function(){
	var order_date = document.getElementById("OrderDate").value;
	var order_details = document.getElementById("OrderDetails").value;
	var quantity = document.getElementById("Quantity").value;
	var customer_name = document.getElementById("CustomerName").value;
	var customer_address = document.getElementById("CustomerAddress").value;
	var customer_contactnum = document.getElementById("CustomerContact").value;
	var total_amount = document.getElementById("TotalAmount").value;
	var order_status = document.getElementById("OrderStatus").value;
	add_order(order_date, order_details, quantity, customer_name, customer_address, customer_contactnum, total_amount, order_status);
})

function add_order(order_date, order_details, quantity, customer_name, customer_address, customer_contactnum, total_amount, order_status) 
{
$.ajax({
		url: 'http://localhost:8000/orders',
		type: "POST",
		dataType: "json",
		contentType: "application/json; charset=utf-8",
		data: JSON.stringify({
			order_date: order_date,
			order_details: order_details,
			quantity: quantity,
			customer_name: customer_name,
			customer_address: customer_address,
			customer_contactnum: customer_contactnum,
			total_amount: total_amount,
			order_status: order_status
		}),
		success: function (data) {
			alert(data.status);
		},
		error: function (e) {
			alert("Error Occured.");
		},
		beforeSend: function (xhrObj) {
			xhrObj.setRequestHeader("Authorization",
				"Basic " + btoa("amoree:amoree143"));
		}
	});
}

Search.addEventListener('click', function(){
	var order_date = document.getElementById("s_OrderDate").value;
	search_orders(order_date);
})


function search_orders(order_date)
{

$.ajax({
    		url: 'http://localhost:8000/orders/'+ order_date,
    		type:"GET",
    		dataType: "json",
    		success: function(resp) {
				$("#search").html("");
				if (resp.status  == 'OK') {
				   for (i = 0; i < resp.size; i++)
                                  {
                                       order_id = resp.orders[i].order_id;
                                       order_date = resp.orders[i].order_date;
                                       order_details = resp.orders[i].order_details;
                                       quantity = resp.orders[i].quantity;
                                       customer_name = resp.orders[i].customer_name;
                                       customer_address = resp.orders[i].customer_address;
                                       customer_contactnum = resp.orders[i].customer_contactnum;
                                       total_amount = resp.orders[i].total_amount;
                                       order_status = resp.orders[i].order_status;
                                       $("#search").append(row_orders(order_id, order_date, order_details, quantity, customer_name, customer_address, customer_contactnum, total_amount, order_status));
                                       
	                          }
				} else
				{
					$("#search").html("");
					alert(resp.status);
				}
    		},
    		error: function (e) {
        		alert("danger");
   			},
                beforeSend: function (xhrObj){
          		xhrObj.setRequestHeader("Authorization",
                        "Basic " + btoa("amoree:amoree143"));
   			}
		}); 
}

Edit.addEventListener('click', function(){
	var order_id = document.getElementById("e_OrderID").value;
	var order_date = document.getElementById("e_OrderDate").value;
	var order_details = document.getElementById("e_OrderDetails").value;
	var quantity = document.getElementById("e_Quantity").value;
	var customer_name = document.getElementById("e_CustomerName").value;
	var customer_address = document.getElementById("e_CustomerAddress").value;
	var customer_contactnum = document.getElementById("e_CustomerContact").value;
	var total_amount = document.getElementById("e_TotalAmount").value;
	var order_status = document.getElementById("e_OrderStatus").value;
	edit_order(order_id, order_date, order_details, quantity, customer_name, customer_address, customer_contactnum, total_amount, order_status);
})

function edit_order(order_id, order_date, order_details, quantity, customer_name, customer_address, customer_contactnum, total_amount, order_status) 
{
$.ajax({
		url: 'http://localhost:8000/orders',
		type: "PUT",
		dataType: "json",
		contentType: "application/json; charset=utf-8",
		data: JSON.stringify({
			order_id: order_id,
			order_date: order_date,
			order_details: order_details,
			quantity: quantity,
			customer_name: customer_name,
			customer_address: customer_address,
			customer_contactnum: customer_contactnum,
			total_amount: total_amount,
			order_status: order_status
		}),
		success: function (data) {
			alert(data.status);
		},
		error: function (e) {
			alert("Error Occured.");
		},
		beforeSend: function (xhrObj) {
			xhrObj.setRequestHeader("Authorization",
				"Basic " + btoa("amoree:amoree143"));
		}
	});
}

Track.addEventListener('click', function(){
	var order_id = document.getElementById("t_OrderID").value;
	var order_status = document.getElementById("t_OrderStatus").value;
	track_order(order_id, order_status);
})

function track_order(order_id, order_status) 
{
$.ajax({
		url: 'http://localhost:8000/status',
		type: "PUT",
		dataType: "json",
		contentType: "application/json; charset=utf-8",
		data: JSON.stringify({
			order_id: order_id,
			order_status: order_status
		}),
		success: function (data) {
			alert(data.status);
		},
		error: function (e) {
			alert("Error Occured.");
		},
		beforeSend: function (xhrObj) {
			xhrObj.setRequestHeader("Authorization",
				"Basic " + btoa("amoree:amoree143"));
		}
	});
}