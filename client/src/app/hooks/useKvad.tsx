import { useEffect } from "react";
import { fetchProductsAsync,  productSelectors,  } from "../../features/catalog/catalogSlice";
import { useAppSelector, useAppDispatch } from "../store/configureStore";
import { fetchProductsAsyncE_biciklo, productSelectorsE_biciklo } from "../../features/catalog/catalogE_bicikloSlice";
import { fetchProductsAsyncKamp, productSelectorsKamp } from "../../features/catalog/catalogKampSlice";
import { fetchProductsAsyncSkijanje, productSelectorsSkijanje } from "../../features/catalog/catlogSkijanjeSlice";
import { fetchProductsAsyncKvad, productSelectorsKvad } from "../../features/catalog/catlogKvadSlice";

export default function useKvad()
{
      
    const productsKvad=useAppSelector(productSelectorsKvad.selectAll);
    const {productsLoaded, status}=useAppSelector(state=>state.CatalogKvad);
    const dispatch = useAppDispatch();


  useEffect(()=>{
    if(!productsLoaded) dispatch(fetchProductsAsyncKvad());
  },[productsLoaded, dispatch])
  return {
    productsKvad, 
    productsLoaded
  }

}