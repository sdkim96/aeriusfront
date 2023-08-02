import { useState } from "react";
import './management.css'
import ProductRegisterForm from './PRODM/ProductRegisterForm'
import ProductRegisterRightView from './PRODM/ProductRegisterRightView'
import ProductDeleteForm from "./PRODM/ProductDeleteForm";
import ProductDeleteRightView from "./PRODM/ProductDeleteRightView";
//... import other forms...

const ProductManagement = () => {

    const [productName, setProductName] = useState("");
    const [productType, setProductType] = useState("");
    const [productPrice, setProductPrice] = useState("");
    const [productSize, setProductSize] = useState("");
    const [productCount, setProductCount] = useState("");
    const [mainImage, setMainImage] = useState(null);
    const [switchingImage, setSwitchingImage] = useState(null);
    const [subImages, setSubImages] = useState([]);
    const [productInfo, setProductInfo] = useState("");

    const [managementMenu, setManagementMenu] = useState('');

    const handleMenuChange = (e) => {
        setManagementMenu(e.target.value);
    };

    const renderManagementMenu = () => {
        switch(managementMenu){
            case('product-register'):
                return <ProductRegisterForm 
                    productName={productName} 
                    setProductName={setProductName} 
                    productType={productType} 
                    setProductType={setProductType} 
                    productPrice={productPrice} 
                    setProductPrice={setProductPrice} 
                    productCount={productCount} 
                    setProductCount={setProductCount} 
                    productSize={productSize} 
                    setProductSize={setProductSize} 
                    productInfo={productInfo} 
                    setProductInfo={setProductInfo} 
                    mainImage={mainImage} 
                    setMainImage={setMainImage} 
                    switchingImage={switchingImage} 
                    setSwitchingImage={setSwitchingImage}
                    subImages={subImages} 
                    setSubImages={setSubImages} 
                />
            case('product-delete'):
                return <ProductDeleteForm 
                
                />
                
            // ... other cases ...
            default:
                return (
                    <p name='default'>위의 드롭다운 메뉴를 누르세요.</p>
                );
        }
    }

    const renderRightView = () => {
        switch(managementMenu){
            case('product-register'):
                return <ProductRegisterRightView 
                            productName={productName}
                            productType={productType}
                            productPrice={productPrice}
                            productSize={productSize}
                            mainImage={mainImage}
                            switchingImage={switchingImage}
                            subImages={subImages}
                            productInfo={productInfo}
                            productCount={productCount}
                        />;
            case('product-delete'):
                return <ProductDeleteRightView 
                
                        />;
            // ... other cases ...
            default:
                return null;
        }
    }

    return(
        <div className="product-management">
            <div className="selects-menu">
                <select onChange={handleMenuChange}>
                    <option value="">선택하세요.</option>
                    <option value="product-register">상품 등록</option>
                    <option value="product-update">상품 정보 수정</option>
                    <option value="product-delete">상품 정보 삭제</option>
                    <option value="product-analyze">상품 분석</option>
                </select>
            </div>
            <div className="management-view">
                <div className="management-left">
                    {renderManagementMenu()}
                </div>
                <div className="management-right">
                    <div className="management-right-view">
                        {renderRightView()}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductManagement;
