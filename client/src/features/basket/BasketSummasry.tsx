import { TableContainer, Paper, Table, TableBody, TableRow, TableCell, Typography } from "@mui/material";
import { currencyFormat } from "../../app/util/util";
import { useAppSelector } from "../../app/store/configureStore";

interface Props{
    subtotal?: number;
}
export default function BasketSummary({subtotal}: Props) {
  
    
    const {basket}=useAppSelector(state=>state.basket)
   
    if(subtotal === undefined)
        
     subtotal =basket ?.items.reduce((sum,item)=>sum+(item.kolicina*item.cijena),0) ??0;
    

    return (
        <>
            <TableContainer component={Paper} variant={'outlined'}>
                <Table>
                    <TableBody>
                        <TableRow>
                            <TableCell colSpan={2} style={{fontWeight:'bold'}}>UKUPNO ZA UPLATU</TableCell>
                            <TableCell align="right" style={{fontWeight:'bold'}}>{currencyFormat(subtotal)}</TableCell>
                        </TableRow>
                       
                        
                       
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}