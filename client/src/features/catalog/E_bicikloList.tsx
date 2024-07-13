import { Avatar, Grid, List, ListItem, ListItemAvatar, ListItemText } from "@mui/material";
import { Products } from "../../products";
import ProductCard from "./ProductCard";
import E_bicikloCard from "./E_bicikloCard";

interface Props{
    products: Products[];
}
export default function E_bicikloList({products}:Props){
    return(
        <Grid container spacing={4}>
        {products.map(products=>(
            <Grid item xs={4} key={products.id}>
          <E_bicikloCard products={products}/>
          </Grid>
        ))}
      </Grid>
    )
}