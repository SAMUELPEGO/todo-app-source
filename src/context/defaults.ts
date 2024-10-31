import { CartContextType,ModalContextProps,Product } from "../types/types"
export const defaultCartContext: CartContextType = {
    cartInfo: { products: [], totalProducts: 0 },
    addToCart: (_product: Product) => {},
    reduceFromCart: (_product: Product) => {},
    removeFromCart: (_product: string) => {},
    totalPrice: ()=> {},
    totalProducts:()=> {},
    findProduct:(_product:Product|null, _productName:string | null )=> {},
    cleanCart:()=> {}
}  

export const defaultModalContextProps: ModalContextProps =  {
    open:false,
    openModal:()=>{},
    closeModal:()=> {}
}