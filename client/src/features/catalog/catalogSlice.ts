import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { ProductParams, Products } from "../../products";
import agent from "../../app/api/agent";
import { RootState } from "../../app/store/configureStore";
import dayjs from "dayjs";
import { MetaData } from "../../app/layout/models/pagination";

interface CatalogState{
    productsLoaded: boolean;
    filtersLoaded:boolean;
    kategorijaa:string[];
    productParams: ProductParams;
    metaData: MetaData | null;
}
const productsAdapter=createEntityAdapter<Products>();

export const fetchProductsAsync=createAsyncThunk<Products[]>(
    'catalog/fetchProductsAsync',
    async()=>{
        try{
            return await agent.Catalog.list_biciklizam();
           
        }catch(error){
            console.log(error);
        }
    }
)

export const fetchProductAsync=createAsyncThunk<Products, number>(
    'catalog/fetchProductAsync',
    async(productsId)=>{
        try{
            return await agent.Catalog.details(productsId);
        }catch(error){
            console.log(error);
        }
    }
)
export const fetchFilters = createAsyncThunk(
    'catalog/fetchFilters',
    async(_, thunkAPI)=>{
        try{
            return agent.Catalog.fetchFilters();
        }catch(error:any){
            return thunkAPI.rejectWithValue({error:error.data});
        }
    }
)
 function initParams(){
    return{
       
            pageNumber:1,
            pageSize:6
        
    
       
    }
 }

export const catalogSlice=createSlice({
    name:'catalog',
    initialState:productsAdapter.getInitialState({
        productsLoaded:false,
        filtersLoaded:false,
        status:'idle',
        kategorijaa:[],
        productParams: initParams(),
        metaData: null
          
        
       
        
    }),
    reducers:{
        setProductParams:(state, action)=>{
            state.productsLoaded=false;
            state.productParams={...state.productParams, ...action.payload};
        },
        setMetaData:(state, action)=>{
            state.metaData=action.payload;
        },


        
        resetProcudtParams: (state) => {
            state.productParams=initParams();
        },
        setProduct:(state, action)=>{
            productsAdapter.upsertOne(state, action.payload);
            state.productsLoaded=false;
        },
        removeProduct: (state, action)=>{
            productsAdapter.removeOne(state, action.payload);
            state.productsLoaded=false;
        }
    },
    extraReducers:(builder=>{
        builder.addCase(fetchProductsAsync.pending,(state)=>{
            state.status='pendingFetchProducts';
        });
        builder.addCase(fetchProductsAsync.fulfilled,(state, action)=>{
            productsAdapter.setAll(state,action.payload);
            state.status='idle';
            state.productsLoaded=true;
        });
        builder.addCase(fetchProductsAsync.rejected,(state)=>{
            state.status='idle';
        });
        builder.addCase(fetchProductAsync.pending, (state)=>{
            state.status='pendingFetchProduct';
        });
        builder.addCase(fetchProductAsync.fulfilled, (state, action)=>{
            productsAdapter.upsertOne(state, action.payload);
            state.status='idle';
        });
        builder.addCase(fetchProductAsync.rejected, (state)=>{
            state.status='idle';
        });

        builder.addCase(fetchFilters.pending, (state)=>{
            state.status='pendingFetchFilters';
        });
        builder.addCase(fetchFilters.fulfilled, (state, action)=>{
            state.kategorijaa=action.payload.kategorijaa;
            state.filtersLoaded=true;
            //state.status = 'idle';
        });
        builder.addCase(fetchFilters.rejected, (state, action)=>{
            state.status = 'idle';
            console.log(action.payload);
        })

       

    })

    
})

export const productSelectors=productsAdapter.getSelectors((state:RootState)=>state.catalog);
export const {setProduct, removeProduct, setProductParams, resetProcudtParams, setMetaData}= catalogSlice.actions;
