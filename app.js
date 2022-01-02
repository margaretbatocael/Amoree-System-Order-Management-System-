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
    		url: 'http://127.00.0.1:8000/orders',
    		type:"GET",
    		dataType: "json",
    		success: function(resp) {
				$("#orders").html("");
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
                                       $("#orders").append(row_orders(order_id, order_date, order_details, quantity, customer_name, customer_address, customer_contactnum, total_amount, order_status));
                                       
	                          }
				} else
				{
					$("#orders").html("");
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

function add_order(order_date, order_details, quantity, customer_name, customer_address, customer_contactnum, total_amount, order_status) {
	$.ajax({
		url: 'http://localhost:8000/orders',
		type: "POST",
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
		dataType: "json",
		success: function (resp) {
			alert(resp.status);
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