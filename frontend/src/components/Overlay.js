import React from 'react'
import './Overlay.css'
import FilterCheckbox from './OverlayComponents/FilterCheckbox';

const Overlay = ({onSubmit}) => {
    return (
        <div className='overlayContainer'>
            <div className='title'>实验室项目Data Visualization</div>
            {/* <div className='subtitle'>解释xxx图表</div> */}

            <div className='ornamentalLine'></div>
            <div className='checkbox'><FilterCheckbox onSubmit={onSubmit}/></div>
        </div>
    )
}
export default Overlay;