import { Button, ButtonGroup, Typography } from "@mui/material";

import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { decrement, increment } from "./counterSlice";

export default function ContactPage(){
    const{data, title}=useAppSelector(state=>state.counter);
    const dispatch=useAppDispatch();
    return(
        <>
        <Typography variant="h2">
            {title}
        </Typography>
        <Typography variant="h2">
            Broj: {data}
        </Typography>

        <ButtonGroup>
            <Button variant="contained" color="error" onClick={()=>dispatch(decrement(1))}>DECREMENT</Button>
            <Button variant="contained" color="primary" onClick={()=>dispatch(increment(1))}>INCREMENT</Button>
            <Button variant="contained" color="primary" onClick={()=>dispatch(increment(5))}>INCREMENT BY 5</Button>
        </ButtonGroup>
        </>
    )
}