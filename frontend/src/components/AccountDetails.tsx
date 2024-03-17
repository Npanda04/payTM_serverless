
import { CardTitle, CardDescription, CardHeader, CardContent, Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react";
import axios from "axios"
import {  useNavigate } from "react-router-dom"
import { BACKEND_URL } from "../../config";





export default function AccountDetailsComponent() {


    const [balance, setBalance] = useState(null);
    const [name, setName] = useState(null);
    const [username, setUsername] = useState(null)

    const navigate = useNavigate()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${BACKEND_URL}/api/v1/account/balance`, {
                    headers: {
                        Authorization: localStorage.getItem("token")
                    }
                });
                setBalance(response.data.balance.amount);
                setName(response.data.balance.user.name)
                setUsername(response.data.balance.user.username)
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    function logoutRequest() {

        localStorage.removeItem("token");
        navigate("/signin")

    }
    return (


        <>
            <div className="mb-8 flex justify-end">
                <Button onClick={logoutRequest} className="ml-auto">Logout</Button>
            </div>



            <Card className="w-full">
            
                <CardHeader className="flex flex-row justify-between">
               

                    <div>
                          
                    <CardTitle className="text-lg">Wallet</CardTitle>
                    <CardDescription>Available balance</CardDescription>
                    <div className="text-2xl font-thin"> $ {balance}</div>


                    </div>

                    <div className="font-semibold text-xl text-center">{name}</div>
                    <div>


                    <CardTitle className="text-lg">Username</CardTitle>
                    <CardDescription>{username}</CardDescription>
                    </div>
                    
            

                

                </CardHeader>
                <CardContent className="flex flex-col items-center justify-center space-y-2 p-6">
                    <div className="text-3xl font-semibold"> $ {balance}</div>
                    <Button onClick={() =>{
                        navigate("/transfermoney")
                    }} className="w-full max-w-xs">
                        Send Money
                        </Button>
                </CardContent>
            </Card>

        </>
    )
}


