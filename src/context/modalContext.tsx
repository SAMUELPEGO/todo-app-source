import { createContext, useState } from "react"
import { ModalContextProps } from "../types/types"
import { defaultModalContextProps } from "./defaults"

export const ModalContext = createContext<ModalContextProps>(defaultModalContextProps)

const ModalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
   const [open,setIsOpen] = useState<boolean>(false);

   const openModal = ()=> {
   setIsOpen(true);
   }
   const closeModal = ()=> {
    setIsOpen(false);
    }
 

    return (
        <ModalContext.Provider value={{open:open,openModal,closeModal}}>
        {children}
    </ModalContext.Provider>
    )
}

export default ModalProvider;