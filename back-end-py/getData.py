from flask import Flask, json, jsonify, request
from pymongo import MongoClient, ReturnDocument
from bson import ObjectId
import uuid
import hashlib
from bson.json_util import dumps
from flask_cors import CORS
import requests


app = Flask(__name__)
CORS(app)

#camunda url
CAMUNDA_WEBHOOK_URL = "https://dsm-1.connectors.camunda.io/445520de-d59d-4bf1-be74-941375b851c3/inbound/startAPLInstance"

# MongoDB connection
client = MongoClient('mongodb://localhost:27017/',serverSelectionTimeoutMS=5000, socketTimeoutMS=5000, connectTimeoutMS=5000)
db = client['CamundaDB']

# Define collections
collection1 = db['booking-details']
collection2 = db['shipment-details']
collection3 = db['crm-dbs']
collection4 = db['formdbs'] #dont use
collection5 = db['shipment-events']
collection6 = db['tempdbs']

# Helper function to convert ObjectId to string----not used as of now.
def serialize_document(document):
    for key, value in document.items():
        if isinstance(value, ObjectId):
            document[key] = str(value)
    return document

#make the UUID4 small and unique
def small_uuid(uuid_str):
    # Convert UUID string to bytes
    uuid_bytes = uuid.UUID(uuid_str).bytes

    # Calculate MD5 hash
    md5_hash = hashlib.md5(uuid_bytes).digest()

    # Return the first 8 bytes of the MD5 hash as a hexadecimal string
    return md5_hash.hex()[:5]

#webhook component for camunda invoke
def call_webhook(webhook_url, payload):
    """
    Sends a POST request to the specified webhook URL with the provided payload.
    """
    try:
        response = requests.post(webhook_url, json=payload)
        response.raise_for_status()
        print(f"Webhook sent successfully. Response: {response.text}")
    except requests.exceptions.RequestException as e:
        print(f"Error sending webhook: {e}")

#-------------------------------------------------------------------------------------------------------------------------
# API endpoints
@app.route('/api/get-booking-details', methods=['GET']) #get the particular booking detail
def get_data_from_collection1():

    booking_number = request.args.get('booking_number')
    account_code = request.args.get('account_code')

    query = {
        'reference.booking_number': booking_number,
        'reference.account_code': account_code
        }

    data = collection1.find_one(query,{"_id": 0})

    return jsonify(data)

@app.route('/api/get-shipment-details', methods=['GET']) #get the particular shipment detail
def get_data_from_collection2():

    booking_number = request.args.get('booking_number')

    query = {
        'reference.booking_number':  booking_number
        }

    data = collection2.find_one(query,{"_id": 0})

    return jsonify(data)

@app.route('/api/get-shipment-events', methods=['GET']) #get the particular shipment event
def get_shipment_events():

    carrier_bill_number = request.args.get('carrier_bill_number')

    query = {'shipment_details.Shipment_status.carrier_bill_number':carrier_bill_number}
    
    data = collection5.find(query,{"_id": 0})

    result = list(data)
    return jsonify(result)

@app.route('/api/find_update', methods=['PUT'])# update a document in collection1 based on filter condition
def find_and_update():
    case_number = request.args.get('case_number')
    query = {
        'form.case_info.case_number': case_number
    }

    updated_data = request.get_json()
 
    result = collection3.find_one_and_update(query,
                                             {"$set":updated_data},
                                             return_document=ReturnDocument.AFTER)
    if result:
        return jsonify({"message":"Data updated!!"}),200
    else:
        return jsonify({"message":"No Data Found"}),404
    
# @app.route('/api/find_update/<case_number>', methods=['PUT'])# update a document in collection1 based on filter condition
# def find_and_update(case_number):
#     try:
#         updated_data = request.get_json()
#         query = {
#         'form.case_info.case_number': case_number
#         }
#         result = collection3.find_one_and_update(query,
#                                                 {"$set":updated_data},
#                                                 return_document=ReturnDocument.AFTER
#                                                 )
#         if result:
#             return jsonify({"message":"Data updated!!"}),200
#         else:
#             return jsonify({"message":"No Data Found"}),404
#     except Exception as e:
#         return jsonify({"error":str(e)}),500  

