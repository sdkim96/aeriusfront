import { useState } from "react"

const ProductDeleteForm = () => {
    
    const [deleteProductName, setDeleteProductName] = useState("") 

    const handleProductDeleteSubmit = (e)=> {
        e.preventDefault()

        
    }
    
    return(
        <form name="product-delete" onSubmit={handleProductDeleteSubmit}>
            <button type="submit">상품 삭제하기</button>
            <label className="product-name">
                <p>상품 이름</p>
                <input type="text" name="product-name" value={deleteProductName} onChange={e => setDeleteProductName(e.target.value)}/>
            </label>
        </form>
    )
}

export default ProductDeleteForm;