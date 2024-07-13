import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { Products } from "../../products";
import agent from "../../app/api/agent";
import { RootState } from "../../app/store/configureStore";

const productsAdapter=createEntityAdapter<Products>();

export const fetchProductsAsyncKamp=createAsyncThunk<Products[]>(
    'catalogKampovanje/fetchProductsAsyncKamp',
    async()=>{
        try{
            return await agent.Catalog.list_kampovanje();
        }catch(error){
            console.log(error);
        }
    }
)

export const fetchProductAsyncKamp=createAsyncThunk<Products, number>(
    'catalogKampovanje/fetchProductAsyncKamp',
    async(productsId)=>{
        try{
            return await agent.Catalog.details(productsId);
        }catch(error){
            console.log(error);
        }
    }
)


export const catalogSliceKamp=createSlice({
    name:'catalogKampovanje',
    initialState:productsAdapter.getInitialState({
        productsLoaded:false,
        status:'idle'
    }),
    reducers:{
        setProductKamp:(state, action)=>{
            productsAdapter.upsertOne(state, action.payload);
            state.productsLoaded=false;
        },
        removeProductKamp: (state, action)=>{
            productsAdapter.removeOne(state, action.payload);
            state.productsLoaded=false;
        }
    },
    extraReducers:(builder=>{
        builder.addCase(fetchProductsAsyncKamp.pending,(state)=>{
            state.status='pendingFetchProducts';
        });
        builder.addCase(fetchProductsAsyncKamp.fulfilled,(state, action)=>{
            productsAdapter.setAll(state,action.payload);
            state.status='idle';
            state.productsLoaded=true;
        });
        builder.addCase(fetchProductsAsyncKamp.rejected,(state)=>{
            state.status='idle';
        });
        builder.addCase(fetchProductAsyncKamp.pending, (state)=>{
            state.status='pendingFetchProduct';
        });
        builder.addCase(fetchProductAsyncKamp.fulfilled, (state, action)=>{
            productsAdapter.upsertOne(state, action.payload);
            state.status='idle';
        });
        builder.addCase(fetchProductAsyncKamp.rejected, (state)=>{
            state.status='idle';
        })
       

    })

    
})

export const productSelectorsKamp=productsAdapter.getSelectors((state:RootState)=>state.CatalogKamp);
export const {setProductKamp,removeProductKamp}= catalogSliceKamp.actions;
