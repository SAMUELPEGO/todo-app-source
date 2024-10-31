export interface Image {
    thumbnail: string
    mobile: string
    tablet: string
    desktop: string
}

export interface Product {
    image: Image
    name: string
    category: string
    price: number
    inCart: number
}

export type Products = Product[];

export interface CartInfo {
    products: Products
    totalProducts: number
}
export interface ProductProps {
    product: Product;
}
export interface ProductsProps {
    products: Products;
}
export interface CartContextType {
    cartInfo: CartInfo;
    addToCart: (product: Product) => number | void;
    reduceFromCart: (product: Product) => number | void;
    removeFromCart: (product: string) => void;
    totalPrice: ()=> number | void;
    totalProducts:()=> number | void;
    findProduct:(product:Product|null, productName:string | null )=> number |void;
    cleanCart:()=> void;
}
export type Btn = "button_addToCart" | "button_controlQuantity" 

export interface ModalContextProps  {
    open:boolean | null;
    openModal:()=>void;
    closeModal:()=>void;

}