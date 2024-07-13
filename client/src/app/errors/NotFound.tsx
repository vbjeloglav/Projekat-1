import { Height } from "@mui/icons-material"
import { Button, Container, Divider, Paper, Typography } from "@mui/material"
import { Link } from "react-router-dom";

export default function NotFound(){
    return(
        <Container component={Paper} sx={{height:400}}>
            <Typography gutterBottom variant="h3">Oops.. Nismo pronasli ono sto trazite!</Typography>
            <Divider/>
            <Button component={Link} to='/catalog' fullWidth>Vrati se u shop</Button>
        </Container>
    )
}