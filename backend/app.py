import json

from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # 允许所有源访问


@app.route('/load_data', methods=['GET'])
def get_company_data():
    with open('backend/companyData.json', 'r') as file:
        data = json.load(file)
    return jsonify(data)


@app.route('/submit_options', methods=['GET'])
def submit_options():
    selected_options = request.args.getlist('selectedOptions')
    print("Received selected options:", selected_options)
    return jsonify({"message": "Options received successfully!"}), 200
    # data = request.json
    # selected_options = data.get('selectedOptions', [])
    # print("Received selected options:", selected_options)
    # return jsonify({"message": "Options received successfully!"}), 200


if __name__ == '__main__':
    app.run(debug=True)
