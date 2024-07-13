import { Avatar, Button, List, ListItem, ListItemAvatar, ListItemText } from "@mui/material";
import { Products } from "../../products";
import ProductList from "./ProductList";
import { useEffect, useState } from "react";
import KvadoviList from "./KvadoviList";
import agent from "../../app/api/agent";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { fetchProductsAsyncKvad, productSelectorsKvad } from "./catlogKvadSlice";
import { useAppSelector, useAppDispatch } from "../../app/store/configureStore";
import { fetchProductsAsyncKajak } from "./catalogKajakSlice";
import useKvad from "../../app/hooks/useKvad";

export default function CatalogKvad(){
    
     
  const {productsKvad, productsLoaded } = useKvad();
 // const {productsLoaded}= useAppSelector(state=>state.CatalogKajak)
 // const { status}=useAppSelector(state=>state.CatalogKajak);
  const dispatch = useAppDispatch();
  
  
 
  
         return(
        <>
      <KvadoviList products={productsKvad}/>
      </>
    )
}