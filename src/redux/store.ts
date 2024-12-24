import { configureStore } from '@reduxjs/toolkit'
import cartReducer from '../redux/features/cartSlice'
import registerReducer from '../redux/features/registerSlice'
import loginReducer from '../redux/features/loginSlice'
import userReducer from '../redux/features/userSlice'
import { baseApi } from './api/baseApi'
import {persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'


const persistConfig={
  key:'user',
  storage,
}

const persistedUserReducer= persistReducer(persistConfig,userReducer)


export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]:baseApi.reducer,
    cart:cartReducer,
    register:registerReducer,
    login:loginReducer,
    user: persistedUserReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
})

export const persistor= persistStore(store)

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch