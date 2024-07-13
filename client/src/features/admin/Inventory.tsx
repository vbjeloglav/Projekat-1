import { Typography, Button, TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Box, Pagination } from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { currencyFormat } from "../../app/util/util";
import useProducts from "../../app/hooks/useProducts";
import useKajak from "../../app/hooks/useKajak";
import useE_biciklo from "../../app/hooks/useE_biciklo";
import useKamp from "../../app/hooks/useKamp";
import useSkijanje from "../../app/hooks/useSkijanje";
import usePlaninarenje from "../../app/hooks/usePlaninarenje";
import useKvad from "../../app/hooks/useKvad";
import { useAppDispatch } from "../../app/store/configureStore";
import { useState } from "react";
import ProductForm from "./ProductForm";
import { Products } from "../../products";
import agent from "../../app/api/agent";
import { removeProduct, setProductParams } from "../catalog/catalogSlice";
import { LoadingButton } from "@mui/lab";
import { removeProductE_biciklo } from "../catalog/catalogE_bicikloSlice";
import { removeProductKamp } from "../catalog/catalogKampSlice";
import { removeProductKajak } from "../catalog/catalogKajakSlice";
import { removeProductPlaninarenje } from "../catalog/catalogPlaninarenjeSlice";
import { removeProductSkijanje } from "../catalog/catlogSkijanjeSlice";
import { removeProductKvad } from "../catalog/catlogKvadSlice";
import AppPagination from "../../app/components/AppPagination";

