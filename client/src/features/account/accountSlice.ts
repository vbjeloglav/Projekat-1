import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";
import { User } from "../../app/layout/models/user";
import { FieldValues } from "react-hook-form/dist/types";
import agent from "../../app/api/agent";
import { router } from "../../app/layout/router/Routes";
import { toast } from "react-toastify";
import { setBasket } from "../basket/basketSlice";
import axios, { AxiosRequestConfig } from 'axios';



interface AccountState{
    user: User | null;
}

const initialState: AccountState = {
    user: null
}

export const signInUser = createAsyncThunk<User, FieldValues>(
    'account/singInUser',
    async (data, thunkAPI)=>{
        try {
            const userDto = await agent.Account.login(data);
            const {basket, ...user} = userDto;
            if(basket) thunkAPI.dispatch(setBasket(basket));
            localStorage.setItem('user', JSON.stringify(user));
            return user;
        } catch (error:any) {
            return thunkAPI.rejectWithValue({error: error.data});
            
        }
    } 
)

export const fetchCurrentUser = createAsyncThunk<User>(
    'account/fetchCurrentUser',
    async (_, thunkAPI) => {
        const token = localStorage.getItem('token');
        
        if (!token) {
            // Ako token nije dostupan, vrati grešku
            return thunkAPI.rejectWithValue({ error: 'Nedostaje autorizacijski token' });
        }
        
        const config: AxiosRequestConfig = {
            headers: {
                Authorization: `Bearer ${token}`, // Dodaj token u Authorization zaglavlje
            },
        };

        try {
            // Sada uključujemo config u axios poziv kako bismo poslali token u zaglavlju
            const userDto = await axios.post('/api/account/currentUser', null, config);
            const { basket, ...user } = userDto.data;
            if (basket) thunkAPI.dispatch(setBasket(basket));
            localStorage.setItem('user', JSON.stringify(user));
            return user;
        } catch (error:any) {
            // Ovdje obrađujemo bilo kakvu grešku koja se može dogoditi prilikom zahtjeva
            return thunkAPI.rejectWithValue({ error: error.response.data });
        }
    },
    {
        condition: () => {
            // Ovdje dodaj bilo kakvu logiku za provjeru je li potrebno izvršiti zahtjev (ako je potrebno)
            return !localStorage.getItem('user');
        },
    }
);
export const accountSlice = createSlice({
    name: 'account',
    initialState,
    reducers:{
        singOut:(state)=>{
            state.user = null;
           localStorage.removeItem('user');
            router.navigate('/');
        }, 
            setUser: (state, action) =>{
                let claims = JSON.parse(atob(action.payload.token.split('.')[1]));
                let roles = claims['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
                state.user={...action.payload, roles:typeof(roles)=== 'string' ? [roles]: roles}
        }
    },
   extraReducers:(builder=>{
        builder.addCase(fetchCurrentUser.rejected,(state)=>{
          state.user=null;
           localStorage.removeItem('user');
           toast.error('Sesija je istekla - prijavite se ponovo');
           router.navigate('/catalog');

        })
        builder.addMatcher(isAnyOf(signInUser.fulfilled, fetchCurrentUser.fulfilled), (state, action)=>{
            let claims = JSON.parse(atob(action.payload.token.split('.')[1]));
            let roles = claims['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
            state.user={...action.payload, roles:typeof(roles)=== 'string' ? [roles]: roles}
        });
        builder.addMatcher(isAnyOf(signInUser.rejected, fetchCurrentUser.rejected), (state, action)=>{
            throw action.payload;
        })
    })
})

export const {singOut, setUser}=accountSlice.actions;