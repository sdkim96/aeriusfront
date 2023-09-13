import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './productdetail.css';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`http://localhost:8000/myapp/store_products/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data)
        setProduct(data);
      } else {
        console.error('Failed to fetch product details');
      }
    };

    fetchData();
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className='product-page'>
      <h1>{product.name}</h1>
      <img src={product.images[0]?.image} alt={product.name} />
      <p>{product.info}</p>
      <p>가격: {product.price}</p>
      <p>유형: {product.type.name}</p>
      <p>사이즈: {product.size.name}</p>
      <p>개수: {product.count}</p>
    </div>
  );
};

export default ProductDetail;
