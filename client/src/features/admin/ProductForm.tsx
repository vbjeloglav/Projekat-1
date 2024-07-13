import { Typography, Grid, Paper, Box, Button } from "@mui/material";
import { FieldValue, FieldValues, useForm } from "react-hook-form";
import AppTextInput from "../../app/components/AppTextInput";
import { Products } from "../../products";
import { useEffect } from "react";
import useProducts from "../../app/hooks/useProducts";
import AppSelectList from "../../app/components/AppSelectList";
import AppDropzonee from "../../app/components/AppDropzone";
import AppDropzone from "../../app/components/AppDropzone";
import {yupResolver} from '@hookform/resolvers/yup';
import { validationShema } from "./productValidation";
import agent from "../../app/api/agent";
import { useAppDispatch } from "../../app/store/configureStore";
import { LoadingButton } from "@mui/lab";
import { setProduct } from "../catalog/catalogSlice";
import { setProductKamp } from "../catalog/catalogKampSlice";
import { setProductE_biciklo } from "../catalog/catalogE_bicikloSlice";
import { setProductKajak } from "../catalog/catalogKajakSlice";
import { setProductKvad } from "../catalog/catlogKvadSlice";
import { setProductSkijanje } from "../catalog/catlogSkijanjeSlice";
import { setProductPlaninarenje } from "../catalog/catalogPlaninarenjeSlice";

interface Props{
    product?:Products;
    cancelEdit:()=>void;
}
export default function ProductForm({product, cancelEdit}: Props) {
    const { control, reset, handleSubmit, watch, formState:{isDirty, isSubmitting}} = useForm({
        resolver:yupResolver<any>(validationShema)
    });
    const {kategorijaa} =useProducts();
    const watchFile = watch('file', null );
    const dispatch = useAppDispatch();
    

    useEffect(()=>{
        if(product && !watchFile && !isDirty) reset(product);
        return ()=>{
            if(watchFile) URL.revokeObjectURL(watchFile.preview);
        }
    }, [product, reset, watchFile, isDirty])


     async function handleSubmitData(data: FieldValues){
       try {
        let response: Products;
        if(product) {
            response = await agent.Admin.updateProduct(data);
        }else{
            response = await agent.Admin.createProduct(data);
        }
        dispatch(setProductKamp(response));
        dispatch(setProduct(response));
        dispatch(setProductE_biciklo(response));
        dispatch(setProductKajak(response));
        dispatch(setProductKvad(response));
        dispatch(setProductSkijanje(response));
        dispatch(setProductPlaninarenje(response));
        cancelEdit();
        
       } catch (error) {
        
        console.log(error);
       }
    }
    return (
        <Box component={Paper} sx={{p: 4}}>
            <Typography variant="h4" gutterBottom sx={{mb: 4}}>
                Product Details
            </Typography>
            <form onSubmit={handleSubmit(handleSubmitData)}>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={12}>
                    <AppTextInput control={control} name='ime' label='Naziv proizvoda' />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <AppSelectList control={control} items={kategorijaa}  name='kategorija' label='Kategorija' />

                </Grid>
                <Grid item xs={12} sm={6}>
                    <AppTextInput control={control} name='karakteristike' label='Karakteristike' />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <AppTextInput control={control} name='velicina' label='Veličina' />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <AppTextInput type="number" control={control} name='cijena' label='Cijena' />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <AppTextInput type="number" control={control} name='kolicinaNaStanju' label='Količina na stanju' />
                </Grid>
                <Grid item xs={12}>
                    <AppTextInput multiline={true} rows={4} control={control} name='opis' label='Opis' />
                </Grid>
                <Grid item xs={12}>
                    <Box display='flex' justifyContent='space-between' alignItems='center'>
                    <AppDropzone control={control} name='file'  />
                    {watchFile ?(
                        <img src={watchFile.preview} alt="preview" style={{maxHeight:200}}/>
                    ) : (
                        <img src={product?.slika} alt={product?.ime} style={{maxHeight:200}}/>
                    
                    )}
                    </Box>
                    
                </Grid>
            </Grid>
            <Box display='flex' justifyContent='space-between' sx={{mt: 3}}>
                <Button onClick={cancelEdit} variant='contained' color='inherit'>Cancel</Button>
                <LoadingButton loading={isSubmitting}  type='submit' variant='contained' color='success'>Submit</LoadingButton>
            </Box>
            </form>
        </Box>
    )
}