export default function Inventory() {
    const {products, metaData} = useProducts();
    const {productsKajak} = useKajak();
    const {productsE_biciklo} = useE_biciklo();
    const {productsKamp} = useKamp();
    const {productsSkijanje} = useSkijanje();
    const {productsPlaninarenje} = usePlaninarenje();
    const {productsKvad} = useKvad();
    const dispatch = useAppDispatch();
    const [editMode, setEditMode] = useState(false);
    const [selectedProduct, setSelectedProduct]= useState<Products | undefined>(undefined);
    const [loading, setLoading]= useState(false);
    const [target, setTarget]= useState(0);

    function handleSelectProduct(product:Products){
        setSelectedProduct(product);
        setEditMode(true);

    }
    function handleDeletePrduct(id: number){
        setLoading(true);
        setTarget(id);
        agent.Admin.deleteProduct(id)
            .then(()=>dispatch(removeProduct(id)))
            .catch(error=>console.log(error))
            .finally(()=>setLoading(false));
    }
    function handleDeletePrductE_biciklo(id: number){
        setLoading(true);
        setTarget(id);
        agent.Admin.deleteProduct(id)
            .then(()=>dispatch(removeProductE_biciklo(id)))
            .catch(error=>console.log(error))
            .finally(()=>setLoading(false));
    }
    function handleDeletePrductKajak(id: number){
        setLoading(true);
        setTarget(id);
        agent.Admin.deleteProduct(id)
            .then(()=>dispatch(removeProductKajak(id)))
            .catch(error=>console.log(error))
            .finally(()=>setLoading(false));
    }
    function handleDeletePrductKamp(id: number){
        setLoading(true);
        setTarget(id);
        agent.Admin.deleteProduct(id)
            .then(()=>dispatch(removeProductKamp(id)))
            .catch(error=>console.log(error))
            .finally(()=>setLoading(false));
    }
    function handleDeletePrductPlaninarenje(id: number){
        setLoading(true);
        setTarget(id);
        agent.Admin.deleteProduct(id)
            .then(()=>dispatch(removeProductPlaninarenje(id)))
            .catch(error=>console.log(error))
            .finally(()=>setLoading(false));
    }
    function handleDeletePrductSkijanje(id: number){
        setLoading(true);
        setTarget(id);
        agent.Admin.deleteProduct(id)
            .then(()=>dispatch(removeProductSkijanje(id)))
            .catch(error=>console.log(error))
            .finally(()=>setLoading(false));
    }
    function handleDeletePrductKvad(id: number){
        setLoading(true);
        setTarget(id);
        agent.Admin.deleteProduct(id)
            .then(()=>dispatch(removeProductKvad(id)))
            .catch(error=>console.log(error))
            .finally(()=>setLoading(false));
    }

    function cancelEdit(){
        if(selectedProduct)setSelectedProduct(undefined);
        setEditMode(false);
    }


    if(editMode) return <ProductForm product={selectedProduct} cancelEdit={cancelEdit}/>
    return (
        <>
            <Box display='flex' justifyContent='space-between'>
                <Typography sx={{ p: 2 }} variant='h4'>Inventory</Typography>
                <Button onClick={()=>setEditMode(true)} sx={{m:2}} size='large' variant='contained'>Create</Button>
            </Box>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>#</TableCell>
                            <TableCell align="left">Proizvod</TableCell>
                            <TableCell align="right">Cijena</TableCell>
                            <TableCell align="center">Kategorija</TableCell>
                            <TableCell align="center">Kolicina</TableCell>
                            <TableCell align="right"></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {products.map((product) => (
                            <TableRow
                                key={product.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {product.id}
                                </TableCell>
                                <TableCell align="left">
                                    <Box display='flex' alignItems='center'>
                                        <img src={product.slika} alt={product.ime} style={{ height: 50, marginRight: 20 }} />
                                        <span>{product.ime}</span>
                                    </Box>
                                </TableCell>
                                <TableCell align="right">{currencyFormat(product.cijena)}</TableCell>
                                <TableCell align="center">{product.kategorija}</TableCell>
                                <TableCell align="center">{product.kolicinaNaStanju}</TableCell>
                                <TableCell align="right">
                                    <Button onClick={() => handleSelectProduct(product)} startIcon={<Edit />} />
                                    <LoadingButton loading={loading && target== product.id}
                                     startIcon={<Delete />} color='error'
                                     onClick={()=>handleDeletePrduct(product.id)} />
                                </TableCell>
                            </TableRow>
                        ))}
                        {productsSkijanje.map((product) => (
                            <TableRow
                                key={product.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {product.id}
                                </TableCell>
                                <TableCell align="left">
                                    <Box display='flex' alignItems='center'>
                                        <img src={product.slika} alt={product.ime} style={{ height: 50, marginRight: 20 }} />
                                        <span>{product.ime}</span>
                                    </Box>
                                </TableCell>
                                <TableCell align="right">{currencyFormat(product.cijena)}</TableCell>
                                <TableCell align="center">{product.kategorija}</TableCell>
                                <TableCell align="center">{product.kolicinaNaStanju}</TableCell>
                                <TableCell align="right">
                                    <Button onClick={() => handleSelectProduct(product)} startIcon={<Edit />} />
                                    <LoadingButton loading={loading && target== product.id}
                                     startIcon={<Delete />} color='error'
                                     onClick={()=>handleDeletePrductSkijanje(product.id)} />
                                </TableCell>
                            </TableRow>
                        ))}
                        {productsKajak.map((product) => (
                            <TableRow
                                key={product.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {product.id}
                                </TableCell>
                                <TableCell align="left">
                                    <Box display='flex' alignItems='center'>
                                        <img src={product.slika} alt={product.ime} style={{ height: 50, marginRight: 20 }} />
                                        <span>{product.ime}</span>
                                    </Box>
                                </TableCell>
                                <TableCell align="right">{currencyFormat(product.cijena)}</TableCell>
                                <TableCell align="center">{product.kategorija}</TableCell>
                                <TableCell align="center">{product.kolicinaNaStanju}</TableCell>
                                <TableCell align="right">
                                    <Button onClick={() => handleSelectProduct(product)} startIcon={<Edit />} />
                                    <LoadingButton loading={loading && target== product.id}
                                     startIcon={<Delete />} color='error'
                                     onClick={()=>handleDeletePrductKajak(product.id)} />
                                </TableCell>
                            </TableRow>
                        ))}
                        {productsKvad.map((product) => (
                            <TableRow
                                key={product.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {product.id}
                                </TableCell>
                                <TableCell align="left">
                                    <Box display='flex' alignItems='center'>
                                        <img src={product.slika} alt={product.ime} style={{ height: 50, marginRight: 20 }} />
                                        <span>{product.ime}</span>
                                    </Box>
                                </TableCell>
                                <TableCell align="right">{currencyFormat(product.cijena)}</TableCell>
                                <TableCell align="center">{product.kategorija}</TableCell>
                                <TableCell align="center">{product.kolicinaNaStanju}</TableCell>
                                <TableCell align="right">
                                    <Button onClick={() => handleSelectProduct(product)} startIcon={<Edit />} />
                                    <LoadingButton loading={loading && target== product.id}
                                     startIcon={<Delete />} color='error'
                                     onClick={()=>handleDeletePrductKvad(product.id)} />
                                </TableCell>
                            </TableRow>
                        ))}
                        {productsKamp.map((product) => (
                            <TableRow
                                key={product.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {product.id}
                                </TableCell>
                                <TableCell align="left">
                                    <Box display='flex' alignItems='center'>
                                        <img src={product.slika} alt={product.ime} style={{ height: 50, marginRight: 20 }} />
                                        <span>{product.ime}</span>
                                    </Box>
                                </TableCell>
                                <TableCell align="right">{currencyFormat(product.cijena)}</TableCell>
                                <TableCell align="center">{product.kategorija}</TableCell>
                                <TableCell align="center">{product.kolicinaNaStanju}</TableCell>
                                <TableCell align="right">
                                    <Button onClick={() => handleSelectProduct(product)} startIcon={<Edit />} />
                                    <LoadingButton loading={loading && target== product.id}
                                     startIcon={<Delete />} color='error'
                                     onClick={()=>handleDeletePrductKamp(product.id)} />
                                </TableCell>
                            </TableRow>
                        ))}
                        {productsE_biciklo.map((product) => (
                            <TableRow
                                key={product.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {product.id}
                                </TableCell>
                                <TableCell align="left">
                                    <Box display='flex' alignItems='center'>
                                        <img src={product.slika} alt={product.ime} style={{ height: 50, marginRight: 20 }} />
                                        <span>{product.ime}</span>
                                    </Box>
                                </TableCell>
                                <TableCell align="right">{currencyFormat(product.cijena)}</TableCell>
                                <TableCell align="center">{product.kategorija}</TableCell>
                                <TableCell align="center">{product.kolicinaNaStanju}</TableCell>
                                <TableCell align="right">
                                    <Button onClick={() => handleSelectProduct(product)} startIcon={<Edit />} />
                                    <LoadingButton loading={loading && target== product.id}
                                     startIcon={<Delete />} color='error'
                                     onClick={()=>handleDeletePrductE_biciklo(product.id)} />
                                </TableCell>
                            </TableRow>
                        ))}
                        {productsPlaninarenje.map((product) => (
                            <TableRow
                                key={product.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {product.id}
                                </TableCell>
                                <TableCell align="left">
                                    <Box display='flex' alignItems='center'>
                                        <img src={product.slika} alt={product.ime} style={{ height: 50, marginRight: 20 }} />
                                        <span>{product.ime}</span>
                                    </Box>
                                </TableCell>
                                <TableCell align="right">{currencyFormat(product.cijena)}</TableCell>
                                <TableCell align="center">{product.kategorija}</TableCell>
                                <TableCell align="center">{product.kolicinaNaStanju}</TableCell>
                                <TableCell align="right">
                                    <Button onClick={() => handleSelectProduct(product)} startIcon={<Edit />} />
                                    <LoadingButton loading={loading && target== product.id}
                                     startIcon={<Delete />} color='error'
                                     onClick={()=>handleDeletePrductPlaninarenje(product.id)} />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {metaData &&
            <Box sx={{pt:2}}>
                <AppPagination metaData={metaData} 
                onPageChange={(page:number) => dispatch(setProductParams({pageNumber: page}))}/>
                </Box>}
                
                
        </>
    )
}