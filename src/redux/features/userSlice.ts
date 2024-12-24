import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState={
    token:'',
    user:{
        email:'',
        role:'',
        username:'',
        _id:'',
        exp:'',
        iat:''
    },
};

const userSlice= createSlice({
    name:'user',
    initialState,
    reducers:{
            setToken:(state,action:PayloadAction<string>)=>{
                state.token=action.payload

            },

            setUser: (state,action)=>{
                state.user={...action.payload}
            }
    }
})

export const {setToken,setUser}=userSlice.actions;
export default userSlice.reducer;