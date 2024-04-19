from flask import Flask, request, jsonify
# import requests
from pymongo import MongoClient
import uuid

app = Flask(__name__)

# MongoDB connection settings
MONGO_URI = "mongodb://localhost:27017/"  
DATABASE_NAME = "CamundaDB" 

COLLECTION_NAME_1 = "booking-details" 
COLLECTION_NAME_2 = "shipment-details" 
COLLECTION_NAME_3 = "crm-dbs"
COLLECTION_NAME_4 = "tempdbs" #dont use
COLLECTION_NAME_5 = "formdbs" #dont use
COLLECTION_NAME_6 = "shipment-events"

# MongoDB connection
client = MongoClient(MONGO_URI)
db = client[DATABASE_NAME]
collection1 = db[COLLECTION_NAME_1]
collection2 = db[COLLECTION_NAME_2]
collection3 = db[COLLECTION_NAME_3]
collection4 = db[COLLECTION_NAME_4]
collection5 = db[COLLECTION_NAME_5]
collection6 = db[COLLECTION_NAME_6]



@app.route('/api/form-details',methods=["POST"]) #post the form details
def form_details():
    try:
        form_data = request.form.to_dict()

        # Set the mandatory fields here
        mandatory_fields = ['booking_number','account_code','po_number']

        if all (field in form_data for field in mandatory_fields):
            case_id = str(uuid.uuid4())
            form_data['case_id'] = case_id
            collection3.insert_one(form_data)
            return jsonify({'message': 'Data inserted successfully','case_id': form_data['case_id']}), 201
        else:
            return jsonify({'error': 'Missing mandatory fields'}), 400
             
        # form_data['case_id'] = str(uuid.uuid4()) #Add a unique id
        # result = collection5.insert_one(form_data)
        # return jsonify({"message":"Form details saved Successfully"})

    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/post-booking-details', methods=['POST']) #post booking details
def get_booking_details():
    try:
        # Extract Booking_Number from the request JSON
        # booking_details = request.json.get('Booking_Details')
        # if booking_details is None:
        #     return jsonify({'error': 'Booking_Details not found in request JSON'}), 400

        # #Extract case_number which is inside the Case_information
        # Case_Information = request.json.get('Case_Information')
        # if Case_Information is None:
        #     return jsonify({'error':  'No Case Information provided!'}), 400
        
        # #Now extract the booking_id
        # booking_id = Case_Information.get('booking_id')
        # if booking_id is None:
        #     return jsonify({'Error':'No case number found!'}),400
        

        #dump the data in JSON format into the mongo collection
        # dump= {'Booking_Details': booking_details, 'booking_id': booking_id}

        # Store the JSON string in MongoDB
        # collection1.insert_one(dump)
        #--------------------------------------------------------------------------------------
        booking_details= request.json
        collection1.insert_one(booking_details)

        # Return Booking_Details & case_number in the response
        return jsonify({"message":"Booking details saved Successfully"}), 200
    except Exception as e:
        return jsonify({'error': 'Internal server error'}), 500

@app.route('/api/post-shipment-details', methods=['POST']) #post shipment details
def get_shipment_details():
    try:
        # Extract Shipment_details from the request JSON
        # shipment_details = request.json.get('Shipment_Details')
        # if shipment_details is None:
        #     return jsonify({'error': 'Shipment_Details not found in request JSON'}), 400
        
        # #Extract case_number which is inside the Case_information
        # Case_Information = request.json.get('Case_Information')
        # if Case_Information is None:
        #     return jsonify({'error':  'No Case Information provided!'}), 400
        
        # #Now extract the case_number
        # booking_id = Case_Information.get('booking_id')
        # if booking_id is None:
        #     return jsonify({'Error':'No case number found!'}),400

        # #dump the data in JSON format into the mongo collection
        # dump= {'Shipment_Details': shipment_details, 'booking_id': booking_id}
        
        # # Store the JSON string in MongoDB
        # collection2.insert_one(dump)
        #-----------------------------------------------------------------------
        shipment_details = request.json
        collection2.insert_one(shipment_details)

        # Return Shipment_details in the response
        return jsonify({"message":"Shipment details saved Successfully"}), 200
    except Exception as e:
        return jsonify({'error': 'Internal server error'}), 500

@app.route('/api/post-shipment-events', methods=['POST']) #post shipment events
def post_shipment_events():
    try:
        shipment_events = request.json
        collection6.insert_one(shipment_events)

        # Return Shipment_details in the response
        return jsonify({"message":"Shipment events saved Successfully"}), 200
    except Exception as e:
        return jsonify({'error': 'Internal server error'}), 500

