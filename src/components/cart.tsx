import styles from "./cart.module.css"
import React, { useContext, useEffect, useRef, useState } from "react"
import { CartContext } from "../context/cartContext";
import { fixDecimals } from "../helpers/helpers";
import OrderConfirmedModal from "./orderConfirmedModal";
import { ModalContext } from "../context/modalContext";
import { motion } from "framer-motion";


const Cart: React.FC = () => {
  const refBtnClose = useRef<HTMLImageElement | null>(null);
  const { cartInfo, totalPrice, removeFromCart, totalProducts } = useContext(CartContext);
  const [isEmpty, setIsEmpty] = useState<number>(0);
  const { open, openModal } = useContext(ModalContext);
  
  const variants = {
    open: { opacity: 1, display:"flex"},
    closed: { opacity: 0, display:"none"}
  }

  const opening = () => {
    openModal()
  }
  useEffect(() => {
    setIsEmpty(cartInfo.products.length);
  }, [cartInfo])

  const removeProduct = (e: React.MouseEvent<HTMLImageElement>) => {
    refBtnClose.current = e.target as HTMLImageElement
    removeFromCart(refBtnClose.current.dataset.product_to_remove_name!)
  }

  return (
    <div className={`${styles.cart} ${!isEmpty && styles.cart_empty}`} >
      <h2 className={styles.h2}>Your Cart({totalProducts()!})</h2>
      <div className={`${styles.products_container} ${!isEmpty && styles.hidden}`}>
        {cartInfo.products.map(product => (
          <motion.div animate={"open"} variants={variants} transition={{duration:.5}} initial={{ opacity: 0}}>
          <div key={product.name} className={styles.product_container}>
            <p className={styles.product_name}>{product.name}</p>
            <div className={styles.product_quantity}><span>{product.inCart + "x"}</span><span>@ {"$" + product.price.toFixed(2)}</span><span>{"$" + fixDecimals(product.inCart!, product.price)}</span></div>
            <img src="images/icon-remove-item.svg" data-product_to_remove_name={product.name} alt="icon close" className={styles.icon_close} onClick={removeProduct} />
          </div>
          </motion.div>
        ))}
      </div>
      <div className={`${styles.footer_cart} ${!isEmpty && styles.hidden}`}>
        <div className={styles.total_price}>
          <span>Order Total</span><span>${totalPrice()!.toFixed(2)}</span>
        </div>
        <div className={styles.marketin_text}><img src="images/icon-carbon-neutral.svg" alt="icon marketin text" /><span>This is a <small><strong>carbon-neutral</strong></small> delivery</span></div>
        <div><button type="button" onClick={opening}>Confirm Order</button></div>
      </div>
      <motion.div animate={!open ? "closed" : "open"} variants={variants} transition={{duration:.5}} initial={{ opacity: 0}}>
        {<OrderConfirmedModal />}
      </motion.div>
    </div>
  )
}
export default Cart;

