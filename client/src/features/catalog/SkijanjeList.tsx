import { Avatar, Grid, List, ListItem, ListItemAvatar, ListItemText } from "@mui/material";
import { Products } from "../../products";
import ProductCard from "./ProductCard";
import SkijanjeCard from "./SkijanjeCard";

interface Props{
    products: Products[];
}
export default function SkijanjeList({products}:Props){
    return(
        <Grid container spacing={4}>
        {products.map(products=>(
            <Grid item xs={4} key={products.id}>
          <SkijanjeCard products={products}/>
          </Grid>
        ))}
      </Grid>
    )
}