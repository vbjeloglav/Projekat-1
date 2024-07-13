import { Typography, List, ListItem, ListItemText, Grid } from '@mui/material';
import { Fragment } from 'react';
import BasketTable from '../basket/BasketTable';
import BasketSummary from '../basket/BasketSummasry';
import { useAppSelector } from '../../app/store/configureStore';


const addresses = ['1 Material-UI Drive', 'Reactville', 'Anytown', '99999', 'USA'];
const payments = [
  { name: 'Card type', detail: 'Visa' },
  { name: 'Card holder', detail: 'Mr John Smith' },
  { name: 'Card number', detail: 'xxxx-xxxx-xxxx-1234' },
  { name: 'Expiry date', detail: '04/2024' },
];

export default function Review() {
  const {basket} = useAppSelector(state =>state.basket);
  return (
    <>
      <Typography variant="h6" gutterBottom>
        Pregled narudžbe
      </Typography>
      {basket &&
      <BasketTable days={basket.days} items={basket.items} isBasket={false} isOrder={false}/>}
        <Grid container>
          <Grid item xs={6}/>
          <Grid item xs={6}>
            <BasketSummary/>
           
        
        </Grid>
  
      </Grid>
      
    </>
  );
}


