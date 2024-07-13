import { Avatar, Button, List, ListItem, ListItemAvatar, ListItemText } from "@mui/material";
import { Products } from "../../products";
import ProductList from "./ProductList";
import { useEffect, useState } from "react";
import KajakList from "./KajakList";
import agent from "../../app/api/agent";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import {  productSelectors } from "./catalogSlice";
import useProducts from "../../app/hooks/useProducts";
import { fetchProductsAsyncKajak, productSelectorsKajak } from "./catalogKajakSlice";
import useKajak from "../../app/hooks/useKajak";

export default function CatalogKajak(){
    
  const {productsKajak, productsLoaded } = useKajak();
 // const {productsLoaded}= useAppSelector(state=>state.CatalogKajak)
 // const { status}=useAppSelector(state=>state.CatalogKajak);
  const dispatch = useAppDispatch();
  

 

  //if(loading) return<LoadingComponent/>
         return(
        <>
      <KajakList products={productsKajak}/>
      </>
    )
}