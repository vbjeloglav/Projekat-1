import { Add, Delete, Remove } from "@mui/icons-material";
import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { LoadingButton } from "@mui/lab";

import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { BasketItem } from "../../app/layout/models/basket";
import { useState } from "react";
import dayjs from "dayjs";
import { addBasketItemAsync, removeBasketItemAsync } from "../basket/basketSlice";
import BasketSummary from "../basket/BasketSummasry";

interface Props{
    items: BasketItem[];
    isBasket?: boolean;
    days: any,
}
export default function BasketTable({items, isBasket=true}:Props){

    const {status}=useAppSelector(state=>state.basket)
    const dispatch= useAppDispatch();
    const dateNow = dayjs().format().split("T")[0];

    const[dateFrom, setDateFrom] = useState(dateNow);
    const[dateTo, setDateTo] = useState(dateNow);
    console.log(dateNow);
  
    return(
        <TableContainer >
        <Table sx={{ minWidth: 650 }} >
          <TableHead>
            <TableRow>
              <TableCell>Oprema</TableCell>
              <TableCell align="right">Cijena</TableCell>
              <TableCell align="center">Kolicina</TableCell>    
              <TableCell align="right">Iznos</TableCell>
              {isBasket &&
              <TableCell align="right"></TableCell>}
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map(item => (
              <TableRow
                key={item.productId}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
              
                <TableCell component="th" scope="row">
                <Box display='flex' alignItems='center'>
                    
                    <span>{item.ime}</span>
                 </Box>
                </TableCell>
                <TableCell align="right">{(item.cijena)}</TableCell>
                <TableCell align="center">
                {isBasket &&
                  <LoadingButton color="error"
                  loading={status==='pendingRemoveItem'+item.productId+'rem'} onClick={()=>dispatch(removeBasketItemAsync({productId:item.productId, kolicina:1,name:'rem'}))}>
                    <Remove/>
                  </LoadingButton>}
                  {item.kolicina}
                  {isBasket &&
                  <LoadingButton
                   color="secondary"
                    loading={status==='pendingAddItem'+item.productId }
                     onClick={()=>dispatch(addBasketItemAsync({productId:item.productId}))}>
                    <Add/>
                  </LoadingButton>}
                  </TableCell>
                  <TableCell align="right">{(item.cijena*item.kolicina)}KM</TableCell>
            
                {isBasket &&
                <TableCell align="right">
               <LoadingButton  color="error"
                 loading={status==='pendingRemoveItem'+item.productId+'del'}
                  onClick={()=>dispatch(removeBasketItemAsync({productId:item.productId, kolicina:item.kolicina, name:'del'}))}>
                <Delete/>
               </LoadingButton>
               </TableCell>}
              </TableRow>
              
              
            ))}
             
            
          </TableBody>
          
        </Table>
      </TableContainer>
     
      
    )
   
}