import { Typography, Grid, TextField, FormControlLabel, Checkbox, Button } from "@mui/material";
import {  useFormContext } from "react-hook-form";
import AppTextInput from "../../app/components/AppTextInput";
import AppCheckbox from "../../app/components/AppCheckbox";

export default function AddressForm() {
    const {control, formState

    } = useFormContext();
  return (
    <>
      <Typography variant="h6" gutterBottom>
        Osnovni podaci 
      </Typography>
      
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12}>
         <AppTextInput control={control} name="fulName" label="Ime i Prezime"/>
        </Grid>
        <Grid item xs={12}>
        <AppTextInput control={control} name="address1" label="Adresa 1"/>
        </Grid>
        <Grid item xs={12}>
        <AppTextInput control={control} name="address2" label="Adresa 2"/>
        </Grid>
        <Grid item xs={12} sm={6}>
        <AppTextInput control={control} name="city" label="Grad"/>
        </Grid>
        <Grid item xs={12} sm={6}>
        <AppTextInput control={control} name="state" label="Drzava"/>
        </Grid>
        <Grid item xs={12} sm={6}>
        <AppTextInput control={control} name="zip" label="zip kod"/>
        </Grid>
        
        <Grid item xs={12}>
         <AppCheckbox
        disabled={!formState.isDirty}
         name='saveAddress' label="Sacuvaj adresu kao podrazumjevanu" 
         control={control}/>
        </Grid>
      </Grid>
      
    </>
  );
}

