import styles from "./products.module.css"
import Button from "./buttonCard";
import React, { useContext } from "react";
import type { ProductsProps } from "../types/types";
import { CartContext } from "../context/cartContext";

const Products:React.FC<ProductsProps> = ({products}) =>{
const {findProduct} = useContext(CartContext)

return (
    <div className={styles.product_wrapper}>
    {products.map((product)=>(
    <div className={styles.card} key={product.name}> 
      <div className={`${styles.card_image}`}>
        <img src={product.image.desktop} alt="" className={`${styles.image} ${findProduct(product,null)! >= 0 && styles.show_border}`}/>
        <Button product={{...product}}/>
      </div>
     
      <ul className={styles.ul}>
        <li className={styles.li_category}>{product.category}</li>
        <li className={styles.li_name}>{product.name}</li>
        <li className={styles.li_price}>${product.price.toFixed(2)}</li>
      </ul>
    </div>
))}
  </div>
  )
}
export default Products;