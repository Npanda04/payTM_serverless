



import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { useEffect, useState } from "react"
import axios from "axios"
import { BACKEND_URL } from "../../config"
import React from "react"


export const RecentTransaction = () => {

  // transaction.interface.ts
interface Transaction {
  id: number,
  amount: number;
  timestamp: string;
  message: string | null;
  receiver: {
    username: string;
  };
}


  const [recentTransaction, setRecentTransaction] = useState<Transaction[]>([])


  useEffect(() => {
    const fetchRecentTransactions = async () => {

      try {
        const resposne = await axios.get(`${BACKEND_URL}/api/v1/account/recent-transactions`, {
          headers: {
            Authorization: localStorage.getItem("token")
          }
        })
        setRecentTransaction(resposne.data)

        console.log(resposne.data)


      } catch (error) {
        console.log("Error fetching recent transactions", error)

      }

    }

    fetchRecentTransactions()

  }, [])
  return (
    <>

<Card className="p-6">
  <CardHeader>
    <CardTitle className="text-lg">Recent Transactions</CardTitle>
  </CardHeader>
  <CardContent className="grid gap-4 max-w-3xl">
    {recentTransaction.map((transaction) => (
      <React.Fragment key={transaction.id}>
        <div className="flex items-center gap-4 justify-between">
          <div>
            <div className="font-semibold">{`Sent to ${transaction.receiver.username}`}</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {new Date(transaction.timestamp).toLocaleString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              })}
            </div>
          </div>
          <div className="font-semibold">{`$${transaction.amount}`}</div>
        </div>
      </React.Fragment>
    ))}
  </CardContent>
</Card>

    </>
  )
}

