import React, {useEffect} from "react";
import SolidCircleExpansion from "./SolidCircleExpansion";
import './TopKDetails.css'

const topKCompanys = [
    {name_CN: "测试1测试1测试1测试1测试1测试1", name_EN: "test1test1test1test1test1"},
    {name_CN: "测试2", name_EN: "test2"},
    {name_CN: "测试3", name_EN: "test3"},
];

const TopKDetails = ({companyData, selectedItem}) => {
    useEffect(() => {
        // console.log("topKCompanys", topKCompanys)
        console.log("selectedItem: ", companyData[selectedItem]);
        console.log("selectedItem is", selectedItem);
    }, [])
    return (
        <div>
            <div className="solidAnime">
                <SolidCircleExpansion/>
            </div>
            <div className="topKContent">
                <div className="title">
                    <div className="title_CN">相似企业</div>
                    <div className="title_EN">TOPK</div>
                </div>

                <div className="topKList">
                    {companyData[selectedItem].similar_companies.map(
                        (topKCompanyCid, index) => (
                            <div className="topKCompany" key={index}>
                                <div
                                    className="topKCompany_CN">{companyData.find(item => item.cid === topKCompanyCid).name}</div>
                                <div
                                    className="topKCompany_EN">{companyData.find(item => item.cid === topKCompanyCid).name_en}</div>
                            </div>
                        )
                    )}
                </div>

            </div>


        </div>

    )
}
export default TopKDetails;