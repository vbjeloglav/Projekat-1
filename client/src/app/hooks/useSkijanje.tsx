import { useEffect } from "react";
import { fetchProductsAsync,  productSelectors,  } from "../../features/catalog/catalogSlice";
import { useAppSelector, useAppDispatch } from "../store/configureStore";
import { fetchProductsAsyncE_biciklo, productSelectorsE_biciklo } from "../../features/catalog/catalogE_bicikloSlice";
import { fetchProductsAsyncKamp, productSelectorsKamp } from "../../features/catalog/catalogKampSlice";
import { fetchProductsAsyncSkijanje, productSelectorsSkijanje } from "../../features/catalog/catlogSkijanjeSlice";

export default function useSkijanje()
{
      
    const productsSkijanje=useAppSelector(productSelectorsSkijanje.selectAll);
    const {productsLoaded, status}=useAppSelector(state=>state.CatalogSkijanje);
    const dispatch = useAppDispatch();


  useEffect(()=>{
    if(!productsLoaded) dispatch(fetchProductsAsyncSkijanje());
  },[productsLoaded, dispatch])
  return {
    productsSkijanje, 
    productsLoaded
  }

}