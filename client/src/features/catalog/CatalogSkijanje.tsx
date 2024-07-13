import { Avatar, Button, List, ListItem, ListItemAvatar, ListItemText } from "@mui/material";
import { Products } from "../../products";
import ProductList from "./ProductList";
import { useEffect, useState } from "react";
import SkijanjeList from "./SkijanjeList";
import agent from "../../app/api/agent";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { fetchProductsAsyncSkijanje, productSelectorsSkijanje } from "./catlogSkijanjeSlice";
import { useAppSelector, useAppDispatch } from "../../app/store/configureStore";
import { fetchProductsAsyncKvad } from "./catlogKvadSlice";
import useSkijanje from "../../app/hooks/useSkijanje";

export default function CatalogSkijanje(){
    
  const {productsSkijanje, productsLoaded } = useSkijanje();
 
  const dispatch = useAppDispatch();
  
  
 
         return(
        <>
      <SkijanjeList products={productsSkijanje}/>
      </>
    )
}