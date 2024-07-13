import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { Products } from "../../products";
import agent from "../../app/api/agent";
import { RootState } from "../../app/store/configureStore";

const productsAdapter=createEntityAdapter<Products>();

export const fetchProductsAsyncKvad=createAsyncThunk<Products[]>(
    'catalogKvad/fetchProductsAsyncKvad',
    async()=>{
        try{
            return await agent.Catalog.list_kvadovi();
        }catch(error){
            console.log(error);
        }
    }
)

export const fetchProductAsyncKvad=createAsyncThunk<Products, number>(
    'catalogKvad/fetchProductAsyncKvad',
    async(productsId)=>{
        try{
            return await agent.Catalog.details(productsId);
        }catch(error){
            console.log(error);
        }
    }
)


export const catalogSliceKvad=createSlice({
    name:'catalogKvad',
    initialState:productsAdapter.getInitialState({
        productsLoaded:false,
        status:'idle'
    }),
    reducers:{
        setProductKvad:(state, action)=>{
            productsAdapter.upsertOne(state, action.payload);
            state.productsLoaded=false;
        },
        removeProductKvad: (state, action)=>{
            productsAdapter.removeOne(state, action.payload);
            state.productsLoaded=false;
        }
    },
    extraReducers:(builder=>{
        builder.addCase(fetchProductsAsyncKvad.pending,(state)=>{
            state.status='pendingFetchProducts';
        });
        builder.addCase(fetchProductsAsyncKvad.fulfilled,(state, action)=>{
            productsAdapter.setAll(state,action.payload);
            state.status='idle';
            state.productsLoaded=true;
        });
        builder.addCase(fetchProductsAsyncKvad.rejected,(state)=>{
            state.status='idle';
        });
        builder.addCase(fetchProductAsyncKvad.pending, (state)=>{
            state.status='pendingFetchProduct';
        });
        builder.addCase(fetchProductAsyncKvad.fulfilled, (state, action)=>{
            productsAdapter.upsertOne(state, action.payload);
            state.status='idle';
        });
        builder.addCase(fetchProductAsyncKvad.rejected, (state)=>{
            state.status='idle';
        })
       

    })

    
})

export const productSelectorsKvad=productsAdapter.getSelectors((state:RootState)=>state.CatalogKvad);
export const {setProductKvad, removeProductKvad}= catalogSliceKvad.actions;

