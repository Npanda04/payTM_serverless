

import z from "zod"



export const signupInput = z.object({
    username: z.string().email(),
    password : z.string().min(6),
    name: z.string().optional()
})

 
export const signinInput = z.object({
    username: z.string().email(),
    password : z.string().min(6),
})

export const transferMoneyInput = z.object({
    to : z.string(),
    amount : z.number().refine(value => value > 0)
})


export type TransferMoney = z.infer<typeof transferMoneyInput>
export type SignupInput = z.infer<typeof signupInput>
export type SigninInput = z.infer<typeof signinInput>