import { Avatar, Button, List, ListItem, ListItemAvatar, ListItemText } from "@mui/material";
import { Products } from "../../products";
import ProductList from "./ProductList";
import { useEffect, useState } from "react";
import PlaninarenjeList from "./PlaninarenjeList";
import agent from "../../app/api/agent";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { fetchProductsAsyncPlaninarenje, productSelectorsPlaninarenje } from "./catalogPlaninarenjeSlice";
import { useAppSelector, useAppDispatch } from "../../app/store/configureStore";
import { fetchProductsAsyncKajak } from "./catalogKajakSlice";
import usePlaninarenje from "../../app/hooks/usePlaninarenje";

export default function CatalogPlaninarenje(){
    
   
     
  const {productsPlaninarenje, productsLoaded } = usePlaninarenje();
 // const {productsLoaded}= useAppSelector(state=>state.CatalogKajak)
 // const { status}=useAppSelector(state=>state.CatalogKajak);
  const dispatch = useAppDispatch();
  
  
         return(
        <>
      <PlaninarenjeList products={productsPlaninarenje}/>
      </>
    )
}