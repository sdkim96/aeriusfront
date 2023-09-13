import { useState, useEffect } from "react";
import { authorize } from "../../../backpages/authorize";

const ProductEditRightView = ({ setSelectedProduct, editProducts, setEditProducts }) => {
    
    const [pdrAuthorized, setPdrAuthorized] = useState(false); // 인증 상태를 저장할 state 추가
    const [pdrLoading, setPdrLoading] = useState(true); 

    useEffect(()=>{
        const token = localStorage.getItem('token');
        const checkAuthorization = async () => {
            const url = 'to_admin_products_read_all_url';
            const isAuthorized = await(authorize(url));
            if (isAuthorized){
                try {
                    const response = await fetch('http://localhost:8000/admin/products/read/all/', {
                        method: 'GET',
                        headers: {
                            'Authorization': `Bearer ${token}`,  
                            'Content-Type': 'application/json'
                        }
                    });
                    
                    if(response.ok) {
                        const data = await response.json();
                        if (Array.isArray(data) && data.every(product => 
                            'id' in product && 'name' in product && 'type' in product &&
                            'price' in product && 'count' in product && 'size' in product && 
                            'info' in product && 'images' in product && 
                            Array.isArray(product.images) && product.images.every(img => 'image' in img)
                        )) {
                            setEditProducts(data || []);
                        } else {
                            console.error('Data from server is malformed:', data);
                        }
                    } else {
                        console.error('Server response:', response.status, response.statusText);
                    }
                    
                } catch (error) {
                    console.error(error)
                }
            }
            setPdrAuthorized(isAuthorized);
            setPdrLoading(false);
        }
        checkAuthorization();
    }, []);


    const handleButtonClick = async (product) => {
        console.log("버튼 클릭:", product);
        console.log(setSelectedProduct)
        setSelectedProduct(product);

    };
    
    

    
    return (
        <div className="product-update">
            <table>
                <thead>
                    <tr>
                        <th>button</th>
                        <th>Name</th>
                        <th>Type</th>
                        <th>Price</th>
                        <th>Count</th>
                        <th>Size</th>
                        <th>Info</th>
                        <th>Images</th>
                    </tr>
                </thead>
                <tbody>
                    {editProducts.map(product => (
                        <tr key={product.name}>
                            <td><button onClick={() => handleButtonClick(product)}>버튼</button></td>
                            <td>{product.name}</td>
                            <td>{product.type.name}</td>  {/* Change this line */}
                            <td>{product.price}</td>
                            <td>{product.count}</td>
                            <td>{product.size.name}</td>  {/* And this line */}
                            <td>{product.info}</td>
                            <td>{product.images.map(img => img.image).join(', ')}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
    
}

export default ProductEditRightView;