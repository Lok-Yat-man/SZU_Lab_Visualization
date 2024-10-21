
import React, { useState, useEffect, useRef } from 'react';
import './CompanyDetails.css'; // Ensure this path is correct
 const CompanyDetails = ({selectedItem, companyData}) => {
    useEffect(()=>{
        console.log("selectedItem is", selectedItem)
        console.log("companyData is", companyData)
    },[])
   
    return(
        <div className='contentContainer'>
        <div className="companyName">{companyData[selectedItem].name || 'data not existed'}</div>
        <div className='companyName_EN'>{companyData[selectedItem].name_en || 'data not existed'}</div>
        <div className='companyData'>
        <div className='companyDataList'>
          <div className='sector'>
            <div className='sector_CN'>行业</div>
            <div className='sector_EN'>Sector</div>
          </div>
          <div className='city'>
            <div className='city_CN'>城市</div>
            <div className='city_EN'>City</div>
          </div>
          <div className='socialSecurity'>
            <div className='socialSecurity_CN'>社保人数</div>
            <div className='socialSecurity_EN'>Social security<br/> participants</div>
          </div>
          <div className='annualRevenue'>
            <div className='annualRevenue_CN'>年营业额</div>
            <div className='annualRevenue_EN'>annual<br/> revenue</div>
          </div>
        </div>
        <div className='companyDataDetails'>
          <div className='sectorData'>
          {companyData[selectedItem].cate_first || 'data not existed'}
          </div>
          <div className='cityData'>
          {companyData[selectedItem].city || 'data not existed'}
          </div>
          <div className='socialSecurityData'>
          {companyData[selectedItem].social_security_staff_num || 'data not existed'}
          </div>
          <div className='annualRevenueData'>
          {companyData[selectedItem].reg_capital || 'data not existed'}
          </div>
        </div>
        </div>
        {/* <div className='infoItem'>name_en:</div>
        <div className='infoItem'>行业:{companyData[selectedItem].cate_first || 'data not existed'}</div>
        <div className='infoItem'>城市:{companyData[selectedItem].city || 'data not existed'}</div>
        <div className='infoItem'>社保人数:{companyData[selectedItem].social_security_staff_num || 'data not existed'}</div>
        <div className='infoItem'>年营业额:{companyData[selectedItem].reg_capital || 'data not existed'}</div>
        <p>Selected item ID: {selectedItem}</p> */}
      </div>
    )

 }
 export default CompanyDetails;