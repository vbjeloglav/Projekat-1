import ProductList from "./ProductList";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import {  fetchProductsAsync, productSelectors } from "./catalogSlice";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { Box, FormControl, FormControlLabel, Grid, Pagination, Paper, Radio, RadioGroup, TextField } from "@mui/material";
import useProducts from "../../app/hooks/useProducts";


const sortOptions=[
  {value:"name", label:'Alfabet'},
  {value:"priceDesc", label:'Cijena - veca ka manjoj'},
  {value:"price", label:'Cijena - manja ka vecoj'}

]
export default function Catalog(){
    const {products,productsLoaded, kategorijaa, metaData }= useProducts();
    //const { status}=useAppSelector(state=>state.catalog);
    const dispatch = useAppDispatch();



  
 
    return(
        <Grid container spacing={4}>
          <Grid item xs={3}>
            <Paper sx={{mb:2}}>
              <TextField
              label='Pretraga'
              variant="outlined"
              fullWidth
              />
            </Paper>
            <Paper sx={{mb:2, p:2}}>
           

    <FormControl>
      <label>Sortiranje po:</label>
      <RadioGroup>
        {sortOptions.map(({value, label})=>(
          <FormControlLabel value={value} control={<Radio />} label={label} key={value}/>
        ))}
      </RadioGroup>
    </FormControl>
  

            </Paper>
          </Grid>
          <Grid item xs={9}>
          <ProductList products={products}/>
          </Grid>
           <Grid item xs={3}/>
           <Grid item xs={9}>
            <Box display='flex' justifyContent='space-between' alignItems='center'>
              <Pagination
              color="secondary"
              size="large"
              count={10}
              page={2}/>
            </Box>
           </Grid>
        </Grid>
    )
}