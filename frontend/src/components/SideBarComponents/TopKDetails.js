import React, { useEffect } from "react";
import SolidCircleExpansion from "./SolidCircleExpansion";
import './TopKDetails.css'

const topKCompanys = [
    { name_CN: "测试1测试1测试1测试1测试1测试1", name_EN: "test1test1test1test1test1" },
    { name_CN: "测试2", name_EN: "test2" },
    { name_CN: "测试3", name_EN: "test3" },
];

const TopKDetails = ({ companyData, selectedItem }) => {
    useEffect(() => {
        console.log("topKCompanys", topKCompanys)

    }, [])
    return (
        <div>
            <div className="solidAnime">
                <SolidCircleExpansion />
            </div>
            <div className="topKContent">
                <div className="title">
                    <div className="title_CN">相似企业</div>
                    <div className="title_EN">TOPK</div>
                </div>

                <div className="topKList">
                    {topKCompanys.map((topKCompany, index) => (
                        <div className="topKCompany" key={index}>
                            <div className="topKCompany_CN">{topKCompany.name_CN}</div>
                            <div className="topKCompany_EN">{topKCompany.name_EN}</div>
                        </div>
                    ))}
                </div>

            </div>


        </div>

    )
}
export default TopKDetails;