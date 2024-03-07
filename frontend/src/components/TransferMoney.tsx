/**
 * v0 by Vercel.
 * @see https://v0.dev/t/FVphVfzwMqg
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { CardTitle, CardDescription, CardHeader, CardContent, CardFooter, Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { TransferMoney } from "@npanda_04/serverless_paytm"
import { useState } from "react"
import axios from "axios"
import { BACKEND_URL } from "../../config"
import { useNavigate } from "react-router-dom"





export default function TransferMoneyComponent() {


    const [postInputs, setPostInputs] = useState<TransferMoney>({
        to: "",
        amount: parseInt(''),

    })

    const navigate = useNavigate()

    async function sendMoneyTransferRequest() {
        try {
            const response = await axios.post(`${BACKEND_URL}/api/v1/account/transfer`,postInputs, {
                headers: {
                    Authorization: localStorage.getItem("token")
                }
            });
            console.log(response)
            navigate("/dashboard")

        } catch (error) {
            console.log("error while transfering ")

        }
    }

    return (
        <div className="flex items-center justify-center h-screen">
            <Card className="w-full max-w-3xl p-8">
                <CardHeader>
                    <CardTitle>Transfer money</CardTitle>
                    <CardDescription>Enter the recipient's information and the transfer amount.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-8">
                    <div className="space-y-2">
                        <Label htmlFor="to">To</Label>
                        <Input onChange={(e) => {
                            setPostInputs({
                                ...postInputs,
                                to: e.target.value
                            })

                        }} id="to" placeholder="Enter recipient" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="amount">Amount</Label>
                        <Input onChange={(e) => {
                            setPostInputs({
                                ...postInputs,
                                amount: parseInt(e.target.value)
                            })

                        }} id="amount" placeholder="Enter amount" type="number" />
                    </div>
                </CardContent>
                <CardFooter>
                    <Button onClick={sendMoneyTransferRequest} className="ml-auto">Send</Button>
                </CardFooter>
            </Card>
        </div>
    )
}



