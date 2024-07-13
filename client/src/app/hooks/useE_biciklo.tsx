import { useEffect } from "react";
import { fetchProductsAsync,  productSelectors,  } from "../../features/catalog/catalogSlice";
import { useAppSelector, useAppDispatch } from "../store/configureStore";
import { fetchProductsAsyncE_biciklo, productSelectorsE_biciklo } from "../../features/catalog/catalogE_bicikloSlice";

export default function useE_biciklo()
{
      
    const productsE_biciklo=useAppSelector(productSelectorsE_biciklo.selectAll);
    const {productsLoaded, status}=useAppSelector(state=>state.CatalogE_biciklo);
    const dispatch = useAppDispatch();


  useEffect(()=>{
    if(!productsLoaded) dispatch(fetchProductsAsyncE_biciklo());
  },[productsLoaded, dispatch])
  return {
    productsE_biciklo, 
    productsLoaded
  }

}