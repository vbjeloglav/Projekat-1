import { useEffect } from "react";
import { fetchFilters, fetchProductsAsync,  productSelectors,  } from "../../features/catalog/catalogSlice";
import { useAppSelector, useAppDispatch } from "../store/configureStore";

export default function useProducts()
{
      
    const products=useAppSelector(productSelectors.selectAll);
    const {productsLoaded,filtersLoaded, kategorijaa, productParams, metaData, status}=useAppSelector(state=>state.catalog);
    const dispatch = useAppDispatch();


  useEffect(()=>{
    if(!productsLoaded) dispatch(fetchProductsAsync());
  },[productsLoaded, dispatch])

  useEffect(()=>{
    if(!filtersLoaded) dispatch(fetchFilters());

  },[dispatch, filtersLoaded])
  return {
    products, 
    productsLoaded, 
    kategorijaa,
    productParams,
    metaData
  }

}