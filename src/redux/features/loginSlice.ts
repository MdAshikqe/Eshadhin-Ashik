import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import localStorage from "redux-persist/lib/storage";

export type TInitialState={
    name:string,
    password:string
}

export const initialState:TInitialState= {
        name:'',
        password:'',
}


const loginSlice= createSlice({
    name:'auth',
    initialState,
    reducers:{
        setUserName:(state,action:PayloadAction<string>)=>{
                state.name= action.payload
        },

        setPassword:(state,action:PayloadAction<string>)=>{
                state.password= action.payload
        }
    }
})


export const {setUserName,setPassword}=loginSlice.actions;
export default loginSlice.reducer;