import { baseApi } from "../baseApi";

const authapi= baseApi.injectEndpoints({
    endpoints:(builder)=>({
        register:builder.mutation({
            query:(userInfo)=>({
                    url:'/auth/register',
                    method:'POST',
                    body:userInfo
            })
        }),

        login:builder.mutation({
            query:(userInfo)=>({
                url:'/auth/login',
                method:'POST',
                body:userInfo
            })
        })

    })
})

export const {useRegisterMutation,useLoginMutation}=authapi;