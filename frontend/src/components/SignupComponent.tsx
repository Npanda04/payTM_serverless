/**
 * v0 by Vercel.
 * @see https://v0.dev/t/RQlr4d6MKyM
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Label } from "./ui/label"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { Link, useNavigate } from "react-router-dom"
import { SideBanner } from "./SideBanner"

import { SignupInput } from "@npanda_04/serverless_paytm"
import { useState } from "react"
import axios from "axios"
import { BACKEND_URL }  from "../../config"




export default function Component() {
    const navigate = useNavigate()


    const [postInputs, setPostInputs] = useState<SignupInput>({
        name: "",
        username: "",
        password: ""

    })

    async function sendSignupRequest(){
        try {
            const response = await axios.post(`${BACKEND_URL}/api/v1/user/signup`, postInputs)
            const jwt = response.data
            localStorage.setItem('token', jwt.message);
            navigate("/dashboard")
            
        } catch (error) {
            console.log("error while loggining ")
            
        }
        
        
    }
  return (
    <div className="w-full gap-10 lg:grid lg:min-h-[600px] lg:grid-cols-2 lg:gap-0 xl:min-h-[800px]">
      <div className="flex items-center justify-center p-6 xl:p-10">
        <div className="mx-auto w-[350px] space-y-6">
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold">Create a Wallet</h1>
            <p className="text-gray-500 dark:text-gray-400">Enter your information to create a wallet</p>
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input onChange={(e) =>{
                setPostInputs({
                    ...postInputs,
                    name: e.target.value
                })
              }} id="name" placeholder="Deepanshu" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input onChange={(e) =>{
                setPostInputs({
                    ...postInputs,
                    username: e.target.value
                })
              }} id="email" placeholder="deepanshu@example.com" required type="email" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input onChange={(e) =>{
                setPostInputs({
                    ...postInputs,
                    password: e.target.value
                })
              }} id="password" required type="password" />
            </div>
            <Button onClick={sendSignupRequest} className="w-full" type="submit">
              Create Wallet
            </Button>

            <div className="text-center">
              <p className="text-gray-500 dark:text-gray-400">
                Don't have an account?{" "}
                <Link className="underline" to="/signin">
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>

      <SideBanner/>
      
    </div>
  )
}

