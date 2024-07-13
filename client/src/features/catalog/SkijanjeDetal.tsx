import { Divider, Grid, Table, TableBody, TableCell, TableContainer, TableRow, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Products } from "../../products";
import agent from "../../app/api/agent";
import NotFound from "../../app/errors/NotFound";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { LoadingButton } from "@mui/lab";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { addBasketItemAsync, removeBasketItemAsync } from "../basket/basketSlice";

export default function SkijanjeDetail(){
    const {basket, status}=useAppSelector(state=>state.basket);
    const dispatch=useAppDispatch();
    const{id}=useParams<{id:string}>();
    const [products, setProducts]=useState<Products | null>(null);
    const[loading, setLoading]=useState(true);
    const[kolicina, setKolicina]=useState(0);
    const item=basket?.items.find(i=>i.productId===products?.id);
    


    useEffect(()=>{
        if(item) setKolicina(item.kolicina);
        
        id && agent.Catalog.details(parseInt(id))
        .then(response=>setProducts(response))
             .catch(error=>console.log(error))
             .finally(()=>setLoading(false));
    },[id, item])

    function handleInputChange(event:any){
        setKolicina(event.target.value);
        if(event.target.value>=0){
            setKolicina(event.target.value)
        }
    }
    function handleUpdateCard(){
       
        if(!item || kolicina>item.kolicina){
            const updateQuantity= item?kolicina-item.kolicina: kolicina;
           dispatch(addBasketItemAsync({productId:products?.id!, kolicina:updateQuantity}))
        }
        else{
            const updatedQuantity = item.kolicina-kolicina;
            dispatch(removeBasketItemAsync({productId:products?.id!, kolicina:updatedQuantity}))
        }
    }
    if(loading)return <LoadingComponent message="Loading.."/>
    if(!products) return<NotFound/>
    return(
        <Grid container spacing={6}>
        <Grid item xs={6}>
            <img src={products.slika} alt={products.ime} width='80%'/>
        </Grid>
        <Grid item xs={6}>
            <Typography variant='h4'>
                {products.ime}
            </Typography>
            <Divider sx={{mb:2}}/>
            <Typography variant="h4" color='secondary'>
                {products.cijena.toFixed(2)}KM
            </Typography>
            <TableContainer>
                <Table>
                    <TableBody>
                        <TableRow>
                            <TableCell style={{fontWeight:"bold"}}>Ime</TableCell>
                            <TableCell>{products.ime}</TableCell>
                        </TableRow>
                    </TableBody>
                    <TableRow>
                        <TableCell style={{fontWeight:"bold"}}>Opis</TableCell>
                        <TableCell>{products.opis}</TableCell>
                    </TableRow>
                    
                    <TableRow>
                        <TableCell style={{fontWeight:"bold"}}></TableCell>
                        <TableCell>{products.karakteristike}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell style={{fontWeight:"bold"}}>Kolicina na stanju</TableCell>
                        {products.kolicinaNaStanju!>=0?  <TableCell>{products.kolicinaNaStanju}</TableCell> : "Trenutno nedostupno"}
                    </TableRow>
                    
                </Table>
            </TableContainer>
            {products.kolicinaNaStanju!>=0?
             <Grid container spacing={2}>
            <Grid item xs={6}>
                <TextField
                onChange={handleInputChange}
                variant="outlined"
                type='number'
                label='Kolicina u korpi'
                fullWidth
                value={kolicina}/>
            </Grid>
            <Grid item xs={6}>
                        <LoadingButton
                        loading={status.includes('pendingRemoveItem'+item?.productId)}
                        onClick={handleUpdateCard}
                        disabled={item?.kolicina === kolicina || ! item && kolicina===0}
                         sx={{height:'55px'}}
                        color="primary"
                        size="large"
                        variant="contained"
                        fullWidth>
                       

                            {item? 'Azuriraj korpu': 'Dodaj u korpu'}
                        </LoadingButton>
                    </Grid>
                 </Grid>: null}
            </Grid>
    </Grid>
    )
}

function setLoading(arg0: boolean): void {
    throw new Error("Function not implemented.");
}