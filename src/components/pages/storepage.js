import React, { useEffect, useState } from 'react';
import './storepage.css';
import placeholderImage from '../images/placeholder.webp';
import { Link } from 'react-router-dom';

const StorePage = () => {
    const [activeImage, setActiveImage] = useState({});
    const [defaultImages, setDefaultImages] = useState({});
    const [hoverImages, setHoverImages] = useState({});
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:8000/myapp/store_products/', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
    
                if (response.ok) {
                    const data = await response.json();
                    setProducts(data);
                    
                    const initialImages = {};
                    const initialHoverImages = {};
                    
                    data.forEach(product => {
                        const defaultImage = product.images[0]?.image || placeholderImage;
                        const hoverImage = product.images[1]?.image || placeholderImage;
                        
                        initialImages[`good${product.id}`] = defaultImage;
                        initialHoverImages[`good${product.id}`] = hoverImage;
                    });

                    setActiveImage(initialImages);
                    setDefaultImages(initialImages);
                    setHoverImages(initialHoverImages);
                } else {
                    console.error('Failed to fetch data');
                }
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []);
    
    const handleMouseEnter = (id) => {
        setActiveImage(prev => ({...prev, [id]: hoverImages[id]}));
    }

    const handleMouseLeave = (id) => {
        setActiveImage(prev => ({...prev, [id]: defaultImages[id]}));
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
                {products.map(product => (
                <div className='good-container' key={product.id}>
                    {/* 아래 줄에 Link 추가 */}
                    <Link to={`/store/product/${product.id}`}> {/* 이렇게 추가하면 클릭시 해당 상품의 상세 페이지로 이동합니다 */}
                    <div className={`good-item good${product.id}`}
                        onMouseEnter={() => handleMouseEnter(`good${product.id}`, product.images[1]?.image || placeholderImage)}
                        onMouseLeave={() => handleMouseLeave(`good${product.id}`, product.images[0]?.image || placeholderImage)}>
                        <div className="item-content">
                        <img src={activeImage[`good${product.id}`] || placeholderImage}
                            alt="이미지 준비중입니다."
                            onError={(e) => { e.target.onerror = null; e.target.src = placeholderImage }} />
                        </div>
                    </div>
                    </Link>  {/* Link 컴포넌트 닫기 */}
                    <div className="good-info">
                    <p>{product.name}</p>
                    <p>{product.info}</p>
                    </div>
                </div>
                ))}
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
