import { createSlice } from "@reduxjs/toolkit";
import { products } from "../../data/products";

  
  const initialState= {
    products: [] as any,
    selectedItems:0,
    totalPrice:0,
    tax:0,
    taxRate:0.1,
    grandTotal:0,
  }

export const cartSlice= createSlice({
        name:'cart',
        initialState,
        reducers:{
          addToCart:(state,action)=>{
            const isExist= state.products.find(product=>product.id === action.payload.id)
            if(!isExist){
                state.products.push({...action.payload, quantity:1})
            }

            //total product count
            state.selectedItems= state.products.reduce((total:number,product:any)=>{
              return Number(total +product.quantity)
            },0);

            //total price count
            state.totalPrice= state.products.reduce((total:number,product:any)=>{
              return Number(total + product.quantity * product.price)
            },0);

            //total tax
            state.tax= state.totalPrice * state.taxRate;

            //grandTotal
            state.grandTotal= state.totalPrice + state.tax;

          },
          updateQuantity:(state,action)=>{
            state.products.map((product:any)=>{
              if(product.id === action.payload.id){
                  if(action.payload.type === "increment"){
                    product.quantity +=1
                  }else if(action.payload.type === "decrement"){
                    product.quantity -=1
                  }
              }
              return product;
            })
            //total product count
            state.selectedItems= state.products.reduce((total:number,product:any)=>{
              return Number(total +product.quantity)
            },0);

            //total price count
            state.totalPrice= state.products.reduce((total:number,product:any)=>{
              return Number(total + product.quantity * product.price)
            },0);

            //total tax
            state.tax= state.totalPrice * state.taxRate;

            //grandTotal
            state.grandTotal= state.totalPrice + state.tax;

          },

          clearCart: (state)=>{
            state.products=[],
            state.selectedItems=0,
            state.tax=0,
            state.totalPrice=0
          }
        }
})

// export const setSelectedItems=(state):any=>{
//   state.products.reduce((total:number,product:any)=>{
//     return Number(total +product.quantity)
//   },0)
// }

// export const setTotalPrice= (state:any):any=>{
//   state.products.reduce((total:number,product:any)=>{
//     return Number(total + product.quantity * product.price)
//   })
// }

// Action creators are generated for each case reducer function
export const {addToCart,updateQuantity,clearCart} = cartSlice.actions

export default cartSlice.reducer

