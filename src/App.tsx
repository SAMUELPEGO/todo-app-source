
import styles from './App.module.css'
import Products from "./components/products"
import Cart from "./components/cart"
import { useGetProducts } from './hooks/useGetProducts'
import React from 'react';
import CartProvider from './context/cartContext';
import ModalProvider from './context/modalContext';

const App: React.FC = () => {
  const products = useGetProducts();
  return (
    <>
      <CartProvider>
        <ModalProvider>
        <header>
          <h1 className={styles.h1}>Desserts</h1>
        </header>
        <main className={styles.main}>
          <section>
            <Products products={products} />
          </section>
          <section>
            <Cart />      
          </section>
        </main>
        </ModalProvider>
      </CartProvider>
    </>
  )
}

export default App
