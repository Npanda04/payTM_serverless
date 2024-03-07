



import { Separator } from "./ui/separator"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"


export const RecentTransaction = () => {
  return (
    <>

<Card className="p-6">
          <CardHeader>
            <CardTitle className="text-lg">Recent Transactions</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 max-w-3xl">
            <div className="flex items-center gap-4 justify-between">
              <div>
                <div className="font-semibold">Sent to Alice Johnson</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">March 1, 2023</div>
              </div>
              <div className="font-semibold">$100.00</div>
            </div>
            <Separator />
            <div className="flex items-center gap-4 justify-between">
              <div>
                <div className="font-semibold">Received from Bob Smith</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">February 15, 2023</div>
              </div>
              <div className="font-semibold">$50.00</div>
            </div>
            <Separator />
            <div className="flex items-center gap-4 justify-between">
              <div>
                <div className="font-semibold">Sent to Charlie Brown</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">February 1, 2023</div>
              </div>
              <div className="font-semibold">$25.00</div>
            </div>
          </CardContent>
        </Card>
        
    </>
  )
}

