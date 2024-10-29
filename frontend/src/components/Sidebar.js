import React from 'react'
import './Sidebar.css'
import CircleExpansion from './SideBarComponents/CircleExpansion'
import CompanyDetails from './SideBarComponents/CompanyDetails'
import TopKDetails from './SideBarComponents/TopKDetails'

const Sidebar = ({selectedItem, companyData}) => {
    console.log('data is', companyData)
    return (
        <div className="sidebar">

            <div className='circleAnime'><CircleExpansion/></div>
            {/* <div className='circleAnime'><SolidCircleExpansion/></div> */}

            {selectedItem !== null ? (<>
                    <CompanyDetails companyData={companyData} selectedItem={selectedItem}/>
                    <TopKDetails companyData={companyData} selectedItem={selectedItem}/>
                </>
            ) : (

                <div className='contentContainer'>
                    <p>No item selected</p>
                </div>
            )}
            {/* 这里可以根据 selectedItem 的不同值显示不同的内容 */}
        </div>
    )
}

export default Sidebar;