@app.route('/api/combine_store', methods=[ 'POST' ]) #dont use
def combine_store():
    request_body = request.get_json()
    booking_number = request_body.get("booking_number")
    account_code = request_body.get("account_code")
    po_number = request_body.get("po_number")
    case_id = request_body.get("case_id")
    
    # data1 = [serialize_document(doc) for doc in collection1.find_one({"case_number": case_number} , {'_id': 0})]
    # data2 = [serialize_document(doc) for doc in collection2.find_one({"case_number": case_number}, {'_id': 0})]

    data1 = collection1.find_one({"booking_number": booking_number,"account_code": account_code, "po_number": po_number}, {'_id': 0})
    data2 = collection2.find_one({"booking_number": booking_number,"account_code": account_code, "po_number": po_number}, {'_id': 0})
    data3 = collection4.find_one({"case_id": case_id},{'_id': 0})

    combined_data = {'Bookings': data1, 'Shipments': data2, 'Case_Details': data3 }

    collection3.insert_one(combined_data)

    return jsonify({'Bookings': data1, 'Shipments': data2, 'Case_Details': data3}),200

#-------------------------------------------------------------------------------------------------------------------------
# the below APIs are for the FE

@app.route('/api/post_case',methods=["POST"]) #post case into the CRM-DB with an unique case_number
def post_case():
    try:
        data = request.get_json()

        data_to_store = {
            "reference":{
                "booking_number": data["booking_number"],
                "account_code":data["account_code"],
                "po_number":data["po_number"],
            },
            "form":{
                "case_info":{
                    "subject":data["subject"],
                    "description": data["description"],
                    "case_owner": data["case_owner"],
                    "case_number": data["case_number"],
                    "category": data["category"],
                    "sub_category": data["sub_category"],
                    "priority": data["priority"]
                },
                "customer_info":{
                    "account_code":data["account_code"],
                    "account_name":data["account_name"],
                    "customer_contact_name":data["customer_contact_name"],
                    "customer_contact_email":data["customer_contact_email"],
                    "customer_contact_title":data["customer_contact_title"],
                },
                "triage":{
                    "notes":data["notes"],
                    "root_cause_description":data["root_cause_description"],
                    "root_cause_category":data["root_cause_category"],
                },
                "case_resolution":{
                    "resolution_description":data["resolution_description"],
                    "resolution_category":data["resolution_category"],
                    "case_closed":data["case_closed"],
                },
            },
            "booking_details":{
                "booking_header":{
                    "transaction_nbr":'',
                    "booking_number":'',
                    "account_code":'',
                    "master_customer_code":'',
                    "account_name":'',
                    "consignee_b_l":'',
                    "notification_persion_1":'',
                    "notification_party1_address_line_1":'',
                    "notification_party1_address_line_2":'',
                    "notification_party1_address_line_3":'',
                    "origin_port":'',
                    "origin_country":'',
                    "all_document_received_flag":'',
                    "inco_term_booking":'',
                    "export_country_name":'',
                    "vendor_name":'',
                    "shipper":'',
                    "destination_country":'',
                    "discharge_port_bl":'',
                    "final_destination_bl":'',
                    "load_port":'',
                    "transport_mode":'',
                    "service_type":'',
                    "load_type":'',
                    "shipment_type_code":'',
                    "shipment_type":'',
                    "apll_program_indicator":'',
                    "booked_date":'',
                    "mode":'',
                },
                "po_details":{
                    "po_number":"",
                    "purchase_details":[
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
                }
            },
            "shipment_details":{
                "shipment_reference":{
                    "service_type":"",
                    "mode":"",
                    "incoterm":"",
                    "load_type":"",
                    "booking_number":'',
                    "bl_number":"",
                    "container_number":"",
                    "fcr_number":"",
                    "shipper_name":'',
                    "shipper_code":'',
                    "vessel_name":'',
                    "voyage_number":'',
                    "carrier_code":'',
                    "origin_country":"",
                    "origin_port":"",
                    "destination_country":"",
                    "destination_port":"",
                },
                "Shipment_status":{
                    "account_code":"",
                    "booking_status":'',
                    "shipment_status":'',
                    "latest_event":'',
                    "si_cutoff_date":'',
                    "si_timeliness":'',
                    "si_triggered_user":'',
                    "si_error":'',
                    "asn_send_date":'',
                    "asn_triggered_user":'',
                    "asn_error":'',
                    "estimated_departure_date":'',
                    "actual_departure_date":'',
                    "estimated_arrival_date":'',
                    "actual_arrival_date":'',
                    "eqipment_number":"",
                    "eqipment_type":"",
                    "total_cartoons_container_level":"",
                    "total_volume_cbm_container_level":"",
                    "total_weight_container_level":"",
                    "carrier_code":"",
                    "carrier_name":"",
                    "carrier_seal_number":"",
                    "acs123voyage":"",
                    "voyage":"",
                    "departure_date_actual_estimated":"",
                    "vessel_name":"",
                    "carrier_bill_number":"",
                    "booking_number":"",
                    "arrival_date_actual_estimated":"",
                    "ship_window_start_dt":"",
                    "ship_window_end_dt":"",
                    "ship_window_dt":"",
                    "planned_receipt_dt":"",
                    "edod_dt":"",
                    "adod_dt":"",
                    "etd":"",
                    "departure_dt_actual_estimated":"",
                    "departure_dt":"",
                    "doc_received_dt":"",
                    "pouch_pickup_dt":"",
                    "bl_receipt_dt":"",
                    "first_asn_dt":"",
                    "asn_dt":"",
                    "eta":"",
                    "arrival_dt_est":"",
                    "arrival_dt_act":"",
                    "arrival_dt":"",
                    "final_destination_dt_sch":"",
                    "final_destination_dt_est":"",
                    "final_destination_dt_act":"",
                    "contr_deli_to_consgne_act":"",
                    "final_destination_dt":"",
                }
            },
            "shipment_events":{
                "carrier_bill_number": "",
                "carrier_bill_events":[
                        {
                            "carrier_bill_number":"",
                            "event_dt":"",
                            "event_name":"",
                            "time_stamp":""
                        },
                        {
                            "carrier_bill_number":"",
                            "event_dt":"",
                            "event_name":"",
                            "time_stamp":""
                        },
                        {
                            "carrier_bill_number":"",
                            "event_dt":"",
                            "event_name":"",
                            "time_stamp":""
                        },
                    ],
            }
        }
        result = collection3.insert_one(data_to_store)

        return jsonify({"message":"inserted successfully"}),200
        
    except Exception as e:
        return jsonify(str(e)),500
    
@app.route('/api/get_all_cases', methods=['GET']) #get all the cases
def get_all_case():
    try:
        # Fetch all documents from the collection
        data = list(collection3.find())

        # Convert ObjectId to string
        for item in data:
            item['_id'] = str(item['_id'])

        return jsonify(data)
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
@app.route('/api/get_case/<case_number>', methods = ['GET','POST']) #get particular case by passing case_number
def get_case(case_number):
    case_details = collection3.find_one({"form.case_info.case_number": case_number}, { "_id": 0 })

    if case_details:
            return jsonify(case_details)
    else:
        return jsonify({"message":"Case not found!"}), 404
    
#create a api to update the case

@app.route('/api/delete_cases/<booking_number>', methods=['POST'])# delete case by passing booking number
def delete_cases(booking_number):
    delete_case = collection3.delete_many({"booking_number": booking_number})
    if delete_case:
        return jsonify({"message":" deleted successfully!!"})
    else:
        return jsonify({"message":"Case not found!"}), 404
    
#-------------------------------------------------------------------------------------------------------------------------
# the below API is for dummy testing

@app.route('/api/get_dummy_data/<string:booking_id>', methods=['GET'])
def get_dummy_data(booking_id):
    key, value = booking_id.split(':')

    data = list(collection6.find({key:str(value)},{'_id': 0}))

    response = [doc for doc in data]
    # response = [{'_id': str(doc['_id']), **doc} for doc in response]
    return jsonify(response)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
