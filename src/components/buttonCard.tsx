import styles from "./buttonCard.module.css"
import { useContext, useEffect, useState } from "react"
import { CartContext } from "../context/cartContext"
import { ProductProps, Btn } from "../types/types"

const Button: React.FC<ProductProps> = ({ ...product }) => {
    const { cartInfo, addToCart, reduceFromCart, findProduct } = useContext(CartContext)
    const [btnToRender, setBtnToRender] = useState<Btn>("button_addToCart");
    const [quantityIndicator, setQuantityIndicator] = useState<number>(0);

    useEffect(() => {
            const findIndex = findProduct(product.product, null);
            if (findIndex == -1) {
                setBtnToRender("button_addToCart");
                setQuantityIndicator(0);
                
            } 
    }, [cartInfo])

    const addProduct = () => {
        if (btnToRender == "button_addToCart") {
            const quantity = addToCart({ ...product.product });
            console.log(quantity)
            setQuantityIndicator(quantity!);
            setBtnToRender("button_controlQuantity");
            return;
        }
        if (btnToRender == "button_controlQuantity") {
            const quantity = addToCart({ ...product.product });
            setQuantityIndicator(quantity!);
            return;
        }
    }
    const reduceProduct = () => {
        const quantity = reduceFromCart({ ...product.product });
        setQuantityIndicator(quantity!);
        if (quantityIndicator == 1) {
            setBtnToRender("button_addToCart");
        }
    }
    return (<>
        {btnToRender == "button_addToCart" ? (

            <div className={styles.button_addToCart} onClick={addProduct}>
                <img src="images/icon-add-to-cart.svg" alt="" />
                <button className={styles.button}>Add to Cart</button>
            </div>
        ) : (
            <div className={styles.button_controlQuantity}>
                <div onClick={reduceProduct}><img src="images/icon-decrement-quantity.svg" alt="" /></div>
                <span>{quantityIndicator}</span>
                <div onClick={addProduct}><img src="images/icon-increment-quantity.svg" alt="" /></div>
            </div>
        )
        }
    </>


    )
}

export default Button;