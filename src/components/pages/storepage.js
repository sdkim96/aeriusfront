import React, { useState } from 'react';
import './storepage.css'; // 필요한 CSS를 import 합니다.

import goods1 from '../images/goods/1.webp';
import goods2 from '../images/goods/2.webp';
import goods3 from '../images/goods/3.webp';
import goods4 from '../images/goods/1.webp';
import goods5 from '../images/goods/1.webp';
import goods6 from '../images/goods/1.webp';
import goods7 from '../images/goods/1.webp';
import goods8 from '../images/goods/1.webp';
import goods9 from '../images/goods/1.webp';

import goods1Alt from '../images/goods/4.webp';
import goods2Alt from '../images/goods/5.webp';
import goods3Alt from '../images/goods/6.jpg';
import goods4Alt from '../images/goods/4.webp';
import goods5Alt from '../images/goods/5.webp';
import goods6Alt from '../images/goods/6.jpg';
import goods7Alt from '../images/goods/4.webp';
import goods8Alt from '../images/goods/5.webp';
import goods9Alt from '../images/goods/6.jpg';

import placeholderImage from '../images/placeholder.webp';


const StorePage = () => {
    const [activeImage, setActiveImage] = useState({
        good1: goods1,
        good2: goods2,
        good3: goods3,
        good4: goods4,
        good5: goods5,
        good6: goods6,
        good7: goods7,
        good8: goods8,
        good9: goods9,
        // ... other goods
    });

    const handleMouseEnter = (id, altImage) => {
        setActiveImage(prev => ({...prev, [id]: altImage}));
    }

    const handleMouseLeave = (id, defaultImage) => {
        setActiveImage(prev => ({...prev, [id]: defaultImage}));
    }

    return (
        <div className='store'>
            <div className='query'>
                <input type="search" placeholder="상품 검색"/>
                <select name="categories" id="categories">
                    <option value="">- 카테고리 선택 -</option>
                    <option value="category1">Category 1</option>
                    <option value="category2">Category 2</option>
                </select>
            </div>
            <div className='goods'>
                <div className='rows'>
                    <div className='row1'>
                        <div className='good1'
                            onMouseEnter={() => handleMouseEnter('good1', goods1Alt)}
                            onMouseLeave={() => handleMouseLeave('good1', goods1)}>
                            <img src={activeImage.good1} 
                            alt="이미지 준비중입니다."
                            onError={(e)=>{e.target.onerror = null; e.target.src={placeholderImage}}}/>
                            <p>어쩌구저쩌구</p>
                        </div>
                        <div className='good2'
                            onMouseEnter={() => handleMouseEnter('good2', goods2Alt)}
                            onMouseLeave={() => handleMouseLeave('good2', goods2)}>
                            <img src={activeImage.good2} 
                            alt="이미지 준비중입니다."
                            onError={(e)=>{e.target.onerror = null; e.target.src="이미지 준비중입니다."}}/>
                            <p>어쩌구저쩌구</p>
                        </div>
                        <div className='good3'
                            onMouseEnter={() => handleMouseEnter('good3', goods3Alt)}
                            onMouseLeave={() => handleMouseLeave('good3', goods3)}>
                            <img src={activeImage.good3} 
                            alt="이미지 준비중입니다."
                            onError={(e)=>{e.target.onerror = null; e.target.src="이미지 준비중입니다."}}/>
                            <p>어쩌구저쩌구</p>
                        </div>
                    </div>
                    <div className='row2'>
                        <div className='good4'
                            onMouseEnter={() => handleMouseEnter('good4', goods4Alt)}
                            onMouseLeave={() => handleMouseLeave('good4', goods4)}>
                            <img src={activeImage.good4} 
                            alt="이미지 준비중입니다."
                            onError={(e)=>{e.target.onerror = null; e.target.src=placeholderImage}}/>
                            <p>어쩌구저쩌구</p>
                        </div>
                        <div className='good5'
                            onMouseEnter={() => handleMouseEnter('good5', goods5Alt)}
                            onMouseLeave={() => handleMouseLeave('good5', goods5)}>
                            <img src={activeImage.good5} 
                            alt="이미지 준비중입니다."
                            onError={(e)=>{e.target.onerror = null; e.target.src=placeholderImage}}/>
                            <p>어쩌구저쩌구</p>
                        </div>
                        <div className='good6'
                            onMouseEnter={() => handleMouseEnter('good6', goods6Alt)}
                            onMouseLeave={() => handleMouseLeave('good6', goods6)}>
                            <img src={activeImage.good6} 
                            alt="이미지 준비중입니다."
                            onError={(e)=>{e.target.onerror = null; e.target.src={placeholderImage}}}/>
                            <p>어쩌구저쩌구</p>
                        </div>
                    </div>
                    <div className='row3'>
                        <div className='good7'
                            onMouseEnter={() => handleMouseEnter('good7', goods7Alt)}
                            onMouseLeave={() => handleMouseLeave('good7', goods7)}>
                            <img src={activeImage.good7} 
                            alt="이미지 준비중입니다."
                            onError={(e)=>{e.target.onerror = null; e.target.src={placeholderImage}}}/>
                            <p>어쩌구저쩌구</p>
                        </div>
                        <div className='good8'
                            onMouseEnter={() => handleMouseEnter('good8', goods8Alt)}
                            onMouseLeave={() => handleMouseLeave('good8', goods8)}>
                            <img src={activeImage.good8} 
                            alt="이미지 준비중입니다."
                            onError={(e)=>{e.target.onerror = null; e.target.src="이미지 준비중입니다."}}/>
                            <p>어쩌구저쩌구</p>
                        </div>
                        <div className='good9'
                            onMouseEnter={() => handleMouseEnter('good9', goods9Alt)}
                            onMouseLeave={() => handleMouseLeave('good9', goods9)}>
                            <img src={activeImage.good9} 
                            alt="이미지 준비중입니다."
                            onError={(e)=>{e.target.onerror = null; e.target.src="이미지 준비중입니다."}}/>
                            <p>어쩌구저쩌구</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className='pages'>
                <button>{'<'}</button>
                {[...Array(10).keys()].map((i) =>
                    <button key={i}>{i+1}</button>
                )}
                <button>{'>'}</button>
            </div>
        </div>
    );
}

export default StorePage;
