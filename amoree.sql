CREATE TABLE IF NOT EXISTS users(
		user_password varchar(10) PRIMARY KEY NOT NULL
);


CREATE TABLE IF NOT EXISTS orders(
		order_id serial PRIMARY KEY NOT NULL,
		order_date date NOT NULL,
		order_details text NOT NULL,
		quantity numeric NOT NULL,
		customer_name text NOT NULL,
		customer_address text NOT NULL,
		customer_contactnum varchar(11) NOT NULL,
		total_amount numeric NOT NULL,
		order_status text NOT NULL
);



CREATE OR REPLACE FUNCTION login(par_user_id text) RETURNS json
	LANGUAGE 'plpgsql' AS
	$$
 declare
    loc_password text;
  begin
     select into loc_password password from users where user_id = par_user_id;
     if loc_password isnull then
       loc_password = 'null';
     end if;
     return loc_password;
 end;
$$;

CREATE OR REPLACE FUNCTION add_order(par_order_date date, 
									 par_order_details text, 
									 par_quantity numeric,
									 par_customer_name text,
									 par_customer_address text,
									 par_customer_contactnum varchar(11),
									 par_total_amount numeric,
									 par_order_status text) RETURNS json
	LANGUAGE 'plpgsql' AS
	$$
BEGIN
	INSERT INTO orders(order_date, order_details, quantity, 
					   customer_name, customer_address, customer_contactnum, total_amount, order_status)
	VALUES(par_order_date, par_order_details, par_quantity, 
		   par_customer_name, par_customer_address, par_customer_contactnum, par_total_amount, par_order_status);
	RETURN json_build_object (
		'status', 'OK'
	);
END
$$;



CREATE OR REPLACE FUNCTION view_orders() RETURNS json
	LANGUAGE 'plpgsql' AS
	$$
DECLARE
	loc_row record;
	loc_orders json[];
	loc_size int default 0;
BEGIN
	for loc_row in select order_id, order_date, order_details, quantity, customer_name, customer_address, customer_contactnum,
		total_amount, order_status from orders loop
			loc_orders = loc_orders ||
							json_build_object (
								'order_id', loc_row.order_id,
								'order_date', loc_row.order_date,
								'order_details', loc_row.order_details,
								'quantity', loc_row.quantity,
								'customer_name', loc_row.customer_name,
								'customer_address', loc_row.customer_address,
								'customer_contactnum', loc_row.customer_contactnum,
								'total_amount', loc_row.total_amount,
								'order_status', loc_row.order_status
							);
			loc_size = loc_size + 1;
		end loop;
	
		RETURN json_build_object(
			'status', 'OK',
			'size', loc_size,
			'orders', loc_orders
		
	);
END
$$;



CREATE OR REPLACE FUNCTION update_order(par_order_id bigint,
									 par_order_date date, 
									 par_order_details text, 
									 par_quantity numeric,
									 par_customer_name text,
									 par_customer_address text,
									 par_customer_contactnum varchar(11),
									 par_total_amount numeric,
									 par_order_status text) RETURNS json
	LANGUAGE 'plpgsql' AS
	$$
BEGIN
	UPDATE orders SET order_date = par_order_date,
					order_details = par_order_details,
					quantity = par_quantity,
					customer_name = par_customer_name,
					customer_address = par_customer_address,
					customer_contactnum = par_customer_contactnum,
					total_amount = par_total_amount WHERE order_id = par_order_id;
	RETURN json_build_object (
		'status', 'OK'
	);
END
$$;



CREATE OR REPLACE FUNCTION track_order(par_order_id bigint, par_order_status text) RETURNS json
	LANGUAGE 'plpgsql' AS
	$$
BEGIN
	UPDATE orders SET 
	order_status = par_order_status WHERE order_id = par_order_id;
	RETURN json_build_object (
		'status', 'OK'
	);
END
$$;



CREATE OR REPLACE FUNCTION search_order(par_order_date date) RETURNS json
	LANGUAGE 'plpgsql' AS
	$$
DECLARE
	loc_row record;
	loc_orders json[];
	loc_size int default 0;
BEGIN
	for loc_row in select order_id, order_date, order_details, quantity, customer_name, customer_address, customer_contactnum,
		total_amount, order_status from orders where order_date = par_order_date loop
			loc_orders = loc_orders ||
							json_build_object (
								'order_id', loc_row.order_id,
								'order_date', loc_row.order_date,
								'order_details', loc_row.order_details,
								'quantity', loc_row.quantity,
								'customer_name', loc_row.customer_name,
								'customer_address', loc_row.customer_address,
								'customer_contactnum', loc_row.customer_contactnum,
								'total_amount', loc_row.total_amount,
								'order_status', loc_row.order_status
							);
		loc_size = loc_size + 1;
	end loop;
	RETURN json_build_object(
		'status', 'OK',
		'size', loc_size,
		'orders', loc_orders
		);
	if loc_orders isnull then return json_build_object(
	       'status', 'No Orders Found'
	   		);
		
   end if;
     return loc_orders;
END
$$;

