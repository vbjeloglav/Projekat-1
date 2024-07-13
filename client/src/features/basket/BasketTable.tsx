import { Add, Delete, Remove } from "@mui/icons-material";
import { Box, Checkbox, FormControlLabel, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, styled } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { addBasketItemAsync, removeBasketItemAsync } from "./basketSlice";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { BasketItem } from "../../app/layout/models/basket";
import { useState } from "react";
import dayjs from "dayjs";

interface Props{
    items: BasketItem[];
    isBasket?: boolean;
    isOrder?: boolean;
    days: any,
}
export default function BasketTable({items, isBasket=true, days, isOrder}:Props){

    const {status}=useAppSelector(state=>state.basket)
    const dispatch= useAppDispatch();
    const dateNow = dayjs().format().split("T")[0];
    const {user} = useAppSelector(state=>state.account);
    const[dateFrom, setDateFrom] = useState(dateNow);
    const[dateTo, setDateTo] = useState(dateNow);
    console.log(dateNow);
    
   

  
    const [isChecked1, setIsChecked1] = useState(false);
    const [isChecked2, setIsChecked2] = useState(true);

    const handleCheckbox1Change = () => {
        setIsChecked1(!isChecked1); // Preokreni trenutno stanje isChecked1
        setIsChecked2(false); // Postavi isChecked2 na false
    };

    const handleCheckbox2Change = () => {
        setIsChecked2(!isChecked2); // Preokreni trenutno stanje isChecked2
        setIsChecked1(false); // Postavi isChecked1 na false
    };
  
    return(
        <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} >
          <TableHead>
            <TableRow>
              <TableCell>Oprema</TableCell>
              <TableCell align="right">Cijena</TableCell>
              <TableCell align="center">Kolicina</TableCell>    
              <TableCell align="right">Iznos</TableCell>
              {isBasket &&
              <TableCell align="right"></TableCell>}
              {isOrder &&
               <TableCell align="center">Oprema vraćena</TableCell>
              }
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
                    <img src={item.slika} alt={item.ime} style={{height:50, marginRight:20}}/>
                    {item.ime}
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
                 
                <TableCell align="right">{((item.cijena)*item.kolicina*((dayjs(dateTo).diff(dayjs(dateFrom))/86400000+1)))}KM</TableCell>
                <TableCell>{item.datumIznajmljivanja}</TableCell>
                {isBasket &&
                <TableCell align="right">
               <LoadingButton  color="error"
                 loading={status==='pendingRemoveItem'+item.productId+'del'}
                  onClick={()=>dispatch(removeBasketItemAsync({productId:item.productId, kolicina:item.kolicina, name:'del'}))}>
                <Delete/>
               </LoadingButton>
             
               </TableCell>}
               {isOrder &&
               <TableCell >
                 <div>
            <label>
                <input style={{color:"green", marginLeft:"-200px", tabSize:"15px"}} 
                    type="checkbox"
                    checked={isChecked1}
                    onChange={handleCheckbox1Change}
                />
              DA
            </label>

            <label>
                <input 
                    type="checkbox"
                    checked={isChecked2}
                    onChange={handleCheckbox2Change}
                    defaultChecked={isChecked2}

                />
             NE
            </label>
            </div>
              
               </TableCell>}
               
              </TableRow>
              
            ))}
          </TableBody>
          
        </Table>
      </TableContainer>
    )
  
}