import json

import numpy as np
import pandas as pd
from sklearn.neighbors import NearestNeighbors
from sklearn.preprocessing import OneHotEncoder


def find_nearest():
    with open('companyData.json', 'r') as file:
        company_data = json.load(file)

    # 将数据转换为 DataFrame
    df = pd.DataFrame(company_data)

    encoder = OneHotEncoder()
    cata_first_encoded = encoder.fit_transform(df[['cate_first']]).toarray()

    print("cata_first_encoded shape:", cata_first_encoded.shape)
    print("reg_capital_amount_10k shape:", df[['reg_capital_amount_10k']].values.shape)

    X = np.hstack((cata_first_encoded, df[['social_security_staff_num']].values, df[['reg_capital_amount_10k']].values))
    # X = np.hstack((cata_first_encoded[:, np.newaxis], df[['reg_capital_amount_10k']].values))

    nbrs = NearestNeighbors(n_neighbors=4, algorithm='auto').fit(X)

    # 查询相似企业并更新 DataFrame
    similar_companies = []
    for i in range(len(df)):
        distances, indices = nbrs.kneighbors([X[i]])
        # 获取相似企业的名称
        similar_names = df.iloc[indices[0][1:]]['cid'].tolist()  # 取第一个是自身
        similar_companies.append(similar_names)

    # 将相似企业信息添加到 DataFrame
    df['similar_companies'] = similar_companies

    # 将更新后的 DataFrame 转换回字典并写入 JSON 文件
    df = df.where(pd.notnull(df), None)
    updated_company_data = df.to_dict(orient='records')

    def convert_nan_to_none(data):
        if isinstance(data, list):
            return [convert_nan_to_none(item) for item in data]
        elif isinstance(data, dict):
            return {key: convert_nan_to_none(value) for key, value in data.items()}
        elif pd.isna(data):
            return None
        return data

    updated_company_data = convert_nan_to_none(updated_company_data)

    with open('companyData.json', 'w', encoding='utf-8') as file:
        json.dump(updated_company_data, file, ensure_ascii=True, indent=4)


find_nearest()
