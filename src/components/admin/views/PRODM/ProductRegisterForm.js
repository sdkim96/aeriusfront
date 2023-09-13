import React from 'react';

const ProductRegisterForm = ({ productName, setProductName, productType, 
    setProductType, productPrice, setProductPrice, productCount, setProductCount, 
    productSize, setProductSize, mainImage, setMainImage, switchingImage, setSwitchingImage ,
    subImages, setSubImages, productInfo, setProductInfo }) => {

        const handleProductRegisterSubmit = async (e) => {
            e.preventDefault();
        
            const formData = new FormData();
            formData.append('productName', productName);
            formData.append('productType', productType);
            formData.append('productPrice', productPrice);
            formData.append('productSize', productSize);
            formData.append('productCount', productCount);
            formData.append('productInfo', productInfo);
            formData.append('mainImage', mainImage);
            formData.append('switchingImage', switchingImage);
            subImages.forEach((image, index) => {
                formData.append(`subImage${index}`, image);
            });

            const token = localStorage.getItem('token');

            for (let [key, value] of formData.entries()) {
                console.log(key, value);
              }
        
            try {
                const response = await fetch('http://localhost:8000/admin/products/register/', {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token}`,  
                    },
                    body: formData
                });
        
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
        
                const data = await response.json();
        
                // Here you can handle the response data
                console.log(data);
        
            } catch (error) {
                // This block will catch any network errors, and any errors thrown in the try block
                console.error('A problem occurred while trying to fetch the resource:', error);
            }
        }
        
    

    return(
        <form name="product-register" onSubmit={handleProductRegisterSubmit}>
            <button type="submit">상품 저장하기</button>
            <h2>상품 등록</h2>
            <label className="product-name">
                <p>상품 이름</p>
                <input type="text" name="product-name" value={productName} onChange={e => setProductName(e.target.value)} />
            </label>
            <label className="product-type">
                <p>상품 유형</p>
                <input type="text" name="product-type" value={productType} onChange={e => setProductType(e.target.value)} />
            </label>
            <label className="product-type">
                <p>상품 개수</p>
                <input type="text" name="product-type" value={productCount} onChange={e => setProductCount(e.target.value)} />
            </label>
            <label className="product-price">
                <p>상품 가격</p>
                <input type="text" name="product-price" value={productPrice} onChange={e => setProductPrice(e.target.value)} />
            </label>
            <label className="product-size">
                <p>상품 사이즈</p>
                <input type="text" name="product-size" value={productSize} onChange={e => setProductSize(e.target.value)} />
            </label>
            <label className="main-image">
                <p>상품 메인 이미지</p>
                <input type="file" name="main-image" onChange={e => setMainImage(e.target.files[0])} />
            </label>
            <label className="switching-image">
                <p>상품 메인 이미지(스위칭)</p>
                <input type="file" name="main-switching-image" onChange={e => setSwitchingImage(e.target.files[0])} />
            </label>
            <label className="sub-images">
                <p>상품 이미지들</p>
                <input type="file" name="sub-images" multiple onChange={e => setSubImages([...e.target.files])} />
            </label>
            <label className="product-info">
                <p>상품 관련 정보</p>
                <textarea 
                    name="product-info" 
                    value={productInfo} 
                    onChange={e => setProductInfo(e.target.value)}
                />
            </label>
        </form>
    );
};

export default ProductRegisterForm;
