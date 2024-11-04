import json
from collections import defaultdict

import pandas as pd
import pca
from flask import Flask, jsonify, request
from flask_cors import CORS
from sklearn.cluster import KMeans
from sklearn.decomposition import PCA
from sklearn.preprocessing import StandardScaler, MinMaxScaler

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

    # 选择数值和字符特征
    numeric_features = df[selected_options].select_dtypes(include=['number'])
    categorical_features = df[selected_options].select_dtypes(include=['object'])

    # 编码字符特征
    if not categorical_features.empty:
        df_encoded = pd.get_dummies(categorical_features, drop_first=True)
    else:
        df_encoded = pd.DataFrame()

    # 合并数值特征和编码后的字符特征
    if not numeric_features.empty:
        df_combined = pd.concat([numeric_features.reset_index(drop=True), df_encoded.reset_index(drop=True)], axis=1)
    else:
        df_combined = df_encoded

    # 检查是否有有效特征
    if df_combined.empty:
        return jsonify({"error": "No valid features selected."}), 400

    # 标准化数值特征
    scaler = StandardScaler()
    scaled_features = scaler.fit_transform(df_combined)

    # 执行 PCA
    dimension = len(selected_options) if len(selected_options) <= 3 else 3
    pca = PCA(n_components=dimension)
    pca_result = pca.fit_transform(scaled_features)

    scaler = MinMaxScaler(feature_range=(-1, 1))
    pca_result_scaled = scaler.fit_transform(pca_result)
    # 更新 company_data 中的 PCA 属性
    for i in range(len(company_data)):
        company_data[i]['pca1'] = pca_result_scaled[i, 0]
        company_data[i]['pca2'] = pca_result_scaled[i, 1] if dimension >= 2 else pca_result_scaled[i, 0]
        company_data[i]['pca3'] = pca_result_scaled[i, 2] if dimension >= 3 else 0

    kmeans = KMeans(n_clusters=7)
    kmeans.fit(scaled_features)
    labels = kmeans.labels_.tolist()

    # 统计每个类的元素量
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
