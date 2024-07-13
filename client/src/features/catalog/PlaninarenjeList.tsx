import { Grid } from "@mui/material";
import { Products } from "../../products";
import PlaninarenjeCard from "./PlaninarenjeCard";

interface Props{
    products: Products[];
}
export default function PlaninarenjeList({products}:Props){
    return(
        <Grid container spacing={4}>
        {products.map(products=>(
            <Grid item xs={4} key={products.id}>
          <PlaninarenjeCard products={products}/>
          </Grid>
        ))}
      </Grid>
    )
}