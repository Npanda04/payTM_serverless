/**
 * v0 by Vercel.
 * @see https://v0.dev/t/dbv4U0COnCm
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Label } from "./ui/label"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { Link, useNavigate} from "react-router-dom"
import { SideBanner } from "./SideBanner"
import { useState } from "react"
import { SigninInput } from "@npanda_04/serverless_paytm"
import axios from "axios"
import { BACKEND_URL } from "../../config"

export default function Component() {

    const navigate = useNavigate()

    const [postInputs, setPostInputs] = useState<SigninInput>({
        username: "",
        password: ""

    })


    async function sendSigninRequest(){


        try {
            const response = await axios.post(`${BACKEND_URL}/api/v1/user/signin`, postInputs)
            const jwt = response.data
           
            localStorage.setItem("token", jwt.message);
            navigate("/dashboard")
            
            
        } catch (error) {

            console.log("error while loggining in")
            
        }
    }


    return (
        <div className="w-full gap-10 lg:grid lg:min-h-[600px] lg:grid-cols-2 lg:gap-0 xl:min-h-[800px]">
            <div className="flex items-center justify-center p-6 xl:p-10">
                <div className="mx-auto w-[350px] space-y-6">
                    <div className="space-y-2 text-center">
                        <h1 className="text-3xl font-bold">Sign In</h1>
                        <p className="text-gray-500 dark:text-gray-400">Enter your email and password to sign in</p>
                    </div>
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input onChange={(e) =>{
                                setPostInputs({
                                    ...postInputs,
                                    username : e.target.value
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
                        <Button onClick={sendSigninRequest} className="w-full" type="submit">
                            Sign In
                        </Button>
                        <div className="text-center">
                            <p className="text-gray-500 dark:text-gray-400">
                                Don't have an account?{" "}
                                <Link className="underline" to="/signup">
                                    Sign up
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <SideBanner />
        </div>
    )
}

