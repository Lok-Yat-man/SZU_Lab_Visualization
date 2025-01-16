# 后端代码
* * *
## 项目结构
本项目后端使用flask架构，clustering文件夹中为聚类算法的实现，data文件夹中存放该项目的json数据，后端接口写在app.py，项目所需库存放在requirements.txt。  
后端结构树如下:
```
backend
│   app.py
│   nearest_neighbors.py
│   README.md
│   requirements.txt
│
├───clustering
│       Kmeans.py   
│
├───data
│       companyData.json
```
* * *
## 使用说明
1. 在终端下进入**requirements.txt**所在地址，执行：  
```pip install -r requirements.txt```  
用于安装必要库
2. 修改frontend目录下App.js文件中的所有fetch地址前缀，若是本地开发为developmentURL，若是服务器部署为productionURL
* * *
## bug解决
若启动项目后在终端下报错```FileNotFoundError: [Errno] No such file or directory```，则编辑运行配置中的工作目录为backend目录。


