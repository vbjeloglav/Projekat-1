import { useEffect } from "react";
import { fetchProductsAsync,  productSelectors,  } from "../../features/catalog/catalogSlice";
import { useAppSelector, useAppDispatch } from "../store/configureStore";
import { fetchProductsAsyncE_biciklo, productSelectorsE_biciklo } from "../../features/catalog/catalogE_bicikloSlice";
import { fetchProductsAsyncKamp, productSelectorsKamp } from "../../features/catalog/catalogKampSlice";

export default function useKamp()
{
      
    const productsKamp=useAppSelector(productSelectorsKamp.selectAll);
    const {productsLoaded, status}=useAppSelector(state=>state.CatalogKamp);
    const dispatch = useAppDispatch();


  useEffect(()=>{
    if(!productsLoaded) dispatch(fetchProductsAsyncKamp());
  },[productsLoaded, dispatch])
  return {
    productsKamp, 
    productsLoaded
  }

}