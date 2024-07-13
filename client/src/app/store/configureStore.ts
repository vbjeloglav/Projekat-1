import { counterSlice } from "../../features/Contact/counterSlice";
import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { basketSlice } from "../../features/basket/basketSlice";
import { catalogSlice } from "../../features/catalog/catalogSlice";
import { accountSlice } from "../../features/account/accountSlice";
import CatalogKajak from "../../features/catalog/CatalogKajak";
import { catalogSliceKajak } from "../../features/catalog/catalogKajakSlice";
import { catalogSliceKamp } from "../../features/catalog/catalogKampSlice";
import { catalogPlaninarenjeSlice } from "../../features/catalog/catalogPlaninarenjeSlice";
import { catalogSliceKvad } from "../../features/catalog/catlogKvadSlice";
import { catalogSkijanjeSlice } from "../../features/catalog/catlogSkijanjeSlice";
import { catalogSliceE_biciklo } from "../../features/catalog/catalogE_bicikloSlice";


//export function configureStore(){
  //  return createStore(counterReducer);
//}

export const store=configureStore({
    reducer:{
        counter:counterSlice.reducer,
        basket: basketSlice.reducer,
        catalog: catalogSlice.reducer,
        CatalogKajak: catalogSliceKajak.reducer,
        CatalogKamp: catalogSliceKamp.reducer,
      	CatalogSkijanje: catalogSkijanjeSlice.reducer,
        CatalogKvad: catalogSliceKvad.reducer,
        CatalogE_biciklo: catalogSliceE_biciklo.reducer,
        CatalogPlaninarenje: catalogPlaninarenjeSlice.reducer,
        account :accountSlice.reducer
        
    }
})

export type RootState=ReturnType<typeof store.getState>;
export type AppDispatch=typeof store.dispatch;
export const useAppDispatch=()=>useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState>=useSelector;