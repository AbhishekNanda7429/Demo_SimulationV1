from flask import Flask, json, jsonify, request
from pymongo import MongoClient
from bson import ObjectId
import uuid
import hashlib
from bson.json_util import dumps
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

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

#-------------------------------------------------------------------------------------------------------------------------
# API endpoints
@app.route('/api/get-booking-details', methods=['GET']) #get the particular booking detail
def get_data_from_collection1():

    booking_number = request.args.get('booking_details.booking_header.booking_number')
    account_code = request.args.get('booking_details.booking_header.account_code')
    
    query = {}
    if booking_number:
        query['booking_number'] = booking_number
    if account_code:
        query['account_code'] = account_code

    data = list(collection1.find(query,{"_id": 0}))

    return (data)

@app.route('/api/get-shipment-details', methods=['GET']) #get the particular shipment detail
def get_data_from_collection2():

    booking_number = request.args.get('shipment_details.shipment_reference.booking_number')

    query = {}
    if booking_number:
        query['booking_number'] = booking_number

    data = list(collection2.find(query,{"_id": 0}))

    return jsonify(data)

@app.route('/api/get-shipment-events', methods=['GET']) #get the particular shipment event
def get_shipment_events():

    carrier_bill_number = request.args.get('carrier_bill_no')

    query = {}
    if carrier_bill_number:
        query['carrier_bill_no'] = carrier_bill_number
        data = list(collection5.find(query,{"_id": 0}))

    return jsonify(data)

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
            result = collection3.insert_one(data)
            return jsonify({"message":"inserted successfully"})
        
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
    
@app.route('/api/get_case/<case_number>', methods = ['GET']) #get particular case by passing case_number
def get_case(case_number):
    case_details = collection3.find_one({"case_number": case_number}, { "_id": 0 })
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
