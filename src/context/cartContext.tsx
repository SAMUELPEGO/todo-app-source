import React, { createContext, useState } from "react"
import type { CartInfo, Product, Products } from "../types/types"
import type { CartContextType } from "../types/types"
import { defaultCartContext } from "./defaults"

export const CartContext = createContext<CartContextType>(defaultCartContext)

const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const initialState: CartInfo = { products: [], totalProducts: 0 }
    const [cartInfo, setCartInfo] = useState<CartInfo>(initialState);

    const findProduct = (product: Product | null, productName: string | null) => {
        if (product){
        const findProductInCart = cartInfo.products.findIndex(item => item.name == product.name);
        return findProductInCart;
    }else {
        const findProductInCart = cartInfo.products.findIndex(item => item.name == productName);
        return findProductInCart;
    }
    }

    const totalProducts = (): number => {
        let total: number = 0;
        cartInfo.products.forEach(product => {
            total += product.inCart!;
        });
        return total;
    }
    const totalPrice = (): number => {
        let total: number = 0;
        cartInfo.products.forEach(product => {
            total += product.inCart! * product.price;
        });
        return total;
    }
    const addToCart = (product: Product) => {
        const findProductInCart = findProduct(product,null)
        if (findProductInCart >= 0) {
            const newCart: Products = JSON.parse(JSON.stringify(cartInfo.products))
            newCart[findProductInCart].inCart! += 1
            setCartInfo(prevState => ({
                ...prevState,
                products: newCart
            }));
            return cartInfo.products[findProductInCart].inCart + 1

        }
        setCartInfo(prevState => ({ ...prevState, products: [...prevState.products, { ...product, inCart: 1 }] }))
        return 1
    }
    const reduceFromCart = (product: Product) => {
        const findProductInCart = findProduct(product,null);

        if (findProductInCart >= 0) {
            const newCart: Products = JSON.parse(JSON.stringify(cartInfo.products))
            newCart[findProductInCart].inCart! -= 1
            setCartInfo(prevState => ({
                ...prevState,
                products: newCart
            }));
            if (newCart[findProductInCart].inCart == 0) {
                console.log("se activo")
                removeFromCart(product.name);
            }
        }
        return cartInfo.products[findProductInCart].inCart - 1
    }
    const cleanCart = ()=>{
    setCartInfo({...cartInfo,products:[]})
    }
    const removeFromCart = (productName: string) => {
        const findProductInCart = findProduct(null, productName)
        const newCart: Products = JSON.parse(JSON.stringify(cartInfo.products));
        newCart.splice(findProductInCart, 1);
        setCartInfo(prevState => ({
            ...prevState,
            products: newCart
        }));
        cartInfo.products[findProductInCart].inCart = 0


    }
    return (
        <CartContext.Provider value={{ cartInfo, addToCart, reduceFromCart, removeFromCart, totalPrice, totalProducts,findProduct,cleanCart}}>
            {children}
        </CartContext.Provider>

    )
}

export default CartProvider;