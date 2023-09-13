import { useState, useEffect } from "react"

const ProductEditForm = ({ selectedProduct, setEditProducts }) => {
    const [productName, setProductName] = useState("");
    const [productType, setProductType] = useState("");
    const [productCount, setProductCount] = useState("");
    const [productPrice, setProductPrice] = useState("");
    const [productSize, setProductSize] = useState("");

    useEffect(() => {
        if (selectedProduct) {
            setProductName(selectedProduct.name);
            setProductType(selectedProduct.type);
            setProductCount(selectedProduct.count);
            setProductPrice(selectedProduct.price);
            setProductSize(selectedProduct.size);
            // ... 다른 필드들도 설정 ...
        }
    }, [selectedProduct]);
    // const [productName, setProductName] = useState(selectedProduct.name)
    // const [productName, setProductName] = useState(selectedProduct.name)
    // const [productName, setProductName] = useState(selectedProduct.name)

    
    const [updateProductName, setUpdateProductName] = useState("") 

    const handleUpdateButtonClick = async (product) => {
        console.log("버튼 클릭:", product);
        const token = localStorage.getItem('token'); // 토큰 가져오기

        const updatedProduct = {
            name: productName,
            type: productType,
            count: productCount,
            price: productPrice,
            size: productSize,
            // ... 다른 필드들
        };
    
        try {
            const response = await fetch(`http://localhost:8000/admin/products/update/${product.id}/`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedProduct)
            });
    
            if (response.ok) {
                alert('물품수정이 완료 되었습니다.'); // 삭제 성공 알림
    
                // 데이터 다시 불러오기
                const refreshResponse = await fetch('http://localhost:8000/admin/products/read/all/', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,  
                        'Content-Type': 'application/json'
                    }
                });
    
                if(refreshResponse.ok) {
                    const newData = await refreshResponse.json();
                    setEditProducts(newData || []);

                } else {
                    console.error('Failed to refresh data:', refreshResponse.status, refreshResponse.statusText);
                }
    
            } else {
                console.error('Failed to update product:', response.status, response.statusText);
            }
        } catch (error) {
            console.error(error);
        }
    };
    
    return(
        <form name="product-update" onSubmit={(e) => { e.preventDefault(); handleUpdateButtonClick(selectedProduct); }}>
            <button type="submit">상품정보 수정하기</button>
            <label className="product-name">
                <p>상품 이름</p>
                <input type="text" name="product-name" value={productName} onChange={e => setProductName(e.target.value)} />
            </label>
            <label className="product-type">
                <p>상품 유형</p>
                <input type="text" name="product-type" value={productType} onChange={e => setProductType(e.target.value)} />
            </label>
            <label className="product-count">
                <p>상품 개수</p>
                <input type="text" name="product-count" value={productCount} onChange={e => setProductCount(e.target.value)} />
            </label>
            <label className="product-price">
                <p>상품 가격</p>
                <input type="text" name="product-price" value={productPrice} onChange={e => setProductPrice(e.target.value)} />
            </label>
            <label className="product-size">
                <p>상품 사이즈</p>
                <input type="text" name="product-size" value={productSize} onChange={e => setProductSize(e.target.value)} />
            </label>
            {/* <label className="main-image">
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
            </label> */}
        </form>
    )
}

export default ProductEditForm;