import { useEffect } from "react";
import { fetchProductsAsync,  productSelectors,  } from "../../features/catalog/catalogSlice";
import { useAppSelector, useAppDispatch } from "../store/configureStore";
import { fetchProductsAsyncKajak, productSelectorsKajak } from "../../features/catalog/catalogKajakSlice";

export default function useKajak()
{
      
    const productsKajak=useAppSelector(productSelectorsKajak.selectAll);
    const {productsLoaded, status}=useAppSelector(state=>state.CatalogKajak);
    const dispatch = useAppDispatch();


  useEffect(()=>{
    if(!productsLoaded) dispatch(fetchProductsAsyncKajak());
  },[productsLoaded, dispatch])
  return {
    productsKajak, 
    productsLoaded
  }

}