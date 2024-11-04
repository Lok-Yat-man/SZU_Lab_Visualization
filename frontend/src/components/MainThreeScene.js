import React, {useEffect, useRef, useState} from 'react'
import {Html, OrbitControls} from '@react-three/drei'
import {Canvas, useThree} from '@react-three/fiber';
import {Bloom, EffectComposer, N8AO} from '@react-three/postprocessing'
import * as THREE from 'three';
import './MainThreeScene.css';

// const spheresColor = ["#69d2e7", "#f38630", "#d1313d", "#615375", "#a7dbd8", "#e0e4cc", "#fa6900", "#8eb2c5", "#615375"]
const spheresColor = ["#FF0000", "#00FF00", "#0000FF", "#FFFF00", "#00FFFF", "#FF00FF", "#FFFFFF"]
// console.log('rawdata is', rawData[0])
// let spheresData = rawData.map(item => ({
//         x: parseFloat(item.pca1.toFixed(5)) * 100,
//         y: parseFloat(item.pca2.toFixed(5)) * 100,
//         z: parseFloat(item.pca3.toFixed(5)) * 100,
//         color: spheresColor[item.cluster]
//     })
// )
// console.log("spheresData is ", spheresData)

/**set Background */
const BackgroundColor = ({color}) => {
    const {scene} = useThree();

    useEffect(() => {
        scene.background = new THREE.Color(color);
    }, [color, scene]);

    return null;
};

function MainThreeScene({onHoverItem, onClickItem, companyData}) {
    const [hovered, setHovered] = useState()
    const [spheresData, setSpheresData] = useState([]); // 使用 useState 管理 spheresData

    const prevRef = useRef()
    useEffect(() => void (prevRef.current = hovered), [hovered])

    useEffect(() => {
        if (companyData) {
            console.log('CompanyData is', companyData[0])
            const updatedSpheresData = companyData.map(item => ({
                    x: parseFloat(item.pca1?.toFixed(5)) * 100,
                    y: parseFloat(item.pca2?.toFixed(5)) * 100,
                    z: parseFloat(item.pca3?.toFixed(5)) * 100,
                    color: spheresColor[item.cluster] // 根据 cluster 属性更新颜色
                })
            )
            setSpheresData(updatedSpheresData); // 更新状态
            console.log("spheresData is ", updatedSpheresData)
        }
    }, [companyData]);


    const handleItemClick = (e) => {
        e.stopPropagation()
        onClickItem(hovered);
    }
    const handleHover = (index) => {
        console.log('hover', index)
        setHovered(index);
        onHoverItem(index)
    };

    const handleUnhover = () => {
        console.log('unhover!')
        setHovered(null);
        onHoverItem(null)
    };
    return (
        <Canvas gl={{antialias: false}} camera={{position: [0, 0, 30], near: 0.1, far: 1000}}>
            <BackgroundColor color="#0B1026"/>
            <ambientLight intensity={3}/>
            {/* environment light */}
            <pointLight position={[10, 10, 10]} intensity={2}/>
            {/* my point light */}
            <directionalLight position={[-10, -10, -10]} intensity={0.5}/>
            {/* my direction light */}
            <OrbitControls/>
            <color attach="background" args={['#f0f0f0']}/>
            {/* my scene */}
            {spheresData.map((sphere, index) => (
                <mesh
                    key={index}
                    position={[sphere.x, sphere.y, sphere.z]}
                    onPointerOver={() => handleHover(index)}
                    onPointerOut={handleUnhover}
                    onClick={handleItemClick}
                >
                    <sphereGeometry args={[1, 32, 32]}/>
                    <meshStandardMaterial
                        color={hovered === index ? 'white' : sphere.color}
                        transparent={true}
                        opacity={hovered === index ? 1 : 0.8}
                    />

                    {/* set hover div */}
                    {hovered === index ?
                        <Html position={[0.5, 0, 0]} style={{pointerEvents: 'none'}}>
                            {/* set position of hover div */}
                            <div className="hoverDivContent">
                                <div
                                    className="companyChineseName"> {companyData[index]?.name || "data not exist"}</div>
                                <div
                                    className="companyEnglishName">  {companyData[index]?.name_en || "data not exist"}</div>
                            </div>
                        </Html>
                        : null}
                </mesh>
            ))}

            {/* set effector */}
            <EffectComposer disableNormalPass>
                <N8AO aoRadius={0.5} intensity={1}/>
                <Bloom luminanceThreshold={1} intensity={0.5} levels={9} mipmapBlur/>
            </EffectComposer>
        </Canvas>
    )
}

export default MainThreeScene;