import React, { useState, useEffect, useRef } from 'react';
import './CircleExpansion.css'; // Ensure this path is correct

const CircleExpansion = () => {
    const [isDragging, setIsDragging] = useState(false);
    const svgRef = useRef(null);

    useEffect(() => {
        const svg = svgRef.current;

        const handleMouseMove = () => {
            if (isDragging) {
                svg.classList.remove('active');
            } else {
                svg.classList.add('active');
            }
        };

        const handleMouseDown = () => {
            setIsDragging(true);
            svg.classList.remove('active');
        };

        const handleMouseUp = () => {
            setIsDragging(false);
            svg.classList.add('active');
            
            // Reset active state after animation
            setTimeout(() => {
                svg.classList.remove('active');
            }, 300); // Match this duration to the CSS transition time
        };

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mousedown', handleMouseDown);
        document.addEventListener('mouseup', handleMouseUp);

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mousedown', handleMouseDown);
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isDragging]);

    return (
        
        <svg
            ref={svgRef}
            className="map_spot_svg"
            width="100%"
            height="100%"
            viewBox="0 0 44 44"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <circle className="circle" opacity="0.8" cx="22" cy="22" r="15" stroke="#FFFFFF" strokeWidth="2"></circle>
            <circle className="circle" opacity="0.6" cx="22" cy="22" r="20" stroke="#FFFFFF" strokeWidth="2"></circle>
            {/* <circle cx="22" cy="22" r="11" fill="#FFFFFF"></circle> */}
            {/* <circle cx="22" cy="22" r="7.8" fill="#FFFFFF" stroke="#FFFFFF" strokeWidth="4"></circle> */}
        </svg>
      
    );
};

export default CircleExpansion;
