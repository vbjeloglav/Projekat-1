import { Avatar, Button, List, ListItem, ListItemAvatar, ListItemText } from "@mui/material";
import { Products } from "../../products";
import ProductList from "./ProductList";
import { useEffect, useState } from "react";
import E_bicikloList from "./E_bicikloList";
import agent from "../../app/api/agent";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { fetchProductsAsyncE_biciklo, productSelectorsE_biciklo } from "./catalogE_bicikloSlice";
import { useAppSelector, useAppDispatch } from "../../app/store/configureStore";
import { fetchProductsAsyncKamp } from "./catalogKampSlice";
import useE_biciklo from "../../app/hooks/useE_biciklo";

export default function CatalogE_biciklo(){
    
   
  const {productsE_biciklo, productsLoaded } = useE_biciklo();
 // const {productsLoaded}= useAppSelector(state=>state.CatalogKajak)
 // const { status}=useAppSelector(state=>state.CatalogKajak);
  const dispatch = useAppDispatch();
  

  useEffect(()=>{
    if(!productsLoaded) dispatch(fetchProductsAsyncE_biciklo());
  },[productsLoaded, dispatch])

  
         return(
        <>
      <E_bicikloList products={productsE_biciklo}/>
      </>
    )
}