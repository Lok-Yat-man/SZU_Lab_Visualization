import json

from flask import Flask, jsonify, request
from flask_cors import CORS
from sklearn.cluster import KMeans

app = Flask(__name__)
CORS(app)  # 允许所有源访问


@app.route('/load_data', methods=['GET'])
def get_company_data():
    with open('backend/companyData.json', 'r') as file:
        data = json.load(file)
    return jsonify(data)


@app.route('/kmeans', methods=['GET'])
def submit_options():
    print("Query Parameters:", request.args)  # 打印所有查询参数
    selected_options = request.args.getlist('selectedOptions')
    print("Received selected options:", selected_options)  # 打印所有查询参数
    # return jsonify({"message": "Options received successfully!"}), 200

    with open('backend/companyData.json', 'r') as file:
        company_data = json.load(file)
    # 将公司数据转换为适合 K-means 聚类的格式
    features = []
    for company in company_data:
        feature_values = [company[option] for option in selected_options if option in company]
        features.append(feature_values)
    kmeans = KMeans(n_clusters=3)
    kmeans.fit(features)
    labels = kmeans.labels_.tolist()
    clustered_data = [{'company': company, 'cluster': label} for company, label in zip(company_data, labels)]
    return jsonify(clustered_data)


if __name__ == '__main__':
    app.run(debug=True)
