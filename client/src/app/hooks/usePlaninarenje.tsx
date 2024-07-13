import { useEffect } from "react";
import { fetchProductsAsync,  productSelectors,  } from "../../features/catalog/catalogSlice";
import { useAppSelector, useAppDispatch } from "../store/configureStore";
import { fetchProductsAsyncE_biciklo, productSelectorsE_biciklo } from "../../features/catalog/catalogE_bicikloSlice";
import { fetchProductsAsyncKamp, productSelectorsKamp } from "../../features/catalog/catalogKampSlice";
import { fetchProductsAsyncPlaninarenje, productSelectorsPlaninarenje } from "../../features/catalog/catalogPlaninarenjeSlice";

export default function usePlaninarenje()
{
      
    const productsPlaninarenje=useAppSelector(productSelectorsPlaninarenje.selectAll);
    const {productsLoaded, status}=useAppSelector(state=>state.CatalogPlaninarenje);
    const dispatch = useAppDispatch();


  useEffect(()=>{
    if(!productsLoaded) dispatch(fetchProductsAsyncPlaninarenje());
  },[productsLoaded, dispatch])
  return {
    productsPlaninarenje, 
    productsLoaded
  }

}