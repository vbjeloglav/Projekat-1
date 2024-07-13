import styled from "@emotion/styled";
import { Box, Button, Paper, Typography } from "@mui/material";
import { useState, useRef } from "react";
import { useAppSelector } from "../../app/store/configureStore";
import BasketTable from "../basket/BasketTable";
import { BasketItem } from "../../app/layout/models/basket";
import TableGotovina from "./TableGotovina";
import BasketSummary from "../basket/BasketSummasry";
import ReactToPrint from "react-to-print";


export default function GotovinaPage(){

    const {user}=useAppSelector(state=>state.account);
    const {basket} = useAppSelector(state=>state.basket)
    
    const componentRef = useRef<HTMLDivElement>(null);
    const handlePrint=()=>{
        window.print()
    }
    if(!basket) return <Typography variant="h3">Vaša korpa je prazna</Typography>
    return(
       <Box component={Paper}>
       <main style={{margin:"5px", padding:"5px", maxWidth:"1280px", maxHeight:"1250px" }} >
      <ReactToPrint trigger={()=> <button style={{display:"flex", flexWrap:"wrap", alignItems:"center", justifyContent:"space-between", marginTop:"10px", listStyle:"none"}}>Print/sacuvaj</button>} content={()=>componentRef.current}/>
      <div ref={componentRef}>
      <header style={{display:"flex", textAlign:"justify", alignItems:"center", flexDirection:"column", justifyContent:"center"}}>
        <div>
          
                <h2 style={{fontWeight:"bold"}}>
                    FAKTURA
                </h2>
            </div>
           
        </header>
        <section style={{display:"flex", alignItems:"end", flexDirection:"column", justifyContent: "flex-end", marginRight:"7px"}}>
           <h3>Iznajmljivanje opreme</h3>
          
        </section>
        
        <section style={{marginTop:"-100px", marginLeft:"20px"}}>
           <h3>Ime kupca</h3>
           <h3>{user?.userName}</h3>
          
         
        </section>

       
        <TableGotovina items={basket.items} days={basket.days} isBasket={false}/>
        <BasketSummary/>
       

        <footer>
            <ul style={{display:"flex", flexWrap:"wrap", alignItems:"center", justifyContent:"center"}}>
                <p><span style={{fontWeight:"bold"}}>Ime:</span>Iznajmljivanje opreme </p>
                <p><span style={{fontWeight:"bold"}}>Adresa:</span>Vuka Karadžiča 6 </p>
                <p><span style={{fontWeight:"bold"}}>Email:</span>iznajmljivanjeopreme@test.com</p>
                <p><span style={{fontWeight:"bold"}}>Broj telefona:</span>065/666/999</p>
                <p><span style={{fontWeight:"bold"}}>Fax:</span>057/555/888</p>
                <p><span style={{fontWeight:"bold"}}>Website:</span>http://localhoct:3001</p>
                <p>Datum:</p><br></br>
               
                
            </ul>
            <p><span style={{fontWeight:"bold",display:"flex", flexWrap:"wrap", alignItems:"center", justifyContent:"center"}} >HVALA NA POVJERENJU!!</span></p>
        </footer>



        
      </div>
       
       
        </main>
        
        </Box>
    )
}