import json
from collections import defaultdict

import pandas as pd
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
    selected_options = request.args.getlist('selectedOption')
    print("Received selected options:", selected_options)  # 打印所有查询参数
    # return jsonify({"message": "Options received successfully!"}), 200

    with open('backend/companyData.json', 'r') as file:
        company_data = json.load(file)

    df = pd.DataFrame(company_data)
    # print(df.dtypes)

    # 确定需要进行独热编码的列
    categorical_features = [feature for feature in selected_options if
                            df[feature].dtype == 'object' and company_data[feature].nunique() > 1]
    numeric_features = [feature for feature in selected_options if
                        feature in df.columns and df[feature].dtype in ['float64', 'int64']]
    print("categorical_features", categorical_features)
    print("numeric_features", numeric_features)

    # 独热编码
    encoded_data = pd.get_dummies(df[categorical_features], drop_first=True)
    print("encoded:", encoded_data)
    # 检查是否有编码数据
    if encoded_data.empty:
        print("No categorical data to encode, check your input data.")

    # 选择 PCA 特征和其他数值特征
    features = pd.concat([df[numeric_features], encoded_data], axis=1)

    # 将公司数据转换为适合 K-means 聚类的格式
    # features = []
    # for company in company_data:
    #     feature_values = [company[option] for option in selected_options if option in company]
    #     features.append(feature_values)
    print("features: ", features)

    kmeans = KMeans(n_clusters=4)
    kmeans.fit(features)
    labels = kmeans.labels_.tolist()

    cluster_count = defaultdict(int)
    for label in labels:
        cluster_count[label] += 1
    print(cluster_count)

    # 更新 company_data 中的 cluster 属性
    for i, label in enumerate(labels):
        company_data[i]['cluster'] = label  # 更新 cluster 属性
    # clustered_data = [{'company': company, 'cluster': label} for company, label in zip(company_data, labels)]
    return jsonify(company_data)


if __name__ == '__main__':
    app.run(debug=True)
