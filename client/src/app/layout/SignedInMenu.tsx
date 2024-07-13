import { Button, Menu, MenuItem } from "@mui/material";
import React from "react";
import { useAppDispatch, useAppSelector } from "../store/configureStore";
import { singOut } from "../../features/account/accountSlice";
import { clearBasket } from "../../features/basket/basketSlice";
import { Link } from "react-router-dom";


export default function SignedInMenu(){
    const dispatch = useAppDispatch();
    const {user}=useAppSelector(state=>state.account);
        const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
        const open = Boolean(anchorEl);
        const handleClick = (event: any) => {
          setAnchorEl(event.currentTarget);
        };
        const handleClose = () => {
          setAnchorEl(null);
        };
      
        return (
          <>
            <Button
              color='inherit'
              onClick={handleClick}
              sx={{typography:'h6'}}
              
            >
              {user?.email}
              
              
            </Button>
            <Menu
             
              
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
            >
              <MenuItem onClick={handleClose}>Profil</MenuItem>
              <MenuItem component={Link} to='/orders'>Moja narudzba</MenuItem>
             <MenuItem onClick={()=>{
              dispatch(singOut());
              dispatch(clearBasket());
             }}>Odjavi se</MenuItem>
            </Menu>
          </>
        );
      
    }