import { Avatar, Button, List, ListItem, ListItemAvatar, ListItemText } from "@mui/material";
import { Products } from "../../products";
import ProductList from "./ProductList";
import { useEffect, useState } from "react";
import KampovanjeList from "./KampovanjeList";
import agent from "../../app/api/agent";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { fetchProductsAsyncKamp, productSelectorsKamp } from "./catalogKampSlice";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import useKamp from "../../app/hooks/useKamp";

export default function CatalogKampovanje(){
    
    
  const {productsKamp, productsLoaded } = useKamp();
 // const {productsLoaded}= useAppSelector(state=>state.CatalogKajak)
 // const { status}=useAppSelector(state=>state.CatalogKajak);
  const dispatch = useAppDispatch();
  
  
         return(
        <>
      <KampovanjeList products={productsKamp}/>
      </>
    )
}