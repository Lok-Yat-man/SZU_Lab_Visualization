import React  from 'react'
import './Overlay.css'
import FilterCheckbox from './OverlayComponents/FilterCheckbox';
const Overlay = ()=> {
    return(
        <div className='overlayContainer'>
            <div className='title'>实验室项目Data Visualization</div>
            {/* <div className='subtitle'>解释xxx图表</div> */}
        
            <div className='ornamentalLine'></div>
            <div><FilterCheckbox/></div>
            </div>
    )
}
export default Overlay;