import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { Products } from "../../products";
import agent from "../../app/api/agent";
import { RootState } from "../../app/store/configureStore";

const productsAdapter=createEntityAdapter<Products>();

export const fetchProductsAsyncE_biciklo=createAsyncThunk<Products[]>(
    'catalogE_biciklo/fetchProductsAsyncE_biciklo',
    async()=>{
        try{
            return await agent.Catalog.list_e_biciklo();
        }catch(error){
            console.log(error);
        }
    }
)

export const fetchProductAsyncE_biciklo=createAsyncThunk<Products, number>(
    'catalogE_biciklo/fetchProductAsyncE_biciklo',
    async(productsId)=>{
        try{
            return await agent.Catalog.details(productsId);
        }catch(error){
            console.log(error);
        }
    }
)


export const catalogSliceE_biciklo=createSlice({
    name:'catalogE_biciklo',
    initialState:productsAdapter.getInitialState({
        productsLoaded:false,
        status:'idle'
    }),
    reducers:{
        setProductE_biciklo:(state, action)=>{
            productsAdapter.upsertOne(state, action.payload);
            state.productsLoaded=false;
        },
        removeProductE_biciklo: (state, action)=>{
            productsAdapter.removeOne(state, action.payload);
            state.productsLoaded=false;
        }
    },
    extraReducers:(builder=>{
        builder.addCase(fetchProductsAsyncE_biciklo.pending,(state)=>{
            state.status='pendingFetchProducts';
        });
        builder.addCase(fetchProductsAsyncE_biciklo.fulfilled,(state, action)=>{
            productsAdapter.setAll(state,action.payload);
            state.status='idle';
            state.productsLoaded=true;
        });
        builder.addCase(fetchProductsAsyncE_biciklo.rejected,(state)=>{
            state.status='idle';
        });
        builder.addCase(fetchProductAsyncE_biciklo.pending, (state)=>{
            state.status='pendingFetchProduct';
        });
        builder.addCase(fetchProductAsyncE_biciklo.fulfilled, (state, action)=>{
            productsAdapter.upsertOne(state, action.payload);
            state.status='idle';
        });
        builder.addCase(fetchProductAsyncE_biciklo.rejected, (state)=>{
            state.status='idle';
        })
       

    })

    
})

export const productSelectorsE_biciklo=productsAdapter.getSelectors((state:RootState)=>state.CatalogE_biciklo);
export const { setProductE_biciklo, removeProductE_biciklo}= catalogSliceE_biciklo.actions;
