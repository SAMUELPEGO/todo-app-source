import products from "../data.json";
import type { Products } from "../types/types";


export const useGetProducts = ():Products => {
    return products

}