@app.route('/api/post-dummy-data', methods=['POST']) #post some dummy data
def  post_dummy_data():
        dump = {
        "booking_number":"169915", 
        "account_code":"TKMAXX", 
        "po_number":"5000092821-05",
        "form":{
            "case_info":{
                "subject":"",
                "description": "",
                "case_owner": "",
                "case_number": "",
                "category": "",
                "sub_category": "",
                "priority": ""
            },
            "customer_info":{
                "account_code":"",
                "account_name":"",
                "customer_contact_name":"",
                "customer_contact_email":"",
                "customer_contact_title":"",
            },
            "triage":{
                "notes":"",
                "root_cause_description":"",
                "root_cause_category":"",
            },
            "case_resolution":{
                "resolution_description":"",
                "resolution_category":"",
                "case_closed":"",
            },
            },
        "booking_details":{
            "booking_header":{
                "transaction_nbr":"954235",
                "booking_number":"169915", 
                "account_code":"TKMAXX", 
                "master_customer_code":"MARMAX",
                "account_name":"TJX UK",
                "consignee_b_l":"TJX UK,73 CLARENDON ROAD,WATFORD, HERTS WD17 1TX,UNITED KINGDOM,TEL: +44 (0)1923 473845,",
                "notification_persion_1":"APLL UK LTD",
                "notification_party1_address_line_1":"3RD FLOOR, PRESS CENTRE,",
                "notification_party1_address_line_2":"HERE EAST, 14 EAST BAY LANE",
                "notification_party1_address_line_3":"STRATFORD LONDON E15 2GW",
                "origin_port":"CNSHA",
                "origin_country":"CN",
                "all_document_received_flag":"Y",
                "inco_term_booking":"FOB",
                "export_country_name":"CHINA",
                "vendor_name":"FENELLA SMITH LTD (TTD)",
                "shipper":"JIAXING ANCO TRADING CO.,LTD",
                "destination_country":"United Kingdom",
                "discharge_post_bl":"SOUTHAMPTON, GB",
                "final_destination_bl":"SOUTHAMPTON, GB",
                "load_post":"SHANGHAI, CN",
                "transport_mode":"Ocean",
                "service_type":"CNS",
                "load_type":"F",
                "shipment_type_code":"S",
                "shipment_type":"FCL",
                "apll_program_indicator":"N",
                "booked_date":"10/8/2024",
                "mode":"FACTORY",
            },
        },
        "shipment_details":{
            "shipment_reference":{
                "service_type":"",
                "mode":"",
                "incoterm":"",
                "load_type":"",
                "booking_number":"169915", 
                "po_number":[
                    {
                    "purchanse_order_number":"5000092821-05",
                    "department_po":"10",
                    "product_number":"LLCRM240L",
                    "sku_description":"303732",
                    "shipped_ctns":"90",
                    "shipped_quantity":"90",
                    "shipped_item_weight_kg":"1170",
                    "shipped_item_volume_cbm":"10.7",
                    "sku_unit_fob_ccy":"USD",
                    "sku_unit_fob_amount":"28",
                    "commodity_code":"BAGS",
                    "cargo_description":"HANDBAGS AND LUGGAGE",
                    "manufacturing_country":"CHINA",
                    "description":"LUCA LUNA CREAM AND TAN",
                    "harmonized_code_sku":"",
                    "sku_number":"303732CREAM AND TA",
                    "load_sequence_number":"2",
                    },
                    {
                    "purchanse_order_number":"5000092821-05",
                    "department_po":"10",
                    "product_number":"LLCRM240M",
                    "sku_description":"303736",
                    "shipped_ctns":"",
                    "shipped_quantity":"90",
                    "shipped_item_weight_kg":"",
                    "shipped_item_volume_cbm":"",
                    "sku_unit_fob_ccy":"USD",
                    "sku_unit_fob_amount":"25",
                    "commodity_code":"BAGS",
                    "cargo_description":"HANDBAGS AND LUGGAGE",
                    "manufacturing_country":"CHINA",
                    "description":"LUCA LUNA CREAM AND TAN",
                    "harmonized_code_sku":"",
                    "sku_number":"303736CREAM AND TA",
                    "load_sequence_number":"2",
                    },
                    {
                    "purchanse_order_number":"",
                    "department_po":"",
                    "product_number":"",
                    "ske_description":"",
                    "shipped_ctns":"",
                    "shipped_quantity":"",
                    "shipped_item_weight_kg":"",
                    "shipped_item_volume_cbm":"",
                    "sku_unit_fob_ccy":"",
                    "sku_unit_fob_amount":"",
                    "commodity_code":"",
                    "cargo_description":"",
                    "manufacturing_country":"",
                    "description":"",
                    "harmonized_code_sku":"",
                    "sku_number":"",
                    "load_sequence_number":"",
                     },
                ],
                "bl_number":"",
                "container_number":"",
                "fcr_number":"",
                "shipper_name":"",
                "shipper_code":"",
                "vessel_name":"",
                "voyage_number":"",
                "carrier_code":"",
                "origin_country":"",
                "origin_port":"",
                "destination_country":"",
                "destination_port":"",
            },
            "Shipment_status":{ 
                "booking_status":"",
                "shipment_status":"",
                "latest_event":"",
                "si_cutoff_date":"",
                "si_timeliness":"",
                "si_triggered_user":"",
                "si_error":"",
                "asn_send_date":"",
                "asn_triggered_user":"",
                "asn_error":"",
                "estimated_departure_date":"",
                "actual_departure_date":"",
                "estimated_arrival_date":"",
                "actual_arrival_date":"",
                "eqipment_number":"APHU7189968",
                "account_code":"TKMAXX",
                "eqipment_type":"40' x 9'6",
                "total_cartoons_container_level":"580",
                "total_volume_cbm_container_level":"69.52",
                "total_weight_container_level":"7540",
                "carrier_code":"CMDU",
                "carrier_name":"CMA-CGM COMPAGNIE GENERALE - CMDU",
                "carrier_seal_number":"R3150545",
                "acs123voyage":"281294",
                "voyage":"0FME3W",
                "departure_date_actual/estimated":"45226.9465277778",
                "vessel_name":"APL CHANGI",
                "carrier_bill_number":[
                    {
                        "carrier_bill_number":"CHN0610296",
                        "event_dt":"10/25/2023  3:28:00 PM",
                        "event_name":"IN_GATE",
                        "time_stamp":"10/25/2023  1:46:53 AM"
                    },
                    {
                        "carrier_bill_number":"CHN0610296",
                        "event_dt":"10/27/2023  4:45:00 AM",
                        "event_name":"LOADED_ON_VESSEL",
                        "time_stamp":"10/26/2023  3:00:04 PM"
                    },
                    {
                        "carrier_bill_number":"CHN0610296",
                        "event_dt":"10/31/2023  10:12:00 AM",
                        "event_name":"NULL",
                        "time_stamp":"10/29/2023  9:11:19 PM"
                    },
                ],
                "booking_number":"169915",
                "adod_dt":"45222",
                "arrival_date_actual/estimated":"12/7/2023  7:00:00 AM",
                "ship_window_start_dt":"10/28/2023",
                "ship_window_end_dt":"10/31/2023",
                "ship_window_dt":"10/31/2023",
                "planned_receipt_dt":"NULL",
                "edod_dt":"10/31/2023",
                "adod_dt":"10/23/2023",
                "etd":"10/27/2023",
                "departure_dt_actual/estimated":"10/27/2023",
                "departure_dt":"10/27/2023",
                "doc_received_dt":"10/30/2023",
                "pouch_pickup_dt":"10/31/2023",
                "bl_receipt_dt":"NULL",
                "first_asn_dt":"10/29/2023",
                "asn_dt":"10/29/2023",
                "eta":"12/4/2023",
                "arrival_dt_est":"12/8/2023",
                "arrival_dt_act":"12/8/2023",
                "arrival_dt":"12/8/2023",
                "final_destination_dt_sch":"12/4/2023",
                "final_destination_dt_est":"12/7/2023",
                "final_destination_dt_act":"12/15/2023",
                "control_deli_to_consgne_act":"12/15/2023",
                "final_destination_dt":"12/15/2023",
            }
        }
        }
        
        collection4.insert_one(dump)
        return jsonify("Data added successfully")


# Route to get Booking_Number & Shipment_details from the previous APIs and store in MongoDB
# @app.route('/api/store-data', methods=['POST'])
# def store_data():
#     try:
#         # Make requests to the first and second APIs to get Booking_Number & Shipment_details
#         response1 = requests.post('http://localhost:5000/api/post-booking-details', json=request.json)
#         response2 = requests.post('http://localhost:5000/api/post-shipment-details', json=request.json)

#         # Ensure that both requests were successful (status code 200)
#         if response1.status_code == 200 and response2.status_code == 200:
#             # Extract Booking_Number & Shipment_details from the responses
#             booking_details = response1.json().get('Booking_Details')
#             shipment_details = response2.json().get('Shipment_Details')

#             # Combine the data
#             data = {
#                 'Booking_Details': booking_details,
#                 'Shipment_details': shipment_details
#             }

#             # Store the combined data in MongoDB
#             collection3.insert_one(data)

#             return jsonify({'message': 'Data stored successfully'}), 200
#         else:
#             return jsonify({'error': 'Failed to get data from one or both APIs'}), 500
#     except Exception as e:
#         return jsonify({'error': 'Internal server error'},e), 500



if __name__ == '__main__':
    app.run(debug=True)
