import { useContext } from "react";
import styles from "./OrderConfirmedModal.module.css"
import { CartContext } from "../context/cartContext";
import { fixDecimals } from "../helpers/helpers";
import { ModalContext } from "../context/modalContext";
import { motion } from "framer-motion";

const OrderConfirmedModal: React.FC = () => {
    const { cartInfo, totalPrice, cleanCart } = useContext(CartContext);
    const {open,closeModal} = useContext(ModalContext);
    const variants = {
        open: { opacity: 1, x: 0 },
        closed: { opacity: 0, x: "-100%" },
      }

    const close = () => {
        cleanCart()
        closeModal()
    }

    return (<>
    <motion.div animate={!open ? "closed" : "open"} variants={variants}>
        <div className={`${styles.layer} `}>
            <div className={styles.modal}>
                <header className={styles.header}>
                    <img src="images/icon-order-confirmed.svg" alt=" incon confirmed" width={35} height={35} />
                    <h2>Order Confirmed</h2>
                    <p>We hope you enjoy food!</p>
                </header>
                <div className={styles.body}>
                    <div className={styles.products_wrapper}>
                        {cartInfo.products.map(product => (
                            <div className={styles.product} key={product.name}>
                                <img src={product.image.desktop} alt="" />
                                <div className={styles.info_product}>
                                    <p>{product.name}</p>
                                    <div>
                                        <span>
                                            {product.inCart}x</span>
                                        <span>
                                            @ {product.price.toFixed(2)}
                                        </span>

                                    </div>
                                    <span className={styles.price}>${fixDecimals(product.inCart, product.price)}</span>
                                </div>
                            </div>
                        ))}
                        <div className={styles.total}>
                            <span>Order total</span>
                            <span>${totalPrice()!.toFixed(2)}</span>

                        </div>
                    </div>
                </div>
                <button type="button" onClick={close} className={styles.button}>Start New Order</button>
            </div>
        </div>
        </motion.div>
    </>)
}

export default OrderConfirmedModal;