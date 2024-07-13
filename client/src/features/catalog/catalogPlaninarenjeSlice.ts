import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { Products } from "../../products";
import agent from "../../app/api/agent";
import { RootState } from "../../app/store/configureStore";

const productsAdapter=createEntityAdapter<Products>();

export const fetchProductsAsyncPlaninarenje=createAsyncThunk<Products[]>(
    'catalogPlaninarenje/fetchProductsAsyncPlaninarenje',
    async()=>{
        try{
            return await agent.Catalog.list_planinarenje();
        }catch(error){
            console.log(error);
        }
    }
)

export const fetchProductAsyncPlaninarenje=createAsyncThunk<Products, number>(
    'catalogPlaninarenje/fetchProductAsyncPlaninarenje',
    async(productsId)=>{
        try{
            return await agent.Catalog.details(productsId);
        }catch(error){
            console.log(error);
        }
    }
)


export const catalogPlaninarenjeSlice=createSlice({
    name:'catalogPlaninarenje',
    initialState:productsAdapter.getInitialState({
        productsLoaded:false,
        status:'idle'
    }),
    reducers:{
        setProductPlaninarenje:(state, action)=>{
            productsAdapter.upsertOne(state, action.payload);
            state.productsLoaded=false;
        },
        removeProductPlaninarenje: (state, action)=>{
            productsAdapter.removeOne(state, action.payload);
            state.productsLoaded=false;
        }
    },
    extraReducers:(builder=>{
        builder.addCase(fetchProductsAsyncPlaninarenje.pending,(state)=>{
            state.status='pendingFetchProducts';
        });
        builder.addCase(fetchProductsAsyncPlaninarenje.fulfilled,(state, action)=>{
            productsAdapter.setAll(state,action.payload);
            state.status='idle';
            state.productsLoaded=true;
        });
        builder.addCase(fetchProductsAsyncPlaninarenje.rejected,(state)=>{
            state.status='idle';
        });
        builder.addCase(fetchProductAsyncPlaninarenje.pending, (state)=>{
            state.status='pendingFetchProduct';
        });
        builder.addCase(fetchProductAsyncPlaninarenje.fulfilled, (state, action)=>{
            productsAdapter.upsertOne(state, action.payload);
            state.status='idle';
        });
        builder.addCase(fetchProductAsyncPlaninarenje.rejected, (state)=>{
            state.status='idle';
        })
       

    })

    
})

export const productSelectorsPlaninarenje=productsAdapter.getSelectors((state:RootState)=>state.CatalogPlaninarenje);
export const {setProductPlaninarenje, removeProductPlaninarenje}= catalogPlaninarenjeSlice.actions;

