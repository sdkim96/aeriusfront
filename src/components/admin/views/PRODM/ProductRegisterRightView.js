import React, { useState } from 'react';
import './rightview.css';

const ProductRegisterRightView = ({ productName, productType, 
    productPrice, productSize, mainImage, switchingImage, subImages, productInfo,productCount }) => {

    let objectURL;
    if(mainImage instanceof File){
        objectURL = URL.createObjectURL(mainImage);
    } else {
        objectURL = "";
    }

    let switchingURL;
    if(switchingImage instanceof File){
        switchingURL = URL.createObjectURL(switchingImage);
    } else {
        switchingURL = "";
    }

    const [mainImageFading, setMainImageFading] = useState(mainImage);
    const [imageFading, setImageFading] = useState(false);
    const [switchingImageFading, setSwitchingImagefading] = useState(false);

    const switching = (main, switched, mouseover) => {
        if(mouseover) {
            setImageFading(true);
            setTimeout(() => {
                setMainImageFading(main);
                setImageFading(false);
                setSwitchingImagefading(true);
            });
        } else{
            setImageFading(true);
            setTimeout(() =>{
                setMainImageFading(switched);
                setImageFading(false);
                setSwitchingImagefading(false);
            });
        }
    }


    return (
        <div className="right-view">
            <div className='right-view-up'>
                <div className="right-view-left">
                    {objectURL && 
                        <img 
                            src={switchingImageFading ? switchingURL : objectURL}
                            alt="상품 메인 이미지"
                            onMouseOver={() => switching(mainImage, switchingImage, true)}
                            onMouseOut={() => switching(mainImage, switchingImage, false)}
                        />
                    }
                </div>
                <div className="right-view-right">
                    <p>{productName || <span className="placeholder-text">이름:</span>}</p>
                    <p>{productPrice || <span className="placeholder-text">가격:</span>}</p>
                    <p>{productSize || <span className="placeholder-text">사이즈:</span>}</p>
                    <hr></hr>
                    <p>{productType || <span className="placeholder-text">유형:</span>}</p>
                    <p>{productCount || <span className="placeholder-text">개수:</span>}</p>
                    <p>{subImages.length > 0 ? `${subImages.length}개` : <span className="placeholder-text">이미지개수:</span>}</p>
                    <p dangerouslySetInnerHTML={{ __html: productInfo.replace(/\n/g, '<br />') || '<span className="placeholder-text">정보:</span>' }} />
                </div>
            </div>
            <div className='right-view-down'>
                {subImages.map((image, index) => {
                    let imageUrl = URL.createObjectURL(image);
                    return <img src={imageUrl} style={{margin: '50px 0'}} alt={`상품 서브 이미지 ${index + 1}`} key={index} />
                })}
            </div>
        </div>
    );
};

export default ProductRegisterRightView;
