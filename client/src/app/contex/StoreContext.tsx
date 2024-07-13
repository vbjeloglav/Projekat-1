import { PropsWithChildren, createContext, useContext, useState } from "react";
import { Basket } from "../layout/models/basket";

interface StoreContextValue{
    basket:Basket | null;
    setBasket: (basket: Basket)=>void;
    removeItem:(productId:number,kolicina:number)=>void;
}
export const StoreContext=createContext<StoreContextValue | undefined>(undefined);

export function useStoreContext(){
    const context = useContext(StoreContext);
    if(context===undefined){
        throw Error('Oops- izgleda da nismo unutar provajdera.');
    }
    return context;
}

export function StoreProvider({children}:PropsWithChildren<any>)
{
    const [basket, setBasket]=useState<Basket | null>(null);
    function removeItem(productId:number, kolicina:number){
        if(!basket) return;

        const items=[...basket.items];
        const itemIndex=items.findIndex(i=>i.productId===productId);
        if(itemIndex>=0){
            items[itemIndex].kolicina-=kolicina;
            if(items[itemIndex].kolicina===0) items.splice(itemIndex, 1);
            setBasket(prevState=>{
                return {... prevState!, items}
            })
        }
    }
    return(
        <StoreContext.Provider value={{basket, setBasket,removeItem}}>
            {children}
        </StoreContext.Provider>
    )
}
