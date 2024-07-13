import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { Products } from "../../products";
import agent from "../../app/api/agent";
import { RootState } from "../../app/store/configureStore";

const productsAdapter=createEntityAdapter<Products>();

export const fetchProductsAsyncKajak=createAsyncThunk<Products[]>(
    'catalogKajak/fetchProductsAsyncKajak',
    async()=>{
        try{
            return await agent.Catalog.list_kajak();
        }catch(error){
            console.log(error);
        }
    }
)

export const fetchProductAsyncKajak=createAsyncThunk<Products, number>(
    'catalogKajak/fetchProductAsyncKajak',
    async(productsId)=>{
        try{
            return await agent.Catalog.details(productsId);
        }catch(error){
            console.log(error);
        }
    }
)


export const catalogSliceKajak=createSlice({
    name:'catalogKajak',
    initialState:productsAdapter.getInitialState({
        productsLoaded:false,
        status:'idle'
    }),
    reducers:{ 
        setProductKajak:(state, action)=>{
            productsAdapter.upsertOne(state, action.payload);
            state.productsLoaded=false;
        },
        removeProductKajak: (state, action)=>{
        productsAdapter.removeOne(state, action.payload);
        state.productsLoaded=false;
    }},
    extraReducers:(builder=>{
        builder.addCase(fetchProductsAsyncKajak.pending,(state)=>{
            state.status='pendingFetchProducts';
        });
        builder.addCase(fetchProductsAsyncKajak.fulfilled,(state, action)=>{
            productsAdapter.setAll(state,action.payload);
            state.status='idle';
            state.productsLoaded=true;
        });
        builder.addCase(fetchProductsAsyncKajak.rejected,(state)=>{
            state.status='idle';
        });
        builder.addCase(fetchProductAsyncKajak.pending, (state)=>{
            state.status='pendingFetchProduct';
        });
        builder.addCase(fetchProductAsyncKajak.fulfilled, (state, action)=>{
            productsAdapter.upsertOne(state, action.payload);
            state.status='idle';
        });
        builder.addCase(fetchProductAsyncKajak.rejected, (state)=>{
            state.status='idle';
        })
       

    })

    
})

export const productSelectorsKajak=productsAdapter.getSelectors((state:RootState)=>state.CatalogKajak);
export const {setProductKajak, removeProductKajak}= catalogSliceKajak.actions;
