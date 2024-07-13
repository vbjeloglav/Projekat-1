import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { Products } from "../../products";
import agent from "../../app/api/agent";
import { RootState } from "../../app/store/configureStore";

const productsAdapter=createEntityAdapter<Products>();

export const fetchProductsAsyncSkijanje=createAsyncThunk<Products[]>(
    'catalogSkijanje/fetchProductsAsyncSkijanje',
    async()=>{
        try{
            return await agent.Catalog.list_skijanje();
        }catch(error){
            console.log(error);
        }
    }
)

export const fetchProductAsyncSkijanje=createAsyncThunk<Products, number>(
    'catalogSkijanje/fetchProductAsyncSkijanje',
    async(productsId)=>{
        try{
            return await agent.Catalog.details(productsId);
        }catch(error){
            console.log(error);
        }
    }
)


export const catalogSkijanjeSlice=createSlice({
    name:'catalogSkijanje',
    initialState:productsAdapter.getInitialState({
        productsLoaded:false,
        status:'idle'
    }),
    reducers:{
        setProductSkijanje:(state, action)=>{
            productsAdapter.upsertOne(state, action.payload);
            state.productsLoaded=false;
        },
        removeProductSkijanje: (state, action)=>{
            productsAdapter.removeOne(state, action.payload);
            state.productsLoaded=false;
        }
    },
    extraReducers:(builder=>{
        builder.addCase(fetchProductsAsyncSkijanje.pending,(state)=>{
            state.status='pendingFetchProducts';
        });
        builder.addCase(fetchProductsAsyncSkijanje.fulfilled,(state, action)=>{
            productsAdapter.setAll(state,action.payload);
            state.status='idle';
            state.productsLoaded=true;
        });
        builder.addCase(fetchProductsAsyncSkijanje.rejected,(state)=>{
            state.status='idle';
        });
        builder.addCase(fetchProductAsyncSkijanje.pending, (state)=>{
            state.status='pendingFetchProduct';
        });
        builder.addCase(fetchProductAsyncSkijanje.fulfilled, (state, action)=>{
            productsAdapter.upsertOne(state, action.payload);
            state.status='idle';
        });
        builder.addCase(fetchProductAsyncSkijanje.rejected, (state)=>{
            state.status='idle';
        })
       

    })

    
})

export const productSelectorsSkijanje=productsAdapter.getSelectors((state:RootState)=>state.CatalogSkijanje);
export const { setProductSkijanje, removeProductSkijanje}= catalogSkijanjeSlice.actions;

