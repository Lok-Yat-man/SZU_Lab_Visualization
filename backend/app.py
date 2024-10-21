import json

from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # 允许所有源访问


@app.route('/', methods=['GET'])
def get_company_data():
    with open('backend/companyData.json', 'r') as file:
        data = json.load(file)
    return jsonify(data)


if __name__ == '__main__':
    app.run(debug=True)
