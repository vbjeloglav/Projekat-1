
import {  Button, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import {  useAppSelector } from "../../app/store/configureStore";
import BasketSummary from "./BasketSummasry";
import { Link } from "react-router-dom";
import { useState } from "react";
import BasketTable from "./BasketTable";
import dayjs from "dayjs";
import { Label } from "@mui/icons-material";

export default function BasketPage(){
    const {basket} = useAppSelector(state=>state.basket)
    const dateNow = dayjs().format().split("T")[0];
    const[dateFrom, setDateFrom] = useState(dateNow);
    const[dateTo, setDateTo] = useState(dateNow);
    const {user} = useAppSelector(state=>state.account);
    var days = (dayjs(dateTo).diff(dayjs(dateFrom))/86400000+1);  
    console.log(days);

    console.log("ASD");
    if(basket){
    console.log("ASHSHA");
    }
    if(!basket) return <Typography variant="h3">Vaša korpa je prazna</Typography>
    return(
      <>
      
      <BasketTable items={basket.items} days={basket.days} isOrder={false}/>
      
      /*  <Grid container>
       
          

        
          <TableContainer component={Paper} >
          <TableRow   sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
            <TableCell  >Datum izdavanja:</TableCell>
            <TableCell><input min={dateNow} defaultValue={dateNow} value={dateFrom}  type="date" onChange={(e)=>{setDateFrom(e.target.value); setDateTo(e.target.value); console.log((e.target.value))}}></input></TableCell>
             <TableCell>Datum vracanja:</TableCell>
             <TableCell><input min={dateFrom} defaultValue={dateNow} value={dateTo}  type="date" onChange={(e)=>{setDateTo(e.target.value); console.log((e.target.value))}}></input></TableCell>
             </TableRow>
            
           </TableContainer>
           </Grid>*/
        
          
         
          
  <Grid container>
      <Grid item xs={6}/>
      <Grid item xs={6}>
        <BasketSummary/>
        {user && user.roles?.includes('Admin') &&
        <Button 
        component={Link} to='/gotovina'
        variant="contained"
        size="large"
        fullWidth>Gotovina</Button>}



        <Button 
        component={Link} to='/rezervisano'
        variant="contained"
        size="large"
        fullWidth>REZERVIŠI</Button>

       <Button 
        component={Link} to='/checkout'
        variant="contained"
        size="large"
        fullWidth>Checkout</Button>
     
       
        </Grid>
  
      </Grid>


      
      </>
    );
    
}